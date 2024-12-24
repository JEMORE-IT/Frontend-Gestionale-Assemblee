'use client'

import React, { FC } from "react";
import VotingItemProps from "./index.types";
import DeleteConfirmationDialog from "@molecules/DeleteConfirmationDialog";

const VotingItem: FC<VotingItemProps> = ({ id, text, votes, onDelete }) => {
  return (
    <div className="relative flex flex-col rounded-3xl md:rounded-full border p-4 md:pr-12">
      <div className="mb-4 md:pr-4 text-center">{text}</div>
      <div className="flex flex-col md:flex-row justify-between px-4 md:px-8 gap-4 md:gap-0">
        <div className="text-center">
          <div className="text-green-600 font-medium">Favorevoli</div>
          <div className="text-lg">{votes.favorevoli}</div>
        </div>
        <div className="text-center">
          <div className="text-gray-600 font-medium">Astenuti</div>
          <div className="text-lg">{votes.astenuti}</div>
        </div>
        <div className="text-center">
          <div className="text-red-600 font-medium">Contrari</div>
          <div className="text-lg">{votes.contrari}</div>
        </div>
      </div>
      <div className="absolute right-3 top-1/2 -translate-y-1/2">
        <DeleteConfirmationDialog onDelete={() => onDelete(id)} itemName="votazione" />
      </div>
    </div>
  );
};

export default VotingItem;
