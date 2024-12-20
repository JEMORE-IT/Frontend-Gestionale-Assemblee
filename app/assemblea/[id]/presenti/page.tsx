'use client'

import { useState } from 'react'
import { AttendeeRow } from '@atoms/components/AttendeeRow'
import { Button } from "@atoms/components/ui/button"
import { AddAttendeeDialog } from '@atoms/components/AddAttendeeDialog'

export default function PresentiPage() {
  const [attendees, setAttendees] = useState([
    { id: 1, name: 'Socio 1', status: 'Presente' },
    { id: 2, name: 'Socio 2', status: 'Assente' },
    { id: 3, name: 'Socio 3', status: 'Online' },
    { id: 4, name: 'Socio 4', status: 'Delega' },
    { id: 5, name: 'Socio 5', status: 'Presente' },
  ])

  const handleDelete = (id: number) => {
    setAttendees(attendees.filter(attendee => attendee.id !== id))
  }

  const handleAdd = (name: string, status: string) => {
    const newId = Math.max(...attendees.map(a => a.id)) + 1
    setAttendees([...attendees, { id: newId, name, status }])
  }

  return (
    <div className="flex h-full flex-col p-4 md:p-8">
      <h1 className="mb-4 md:mb-8 text-2xl md:text-3xl font-bold text-white text-center">Presenti</h1>
      
      <div className="flex-1 overflow-auto rounded-lg bg-white p-4 md:p-6">
        <div className="mb-4 grid grid-cols-2 gap-2 md:gap-4 px-2 md:px-4">
          <h2 className="text-base md:text-lg font-semibold">Socio</h2>
          <h2 className="text-base md:text-lg font-semibold">Modalità</h2>
        </div>
        
        <div className="space-y-2">
          {attendees.map((attendee) => (
            <AttendeeRow
              key={attendee.id}
              id={attendee.id}
              name={attendee.name}
              status={attendee.status}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <Button className="bg-white text-[#3B44AC] hover:bg-gray-100 text-sm md:text-base">
          Carica
        </Button>
        <AddAttendeeDialog onAdd={handleAdd} />
      </div>
    </div>
  )
}

