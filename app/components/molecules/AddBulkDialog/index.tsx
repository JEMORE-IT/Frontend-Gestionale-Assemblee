import React, { FC, useState, useRef } from 'react';
import AddBulkDialogProps from "./index.types"
import { Button } from '@atoms/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@atoms/ui/dialog';
import { Plus, Upload } from 'lucide-react';

const AddBulkDialog: FC<AddBulkDialogProps> = ({ text, onAdd }) => {
    const [file, setFile] = useState<File | null>(null);
    const [open, setOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!file) return;
      onAdd(file);
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
        <Button className="bg-white text-[#3B44AC] hover:bg-gray-100 text-sm md:text-base">
          Carica
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{text}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".csv,.xlsx,.xls"
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
                Formati supportati: CSV, Excel
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
  )
}

export default AddBulkDialog