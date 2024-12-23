'use client';

import React, { FC, useState, useRef } from 'react';
import { Button } from '@atoms/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@atoms/ui/dialog';
import { Textarea } from '@atoms/ui/textarea';
import { Plus, Upload } from 'lucide-react';
import AddVotingItemDialogProps from './index.types';

const AddVotingItemDialog: FC<AddVotingItemDialogProps> = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    onAdd(text, file);
    setText('');
    setFile(null);
    setOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#FFD241] text-[#3B44AC] hover:bg-[#FFD241]/90">
          <Plus className="mr-2 h-4 w-4" />
          Votazione
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Aggiungi Votazione</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Testo della votazione..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[100px]"
            required
          />
          <div className="space-y-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".csv"
              required
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleFileClick}
              className="w-full h-20 border-dashed"
            >
              <div className="flex flex-col items-center justify-center">
                <Upload className="h-6 w-6 mb-2" />
                {file ? (
                  <span className="text-sm">{file.name}</span>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Carica file risultati *
                  </span>
                )}
              </div>
            </Button>
            {!file && (
              <p className="text-xs text-muted-foreground">
                Formati supportati: CSV
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full mx-auto bg-[#FFD241] text-[#3B44AC] hover:bg-[#FFD241]/90"
            disabled={!file}
          >
            Aggiungi
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddVotingItemDialog;
