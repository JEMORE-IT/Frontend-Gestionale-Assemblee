'use client'

import { useEffect, useState } from 'react'
import { AgendaItem } from '@atoms/components/AgendaItem'
import { VotingItem } from '@atoms/components/VotingItem'
import { AddAgendaItemDialog } from '@atoms/components/AddAgendaItemDialog'
import { AddVotingItemDialog } from '@atoms/components/AddVotingItemDialog'
import { useRouter } from 'next/navigation'
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
  const [items, setItems] = useState<AgendaItemType[]>([
    {
      id: 1,
      type: 'text',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 2,
      type: 'voting',
      text: 'Votazione Luca Grassi Responsabile Culo:',
      votes: {
        favorevoli: 10,
        contrari: 9,
        astenuti: 4
      }
    }
  ])

  const router = useRouter()

  const handleDelete = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  const handleAddAgendaItem = (text: string) => {
    const newId = Math.max(...items.map(item => item.id)) + 1
    setItems([...items, { id: newId, type: 'text', text }])
  }

  const handleAddVotingItem = async (text: string, file: File) => {
    // Here you would process the file and extract the voting results
    // For now, we'll just add dummy data
    const newId = Math.max(...items.map(item => item.id)) + 1
    
    // TODO: Replace with actual file processing
    const dummyVotes = {
      favorevoli: 0,
      contrari: 0,
      astenuti: 0
    }

    setItems([...items, {
      id: newId,
      type: 'voting',
      text,
      votes: dummyVotes
    }])
  }

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(`http://${API_BASE_URL}/authentication/verify-token`, {
          withCredentials: true,
        });
        
        if (response.status === 200) {
          
        }
      } catch (error) {
        router.push('/')
      }
    };
  
    verifyToken();
  }, []);

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
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <AddAgendaItemDialog onAdd={handleAddAgendaItem} />
        <AddVotingItemDialog onAdd={handleAddVotingItem} />
      </div>
    </div>
  )
}

