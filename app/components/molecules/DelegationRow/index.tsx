'use client'

import React, { FC } from "react";
import DelegationRowProps from "./index.types";
import { DeleteConfirmationDialog } from "@atoms/DeleteConfirmationDialog";

const DelegationRow: FC<DelegationRowProps> = ({ id, delegante, delegato, onDelete }) => {
  return (
    <div className="flex items-center justify-between rounded-full border px-4 py-2">
      <div className="grid grid-cols-2 flex-1 gap-4">
        <span>{delegante}</span>
        <span>{delegato}</span>
      </div>
      <DeleteConfirmationDialog onDelete={() => onDelete(id)} itemName="delega" />
    </div>
  );
};

export default DelegationRow;
