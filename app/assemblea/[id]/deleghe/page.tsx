'use client'

import { useState } from 'react'
import { DelegationRow } from '@atoms/components/DelegationRow'
import { Button } from "@atoms/components/ui/button"
import { AddDelegationDialog } from '@atoms/components/AddDelegationDialog'

export default function DeleghePage() {
  const [delegations, setDelegations] = useState([
    { id: 1, delegante: 'Socio 1', delegato: 'Socio 1' },
    { id: 2, delegante: 'Socio 2', delegato: 'Socio 1' },
    { id: 3, delegante: 'Socio 3', delegato: 'Socio 1' },
    { id: 4, delegante: 'Socio 4', delegato: 'Socio 2' },
    { id: 5, delegante: 'Socio 5', delegato: 'Socio 2' },
  ])

  const handleDelete = (id: number) => {
    setDelegations(delegations.filter(delegation => delegation.id !== id))
  }

  const handleAdd = (delegante: string, delegato: string) => {
    const newId = Math.max(...delegations.map(d => d.id)) + 1
    setDelegations([...delegations, { id: newId, delegante, delegato }])
  }

  return (
    <div className="flex h-full flex-col p-4 md:p-8">
      <h1 className="mb-4 md:mb-8 text-2xl md:text-3xl font-bold text-white text-center">Deleghe</h1>
      
      <div className="flex-1 overflow-auto rounded-lg bg-white p-4 md:p-6">
        <div className="mb-4 grid grid-cols-2 gap-2 md:gap-4 px-2 md:px-4">
          <h2 className="text-base md:text-lg font-semibold">Delegante</h2>
          <h2 className="text-base md:text-lg font-semibold">Delegato</h2>
        </div>
        
        <div className="space-y-2">
          {delegations.map((delegation) => (
            <DelegationRow
              key={delegation.id}
              id={delegation.id}
              delegante={delegation.delegante}
              delegato={delegation.delegato}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <Button className="bg-white text-[#3B44AC] hover:bg-gray-100 text-sm md:text-base">
          Carica
        </Button>
        <AddDelegationDialog onAdd={handleAdd} />
      </div>
    </div>
  )
}

