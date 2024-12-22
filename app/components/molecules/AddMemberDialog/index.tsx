'use client';

import React, { FC, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@atoms/ui/dialog';
import { Button } from '@atoms/ui/button';
import { Input } from '@atoms/ui/input';
import AddMemberDialogProps from './index.types';

const AddMemberDialog: FC<AddMemberDialogProps> = ({ open, onOpenChange, onAdd }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim());
      setName('');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nome</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Inserisci il nome del socio"
          />
          <Button type="submit" className="w-full">
            OK
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberDialog;