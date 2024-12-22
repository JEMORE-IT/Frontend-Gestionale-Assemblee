import { DeleteConfirmationDialog } from "@atoms/DeleteConfirmationDialog"

interface AttendeeRowProps {
  id: number
  name: string
  status: string
  onDelete: (id: number) => void
}

export function AttendeeRow({ id, name, status, onDelete }: AttendeeRowProps) {
  return (
    <div className="flex items-center justify-between rounded-full border px-4 py-2">
      <div className="grid grid-cols-2 flex-1 gap-4">
        <span>{name}</span>
        <span>{status}</span>
      </div>
      <DeleteConfirmationDialog onDelete={() => onDelete(id)} itemName="partecipante" />
    </div>
  )
}

