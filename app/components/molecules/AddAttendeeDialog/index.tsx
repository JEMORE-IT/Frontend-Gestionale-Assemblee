'use client';

import React, { FC, useState } from 'react';
import { Button } from '@atoms/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@atoms/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@atoms/ui/select';
import SearchableDropdown from '@atoms/SearchableDropdown';
import AddAttendeeDialogProps from './index.types';
import { Plus } from 'lucide-react';

const AddAttendeeDialog: FC<AddAttendeeDialogProps> = ({ options, attendees, onAdd }) => {
  const [name, setName] = useState<string | null>(null);
  const [memberId, setMemberId] = useState<number | null>(null);
  const [status, setStatus] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !status) return; // Evita l'invio se name o status non sono selezionati
    onAdd(memberId, status);
    setName('');
    setMemberId(null);
    setStatus('');
    setOpen(false);
  };

  const handleChange = (value: string | null, mid: number | null) => {
    setName(value);
    setMemberId(mid);
  };

  // Filtra le opzioni per escludere gli attendees già presenti e ordina le opzioni
  const filteredOptions = options
    .filter(option => !attendees.some(attendee => attendee.name === option.name))
    .sort((a, b) => {
      if (a.active && !b.active) return -1;
      if (!a.active && b.active) return 1;
      return 0;
    });

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
          {/* Dropdown per il nome del partecipante */}
          <div>
            <label
              htmlFor="participantName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nome del partecipante
            </label>
            <SearchableDropdown
              id="participantName"
              options={filteredOptions}
              label="name"
              selectedVal={name || ''}
              handleChange={handleChange}
            />
            {name === '' && (
              <p className="text-sm text-red-500">
                Il nome del partecipante è obbligatorio
              </p>
            )}
          </div>

          {/* Dropdown per selezionare la modalità di partecipazione */}
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
            {status === '' && (
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
  );
};

export default AddAttendeeDialog;
