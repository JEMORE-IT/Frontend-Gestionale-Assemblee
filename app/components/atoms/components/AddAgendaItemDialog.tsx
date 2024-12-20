'use client'

import { useState } from "react"
import { Button } from "@atoms/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@atoms/components/ui/dialog"
import { Input } from "@atoms/components/ui/input"
import { Textarea } from "@atoms/components/ui/textarea"
import { Plus } from 'lucide-react'

interface AddAgendaItemDialogProps {
  onAdd: (text: string) => void
}

export function AddAgendaItemDialog({ onAdd }: AddAgendaItemDialogProps) {
  const [text, setText] = useState("")
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(text)
    setText("")
    setOpen(false)
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#FFD241] text-[#3B44AC] hover:bg-[#FFD241]/90">
          <Plus className="mr-2 h-4 w-4" />
          Punto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Aggiungi Punto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Testo del punto..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[100px]"
            required
          />
          <Button 
            type="submit"
            className="w-full mx-auto bg-[#FFD241] text-[#3B44AC] hover:bg-[#FFD241]/90"
          >
            Aggiungi
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

