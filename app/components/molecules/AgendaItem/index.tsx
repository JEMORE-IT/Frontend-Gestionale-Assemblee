'use client'

import React, { FC } from "react";
import AgendaItemProps from "./index.types";
import DeleteConfirmationDialog from "@molecules/DeleteConfirmationDialog";

const AgendaItem: FC<AgendaItemProps> = ({ id, text, onDelete }) => {
  return (
    <div className="relative flex items-center justify-between rounded-3xl border p-4">
      <p className="flex-1 text-center px-4">{text}</p>
      <DeleteConfirmationDialog onDelete={() => onDelete(id)} itemName="punto" />
    </div>
  );
};

export default AgendaItem;
