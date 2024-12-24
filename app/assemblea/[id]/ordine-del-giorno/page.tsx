'use client'

import { useEffect, useState } from 'react'
import AgendaItem from '@molecules/AgendaItem'
import VotingItem from '@molecules/VotingItem'
import AddAgendaItemDialog from '@molecules/AddagendaItemDialog'
import AddVotingItemDialog from '@molecules/AddVotingItemDialog'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'

interface AgendaItemType {
  id: number
  type: 'text' | 'voting'
  text: string
  votes?: {
    favorevoli: number
    contrari: number
    astenuti: number
  }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export default function OrdineDelGiornoPage() {
  const [items, setItems] = useState<AgendaItemType[]>([])
  const [members, setMembers] = useState<{ id: number, name: string }[]>([])
  const router = useRouter()
  const { id } = useParams()

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`http://${API_BASE_URL}/line/assembly/${id}`, {
          withCredentials: true,
        })
        const fetchedItems = await Promise.all(response.data.map(async (item: any) => {
          if (item.votes.length > 0) {
            const resultsResponse = await axios.get(`http://${API_BASE_URL}/line/results/${item.id}`, {
              withCredentials: true,
            })
            return {
              id: item.id,
              type: 'voting',
              text: item.text,
              votes: resultsResponse.data
            }
          } else {
            return {
              id: item.id,
              type: 'text',
              text: item.text
            }
          }
        }))
        setItems(fetchedItems)
      } catch (error) {
        console.error('Errore nel fetch degli items:', error)
      }
    }

    const fetchMembers = async () => {
      try {
        const response = await axios.get(`http://${API_BASE_URL}/member`, {
          withCredentials: true,
        })
        setMembers(response.data)
      } catch (error) {
        console.error('Errore nel fetch dei membri:', error)
      }
    }

    const verifyToken = async () => {
      try {
        const response = await axios.get(`http://${API_BASE_URL}/authentication/verify-token`, {
          withCredentials: true,
        })
        
        if (response.status === 200) {
          fetchItems()
          fetchMembers()
        }
      } catch (error) {
        router.push('/')
      }
    }
  
    verifyToken()
  }, [id])

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`http://${API_BASE_URL}/line/${id}`, {
        withCredentials: true,
      })

      if (response.status === 200) {
        setItems(items.filter(item => item.id !== id))
      }
    } catch (error) {
      console.error('Errore durante la cancellazione del punto:', error)
    }
  }

  const handleAddAgendaItem = async (text: string) => {
    try {
      const response = await axios.post(`http://${API_BASE_URL}/line`, {
        text,
        assembly: id,
        type: 'text'
      }, {
        withCredentials: true,
      })

      if (response.status === 200) {
        const newItem: AgendaItemType = {
          id: response.data.id,
          type: 'text',
          text: response.data.text
        }
        setItems([...items, newItem])
      }
    } catch (error) {
      console.error('Errore durante l\'aggiunta del punto:', error)
    }
  }

  const handleAddVotingItem = async (text: string, file: File) => {
    try {
      const lineResponse = await axios.post(`http://${API_BASE_URL}/line`, {
        text,
        assembly: id,
        type: 'voting'
      }, {
        withCredentials: true,
      })

      if (lineResponse.status === 200) {
        const newLineId = lineResponse.data.id

        const reader = new FileReader()
        reader.onload = async (e) => {
          const content = e.target?.result as string
          const lines = content.split('\n').slice(1) // Skip header line
          const votes = []

          for (const line of lines) {
            const [name, vote] = line.split(',')
            const member = members.find(m => m.name.trim() === name.trim())

            if (member) {
              const voteType = vote.trim() === 'Favorevole' ? 1 : vote.trim() === 'Contrario' ? 2 : vote.trim() === 'Astenuto' ? 0 : null
              if (voteType !== null) {
                votes.push({
                  vote: voteType,
                  member: member.id,
                  riga: newLineId,
                  assembly: +id
                })
              }
            }
          }

          await axios.post(`http://${API_BASE_URL}/vote/bulk-create`, votes, {
            withCredentials: true,
          })

          const resultsResponse = await axios.get(`http://${API_BASE_URL}/line/results/${newLineId}`, {
            withCredentials: true,
          })

          const newItem: AgendaItemType = {
            id: newLineId,
            type: 'voting',
            text,
            votes: resultsResponse.data
          }
          setItems([...items, newItem])
        }
        reader.readAsText(file)
      }
    } catch (error) {
      console.error('Errore durante l\'aggiunta della votazione:', error)
    }
  }

  return (
    <div className="flex h-full flex-col p-4 md:p-8">
      <h1 className="mb-4 md:mb-8 text-2xl md:text-3xl font-bold text-white text-center">
        Ordine del giorno
      </h1>
      
      <div className="flex-1 overflow-auto rounded-lg bg-white p-4 md:p-6">
        <div className="space-y-4">
          {items.map((item) => (
            item.type === 'text' ? (
              <AgendaItem
                key={item.id}
                id={item.id}
                text={item.text}
                onDelete={handleDelete}
              />
            ) : (
              <VotingItem
                key={item.id}
                id={item.id}
                text={item.text}
                votes={item.votes!}
                onDelete={handleDelete}
              />
            )
          ))}
          {items.length === 0 && (
              <p className="text-center text-gray-500">
                Nessun punto presente
              </p>
          )}
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <AddAgendaItemDialog onAdd={handleAddAgendaItem} />
        <AddVotingItemDialog onAdd={handleAddVotingItem} />
      </div>
    </div>
  )
}
