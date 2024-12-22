'use client'

import { useEffect, useState } from 'react'
import DelegationRow from '@molecules/DelegationRow'
import { Button } from "@atoms/ui/button"
import AddDelegationDialog from '@molecules/AddDelegationDialog'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { Delegation } from '@type/delegation'
import { Option } from '@atoms/SearchableDropdown/index.types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export default function DeleghePage() {
  const [delegations, setDelegations] = useState<Delegation[]>([])
  const [members, setMembers] = useState<Option[]>([])

  const router = useRouter()
  const { id } = useParams()

  const handleDelete = (id: number) => {
    const deleteRequest = async () => {
      try {
        const response = await axios.delete(`http://${API_BASE_URL}/delegation/${id}`, {
          withCredentials: true,
        });
  
        if (response.status === 200) {
          setDelegations(delegations.filter(delegation => delegation.id !== id));
        }
      } catch (error) {
        console.error('Errore durante l\'eliminazione della delega:', error);
      }
    };
  
    deleteRequest();
  }

  const handleAdd = (delegante: number | null, delegato: number | null) => {
    const addRequest = async () => {
      if (delegante === null || delegato === null) {
        console.log('Delegante o delegato non validi');
        return;
      }
  
      try {
        const response = await axios.post(`http://${API_BASE_URL}/delegation`, {
          assembly: +id,
          delegante: delegante,
          delegato: delegato,
        }, {
          withCredentials: true,
        });
  
        if (response.status === 200) {
          const newDelegation: Delegation = {
            id: response.data.id,
            delegante: response.data.delegante.name,
            delegato: response.data.delegato.name,
            assembly: response.data.assembly.id,
          };
  
          // Aggiunge la nuova delega alla lista esistente
          setDelegations([...delegations, newDelegation]);
        }
      } catch (error) {
        console.error('Errore durante l\'aggiunta della delega:', error);
      }
    };
  
    addRequest();
  }

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`http://${API_BASE_URL}/member`, {
          withCredentials: true,
        })
        let list: Option[] = response.data.map((r: any) => ({
          id: r.id,
          name: r.name
        }))
        setMembers(list)
      } catch (error) {
        console.log('Error fetching members')
      }
    }

    const fetchDelegations = async () => {
      try {
        const delegations = await axios.get(`http://${API_BASE_URL}/delegation/assembly/${id}`, {
          withCredentials: true,
        });
        if (delegations.status === 200) {
          let list: Delegation[] = delegations.data.map((p: any) => ({
            id: p.id,
            delegante: p.delegante.name,
            delegato: p.delegato.name,
            assembly: p.assembly.id
          } as Delegation));
          setDelegations(list);
        }
      } catch (error) {
        console.log('Errore nel caricare le presenze')
      }
    };

    const verifyToken = async () => {
      try {
        const response = await axios.get(`http://${API_BASE_URL}/authentication/verify-token`, {
          withCredentials: true,
        });
        
        if (response.status === 200) {
          fetchDelegations();
          fetchMembers()
        }
      } catch (error) {
        router.push('/')
      }
    };
  
    verifyToken();
  }, []);

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
          {delegations.length === 0 && (
              <p className="text-center text-gray-500">
                Nessuna delega presente
              </p>
          )}
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <Button className="bg-white text-[#3B44AC] hover:bg-gray-100 text-sm md:text-base">
          Carica
        </Button>
        <AddDelegationDialog options={members} onAdd={handleAdd} />
      </div>
    </div>
  )
}

