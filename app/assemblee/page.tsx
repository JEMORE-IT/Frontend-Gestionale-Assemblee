'use client'

import axios from "axios"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import { Assembly } from "@type/assembly"
import { Button } from "@atoms/ui/button"
import AssemblyRow from "@molecules/AssemblyRow"
import AddAssemblyDialog from "@molecules/AddAssemblyDialog"
import LogoutButton from "@atoms/LogoutButton"
import ErrorPopup from '@molecules/ErrorPopup'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export default function AssembleePage() {
  const [assemblies, setAssemblies] = useState<Assembly[]>([])
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleAddAssembly = (date: string) => {
    const addRequest = async () => {
      try {
        const response = await axios.post(`http://${API_BASE_URL}/assembly`, {
          date: date
        }, {
          withCredentials: true,
        });

        if (response.status === 200) {
          const newAssembly: Assembly = {
            id: response.data.id,
            date: date,
          }
  
          setAssemblies([...assemblies, newAssembly])
        }
      } catch (error) {
        console.log('Error in handling the assembly append')
      }
    }
    
    addRequest()
  }

  const handleDeleteAssembly = (id: string) => {
    const deleteRequest = async () => {
      try {
        const response = await axios.delete(`http://${API_BASE_URL}/assembly/${id}`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setAssemblies(assemblies.filter(assembly => assembly.id !== id))
        }
      } catch {
        setErrorMessage("Impossibile cancellare l'assemblea per questione di consistenza dei dati")
      }
    }

    deleteRequest()
  }

  useEffect(() => {
    // varify usertoken and redirecting accordingly
    const verifyToken = async () => {
      try {
        const response = await axios.get(`http://${API_BASE_URL}/authentication/verify-token`, {
          withCredentials: true,
        });
      } catch (error) {
        router.push('/')
      }
    };

    const fetchAssembly = async () => {
      try {
        const assemblies = await axios.get(`http://${API_BASE_URL}/assembly`, {
          withCredentials: true,
        })

        let list: Assembly[] = assemblies.data.map(({ id, date }: Assembly) => ({ id, date }));
        setAssemblies(list)
      } catch {
        console.log('Error fetching the asssemblies')
      }
    }
  
    verifyToken();
    fetchAssembly()
  }, []);

  return (
    <div className="min-h-screen bg-[#3B44AC] p-4">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold text-white text-center">
          Lista assemblee
        </h1>
        <div className="h-[calc(100vh-200px)] overflow-y-auto bg-white rounded-lg p-4 shadow-lg">
          <div className="space-y-4">
            {assemblies.map((assembly) => (
              <AssemblyRow
                key={assembly.id}
                assembly={assembly}
                onDelete={handleDeleteAssembly}
              />
            ))}
            {assemblies.length === 0 && (
              <p className="text-center text-gray-500">
                Nessuna assemblea presente
              </p>
            )}
          </div>
        </div>
        <div className="mt-8 flex items-center justify-between">
          <Link href="/anagrafica">
            <Button variant="outline" className="bg-white hover:bg-gray-100">
              Anagrafica
            </Button>
          </Link>
          <LogoutButton/>
          <AddAssemblyDialog onAdd={handleAddAssembly} />
        </div>
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

