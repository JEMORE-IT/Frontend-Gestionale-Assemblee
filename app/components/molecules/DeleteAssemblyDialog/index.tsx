'use client'

import React, { FC, useState } from "react";
import { Button } from "@atoms/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@atoms/ui/dialog";
import { Trash2 } from "lucide-react";
import DeleteAssemblyDialogProps from "./index.types";

const DeleteAssemblyDialog: FC<DeleteAssemblyDialogProps> = ({ onDelete }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    onDelete();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 className="h-5 w-5 text-red-600" />
          <span className="sr-only">Delete assembly</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Conferma eliminazione</DialogTitle>
          <DialogDescription>
            Sei sicuro di voler eliminare questa assemblea? Questa azione non può essere annullata.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Annulla
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            Elimina
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAssemblyDialog;
