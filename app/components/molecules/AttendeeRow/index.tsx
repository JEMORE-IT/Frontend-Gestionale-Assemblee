'use client'

import React, { FC } from "react";
import AttendeeRowProps from "./index.types";
import { DeleteConfirmationDialog } from "@atoms/DeleteConfirmationDialog";

const AttendeeRow: FC<AttendeeRowProps> = ({ id, name, status, onDelete }) => {
  return (
    <div className="flex items-center justify-between rounded-full border px-4 py-2">
      <div className="grid grid-cols-2 flex-1 gap-4">
        <span>{name}</span>
        <span>{status}</span>
      </div>
      <DeleteConfirmationDialog onDelete={() => onDelete(id)} itemName="partecipante" />
    </div>
  );
};

export default AttendeeRow;
