import { Button } from "@atoms/components/ui/button"
import { Trash2 } from 'lucide-react'
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog"

interface AgendaItemProps {
  id: number
  text: string
  onDelete: (id: number) => void
}

export function AgendaItem({ id, text, onDelete }: AgendaItemProps) {
  return (
    <div className="relative flex items-center justify-between rounded-3xl border p-4">
      <p className="flex-1 text-center px-4">{text}</p>
      <DeleteConfirmationDialog onDelete={() => onDelete(id)} itemName="punto" />
    </div>
  )
}

