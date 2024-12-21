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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@atoms/components/ui/select"
import { Plus } from 'lucide-react'
import SearchableDropdown from "@atoms/SearchableDropdown" // Assumendo che sia salvato in questo percorso
import { Option } from "@atoms/SearchableDropdown/index.types"

interface AddAttendeeDialogProps {
  options: Option[] // Prop per ricevere l'array delle opzioni
  onAdd: (name: string, status: string) => void
}

export function AddAttendeeDialog({ options, onAdd }: AddAttendeeDialogProps) {
  const [name, setName] = useState<string | null>(null)
  const [status, setStatus] = useState("")
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !status) return // Prevent submission if name or status is not selected
    onAdd(name, status)
    setName("")
    setStatus("")
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
          <DialogTitle>Aggiungi Partecipante</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Componente SearchableDropdown */}
          <div>
            <label
              htmlFor="participantName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nome del partecipante
            </label>
            <SearchableDropdown
              id="participantName"
              options={options}
              label="name"
              selectedVal={name || ""}
              handleChange={setName}
            />
            {name === "" && (
              <p className="text-sm text-red-500">
                Il nome del partecipante è obbligatorio
              </p>
            )}
          </div>
          {/* Selezione della modalità di partecipazione */}
          <div className="space-y-2">
            <Select value={status} onValueChange={setStatus} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Modalità di partecipazione *" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Presente">Presente</SelectItem>
                <SelectItem value="Assente">Assente</SelectItem>
                <SelectItem value="Online">Online</SelectItem>
                <SelectItem value="Delega">Delega</SelectItem>
              </SelectContent>
            </Select>
            {status === "" && (
              <p className="text-sm text-red-500">
                La modalità di partecipazione è obbligatoria
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full mx-auto bg-[#FFD241] text-[#3B44AC] hover:bg-[#FFD241]/90"
            disabled={!name || !status}
          >
            OK
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}