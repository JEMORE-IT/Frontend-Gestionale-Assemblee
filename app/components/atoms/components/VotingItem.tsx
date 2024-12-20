import { Button } from "@atoms/components/ui/button"
import { Trash2 } from 'lucide-react'
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog"

interface VotingItemProps {
  id: number
  text: string
  votes: {
    favorevoli: number
    contrari: number
    astenuti: number
  }
  onDelete: (id: number) => void
}

export function VotingItem({ id, text, votes, onDelete }: VotingItemProps) {
  return (
    <div className="relative flex flex-col rounded-3xl sm:rounded-full border p-4 pr-12">
      <div className="mb-4 pr-4 text-center">{text}</div>
      <div className="flex flex-col sm:flex-row justify-between px-4 sm:px-8 gap-4 sm:gap-0">
        <div className="text-center">
          <div className="text-green-600 font-medium">Favorevoli</div>
          <div className="text-lg">{votes.favorevoli}</div>
        </div>
        <div className="text-center">
          <div className="text-gray-600 font-medium">Astenuti</div>
          <div className="text-lg">{votes.astenuti}</div>
        </div>
        <div className="text-center">
          <div className="text-red-600 font-medium">Contrari</div>
          <div className="text-lg">{votes.contrari}</div>
        </div>
      </div>
      <div className="absolute right-3 top-1/2 -translate-y-1/2">
        <DeleteConfirmationDialog onDelete={() => onDelete(id)} itemName="votazione" />
      </div>
    </div>
  )
}

