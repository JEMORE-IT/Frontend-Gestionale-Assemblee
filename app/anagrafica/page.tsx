'use client'

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@atoms/ui/button'
import { Member } from '@type/member'
import MemberRow  from '@molecules/MemberRow'
import ErrorPopup from '@molecules/ErrorPopup'
import { AddMemberDialog } from '../components/atoms/add-member-dialog'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export default function AnagraficaPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const activeMembers = members.filter(m => m.active)
  const inactiveMembers = members.filter(m => !m.active)

  const handleAddMember = (name: string) => {
    const addRequest = async () => {
      try {
        const response = await axios.post(`http://${API_BASE_URL}/member`, {
          name,
          active: true
        }, {
          withCredentials: true,
        })

        if (response.status === 200) {
          const newMember: Member = {
            id: response.data.id,
            name: name,
            active: true
          }
          setMembers([...members, newMember])
        }
      } catch (error) {
        console.log('Error adding member')
      }
    }
    
    addRequest()
  }

  const handleToggleStatus = (id: string) => {
    const toggleRequest = async () => {
      try {
        const member = members.find(m => m.id === id)
        if (!member) return

        const response = await axios.put(`http://${API_BASE_URL}/member/active/${id}`, {
          active: !member.active
        }, {
          withCredentials: true,
        })

        if (response.status === 200) {
          setMembers(members.map(m => 
            m.id === id ? { ...m, active: !m.active } : m
          ))
        }
      } catch (error) {
        console.log('Error toggling member status')
      }
    }

    toggleRequest()
  }

  const handleDeleteMember = (id: string) => {
    const deleteRequest = async () => {
      try {
        const response = await axios.delete(`http://${API_BASE_URL}/member/${id}`, {
          withCredentials: true,
        })

        if (response.status === 200) {
          setMembers(members.filter(m => m.id !== id))
        }
      } catch (error) {
        setErrorMessage("Impossibile cancellare il membro per motivi di consistenza dei dati.")
      }
    }

    deleteRequest()
  }

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await axios.get(`http://${API_BASE_URL}/authentication/verify-token`, {
          withCredentials: true,
        })
      } catch (error) {
        router.push('/')
      }
    }

    const fetchMembers = async () => {
      try {
        const response = await axios.get(`http://${API_BASE_URL}/member`, {
          withCredentials: true,
        })
        setMembers(response.data)
      } catch (error) {
        console.log('Error fetching members')
      }
    }
  
    verifyToken()
    fetchMembers()
  }, [])

  return (
    <div className="min-h-screen bg-[#3B44AC] p-4">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-white text-center">
          Anagrafica soci
        </h1>
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
          {/* Active Members Column */}
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">Attivi</h2>
            <div className="space-y-2 h-[calc(100vh-300px)] overflow-y-auto">
              {activeMembers.map((member) => (
                <MemberRow
                  key={member.id}
                  member={member}
                  onToggleStatus={handleToggleStatus}
                  onDelete={handleDeleteMember}
                />
              ))}
              {activeMembers.length === 0 && (
                <p className="text-center text-gray-500">
                  Nessun socio attivo
                </p>
              )}
            </div>
          </div>

          {/* Inactive Members Column */}
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">Ex associati</h2>
            <div className="space-y-2 h-[calc(100vh-300px)] overflow-y-auto">
              {inactiveMembers.map((member) => (
                <MemberRow
                  key={member.id}
                  member={member}
                  onToggleStatus={handleToggleStatus}
                  onDelete={handleDeleteMember}
                />
              ))}
              {inactiveMembers.length === 0 && (
                <p className="text-center text-gray-500">
                  Nessun ex associato
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-[#FFD241] hover:bg-[#FFD241]/90 text-black"
          >
            Aggiungi
          </Button>
          <Link href="/assemblee">
            <Button variant="outline" className="bg-white hover:bg-gray-100">
              Assemblee
            </Button>
          </Link>
        </div>

        <AddMemberDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onAdd={handleAddMember}
        />
        {errorMessage && (
          <ErrorPopup
            message={errorMessage}
            onClose={() => setErrorMessage(null)}
          />
        )}
      </div>
    </div>
  )
}

