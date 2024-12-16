'use client'

import React, { FC } from "react";
import { Button } from '../../ui/button'
import { AlertCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import ErrorPopupProps from "./index.types"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../ui/dialog'

const ErrorPopup: FC<ErrorPopupProps> = ({ message, onClose }) => {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (!open) {
      onClose()
    }
  }, [open, onClose])
  
  return <>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-red-600">
            <AlertCircle className="w-5 h-5 mr-2" />
            Errore
          </DialogTitle>
        </DialogHeader>
        <div className="py-4 text-sm text-muted-foreground text-center">
          <p>{message}</p>
        </div>
        <DialogFooter>
          <Button onClick={() => setOpen(false)} className="bg-[#3B44AC] hover:bg-[#3B44AC]/90 text-white">
            Chiudi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
}

export default ErrorPopup