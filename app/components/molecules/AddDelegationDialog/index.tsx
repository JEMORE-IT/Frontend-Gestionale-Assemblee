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
import SearchableDropdown from '@atoms/SearchableDropdown';
import AddDelegationDialogProps from './index.types';
import { Plus } from 'lucide-react';

const AddDelegationDialog: FC<AddDelegationDialogProps> = ({ options, onAdd }) => {
  const [delegante, setDelegante] = useState<string | null>(null);
  const [delegato, setDelegato] = useState<string | null>(null);
  const [deleganteId, setDeleganteId] = useState<number | null>(null);
  const [delegatoId, setDelegatoId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!delegante || !delegato) return; // Impedisce l'invio se delegante o delegato non sono selezionati
    onAdd(deleganteId, delegatoId);
    setDelegante(null);
    setDelegato(null);
    setOpen(false);
  };

  const handleDeleganteChange = (value: string | null, da: number | null) => {
    setDelegante(value);
    setDeleganteId(da);
  };

  const handleDelegatoChange = (value: string | null, riceve: number | null) => {
    setDelegato(value);
    setDelegatoId(riceve);
  };

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
          {/* Dropdown per selezionare il delegante */}
          <div>
            <label
              htmlFor="delegante"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Delegante
            </label>
            <SearchableDropdown
              id="delegante"
              options={options}
              label="name"
              selectedVal={delegante || ''}
              handleChange={handleDeleganteChange}
            />
            {delegante === '' && (
              <p className="text-sm text-red-500">
                Il nome del delegante è obbligatorio
              </p>
            )}
          </div>

          {/* Dropdown per selezionare il delegato */}
          <div>
            <label
              htmlFor="delegato"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Delegato
            </label>
            <SearchableDropdown
              id="delegato"
              options={options}
              label="name"
              selectedVal={delegato || ''}
              handleChange={handleDelegatoChange}
            />
            {delegato === '' && (
              <p className="text-sm text-red-500">
                Il nome del delegato è obbligatorio
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full mx-auto bg-[#FFD241] text-[#3B44AC] hover:bg-[#FFD241]/90"
            disabled={!delegante || !delegato}
          >
            OK
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDelegationDialog;
