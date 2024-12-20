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
import { Plus } from 'lucide-react'

interface AddDelegationDialogProps {
  onAdd: (delegante: string, delegato: string) => void
}

export function AddDelegationDialog({ onAdd }: AddDelegationDialogProps) {
  const [delegante, setDelegante] = useState("")
  const [delegato, setDelegato] = useState("")
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(delegante, delegato)
    setDelegante("")
    setDelegato("")
    setOpen(false)
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#FFD241] text-[#3B44AC] hover:bg-[#FFD241]/90">
          <Plus className="mr-2 h-4 w-4" />
          Aggiungi
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Aggiungi Delega</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Nome del delegante"
            value={delegante}
            onChange={(e) => setDelegante(e.target.value)}
            required
          />
          <Input
            placeholder="Nome del delegato"
            value={delegato}
            onChange={(e) => setDelegato(e.target.value)}
            required
          />
          <Button 
            type="submit"
            className="w-full mx-auto bg-[#FFD241] text-[#3B44AC] hover:bg-[#FFD241]/90"
          >
            OK
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

