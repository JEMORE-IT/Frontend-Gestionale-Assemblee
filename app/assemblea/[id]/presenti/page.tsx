'use client'

import { useEffect, useState } from 'react'
import AttendeeRow from '@molecules/AttendeeRow'
import AddAttendeeDialog from '@molecules/AddAttendeeDialog'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Attendee } from '@type/attendee'
import { useParams } from 'next/navigation'
import { Option } from '@atoms/SearchableDropdown/index.types'
import AddBulkDialog from '@molecules/AddBulkDialog'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const enumToType = (n: number): string => {
  const presenceTypes: { [key: number]: string } = {
    1: 'Presente',
    2: 'Assente',
    3: 'Online',
    4: 'Delega',
  };

  return presenceTypes[n] || 'Tipo non valido';
}

const typeToEnum = (status: string): number => {
  const presenceTypes: { [key: string]: number } = {
    "Presente": 1,
    "Assente": 2,
    "Online": 3,
    "Delega": 4,
  };

  return presenceTypes[status] || -1;
}

export default function PresentiPage() {
  const [attendees, setAttendees] = useState<Attendee[]>([])
  const [members, setMembers] = useState<Option[]>([])

  const router = useRouter()
  const { id } = useParams()

  const handleDelete = (id: number) => {
    const deleteRequest = async () => {
      try {
        const response = await axios.delete(`http://${API_BASE_URL}/presence/${id}`, {
          withCredentials: true,
        })

        if (response.status === 200) {
          setAttendees(attendees.filter(m => m.id !== id))
        }
      } catch (error) {
        console.log("Impossibile cancellare il membro per motivi di consistenza dei dati.")
      }
    }

    deleteRequest()
  }

  const handleBulkAdd = (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
        const text = e.target?.result as string;
        const lines = text.split('\n').slice(1); // Skip header line
        const presenze = lines.map(line => {
            const [name, status] = line.split(',');
            const member = members.find(m => m.name.trim() === name.trim());
            return {
                presenza: typeToEnum(status.trim()),
                assembly: +id,
                member: member ? member.id : null
            };
        }).filter(p => p.member !== null);

        try {
            const response = await axios.post(`http://${API_BASE_URL}/presence/bulk-create`, presenze, {
                withCredentials: true,
            });

            if (response.status === 200) {
                const newAttendees = response.data.results.map((p: any) => ({
                    id: p.id,
                    name: p.member.name,
                    assembly: p.assembly.id,
                    status: enumToType(p.presenza)
                } as Attendee));
                setAttendees([...attendees, ...newAttendees]);

                if (response.data.errors.length > 0) {
                    console.log('Alcune presenze non sono state aggiunte:', response.data.errors);
                }
            }
        } catch (error) {
            console.log('Errore durante l\'aggiunta delle presenze in blocco');
        }
    };
    reader.readAsText(file);
}

  const handleAdd = (mid: number | null, status: string) => {
    const addRequest = async () => {
      try {
        const response = await axios.post(`http://${API_BASE_URL}/presence`, {
          presenza:typeToEnum(status),
          assembly: +id,
          member: mid
        }, {
          withCredentials: true,
        })

        if (response.status === 200) {
          const newAttendee: Attendee = {
            id: response.data.id,
            status: status as any,
            assembly:  response.data.assembly.id,
            name:  response.data.member.name
          }
          setAttendees([...attendees, newAttendee])
        }
      } catch (error) {
        console.log('Error adding presence')
      }
    }
    
    if (mid == null) {
      return
    }
    
    addRequest()
  }

  useEffect(() => {
    const fetchPresences = async () => {
      try {
        const presences = await axios.get(`http://${API_BASE_URL}/presence/assembly/${id}`, {
          withCredentials: true,
        });
        if (presences.status === 200) {
          let list: Attendee[] = presences.data.map((p: any) => ({
            id: p.id,
            name: p.member.name,
            assembly: p.assembly.id,
            status: enumToType(p.presenza)
          } as Attendee));
          setAttendees(list);
        }
      } catch (error) {
        console.log('Errore nel caricare le presenze')
      }
    };

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

    const verifyToken = async () => {
      try {
        const response = await axios.get(`http://${API_BASE_URL}/authentication/verify-token`, {
          withCredentials: true,
        });
        
        if (response.status === 200) {
          // Token valido, procedi con il fetch delle presenze
          fetchPresences();
        }
      } catch (error) {
        router.push('/')
      }
    };
  
    verifyToken();
    fetchMembers();
  }, []);

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
          {attendees.length === 0 && (
              <p className="text-center text-gray-500">
                Nessuna presenza
              </p>
          )}
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <AddBulkDialog text="Aggiungi presenze in blocco" onAdd={handleBulkAdd} />
        <AddAttendeeDialog options={members} attendees={attendees} onAdd={handleAdd}/>
      </div>
    </div>
  )
}
