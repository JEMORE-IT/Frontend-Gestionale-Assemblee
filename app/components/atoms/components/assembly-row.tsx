'use client'

import { Assembly } from "../../../../types/assembly"
import { DeleteAssemblyDialog } from "@atoms/components/delete-assembly-dialog"

interface AssemblyRowProps {
  assembly: Assembly
  onDelete: (id: string) => void
}

export function AssemblyRow({ assembly, onDelete }: AssemblyRowProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm">
      <span className="text-lg font-medium text-[#3B44AC]">
        Assemblea {assembly.date}
      </span>
      <DeleteAssemblyDialog onDelete={() => onDelete(assembly.id)} />
    </div>
  )
}

