import React, { FC } from "react";
import AssemblyRowProps from "./index.types"
import { DeleteAssemblyDialog } from "@atoms/delete-assembly-dialog"
import Link from 'next/link';

const AssemblyRow: FC<AssemblyRowProps> = ({ assembly, onDelete }) => {
  return <>
    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm">
      <span className="text-lg font-medium text-[#3B44AC]">
        <Link className="hover:text-gray-800" key={assembly.id} href={`/assemblea/${assembly.id}/ordine-del-giorno`}>
          Assemblea {assembly.date}
        </Link>
      </span>
      <DeleteAssemblyDialog onDelete={() => onDelete(assembly.id)} />
    </div>
  </>
}

export default AssemblyRow