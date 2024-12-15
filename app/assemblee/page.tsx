'use client'

import axios from "axios"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import { Assembly } from "../../types/assembly"
import { Button } from "@atoms/components/ui/button"
import { AssemblyRow } from "@atoms/components/assembly-row"
import { AddAssemblyDialog } from "@atoms/components/add-assembly-dialog"
import LogoutButton from "@atoms/LogoutButton"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export default function AssembleePage() {
  const [assemblies, setAssemblies] = useState<Assembly[]>([])
  const router = useRouter()

  const handleAddAssembly = (date: string) => {
    const addRequest = async () => {
      try {
        const response = await axios.post(`http://${API_BASE_URL}/assembly`, {
          date: date
        }, {
          withCredentials: true,
        });

        const newAssembly: Assembly = {
          id: response.data.id,
          date: date,
        }

        setAssemblies([...assemblies, newAssembly])
      } catch (error) {
        console.log('Error in handling the assembly append')
      }
    }
    
    addRequest()
  }

  const handleDeleteAssembly = (id: string) => {
    setAssemblies(assemblies.filter(assembly => assembly.id !== id))
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
      </div>
    </div>
  )
}

