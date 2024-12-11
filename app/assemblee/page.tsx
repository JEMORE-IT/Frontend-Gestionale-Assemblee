'use client'

import { useState } from "react"
import Link from "next/link"
import { Assembly } from "../../types/assembly"
import { Button } from "@atoms/components/ui/button"
import { AssemblyRow } from "@atoms/components/assembly-row"
import { AddAssemblyDialog } from "@atoms/components/add-assembly-dialog"

export default function AssembleePage() {
  const [assemblies, setAssemblies] = useState<Assembly[]>([])

  const handleAddAssembly = (date: string) => {
    const newAssembly: Assembly = {
      id: Math.random().toString(36).substring(7),
      date,
    }
    setAssemblies([...assemblies, newAssembly])
  }

  const handleDeleteAssembly = (id: string) => {
    setAssemblies(assemblies.filter(assembly => assembly.id !== id))
  }

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
          <AddAssemblyDialog onAdd={handleAddAssembly} />
        </div>
      </div>
    </div>
  )
}

