import { DeleteConfirmationDialog } from "@atoms/components/DeleteConfirmationDialog"

interface DelegationRowProps {
  id: number
  delegante: string
  delegato: string
  onDelete: (id: number) => void
}

export function DelegationRow({ id, delegante, delegato, onDelete }: DelegationRowProps) {
  return (
    <div className="flex items-center justify-between rounded-full border px-4 py-2">
      <div className="grid grid-cols-2 flex-1 gap-4">
        <span>{delegante}</span>
        <span>{delegato}</span>
      </div>
      <DeleteConfirmationDialog onDelete={() => onDelete(id)} itemName="delega" />
    </div>
  )
}

