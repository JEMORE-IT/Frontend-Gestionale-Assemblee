'use client'

import { Eye, EyeOff } from 'lucide-react'
import { Member } from '../../../types/member'
import { DeleteMemberDialog } from './delete-member-dialog'

interface MemberRowProps {
  member: Member
  onToggleStatus: (id: string) => void
  onDelete: (id: string) => void
}

export function MemberRow({ member, onToggleStatus, onDelete }: MemberRowProps) {
  return (
    <div className="flex items-center justify-between p-3 mb-2 bg-white rounded-full shadow">
      <span className="flex-grow text-center font-medium">{member.name}</span>
      <div className="flex gap-2">
        <button
          onClick={() => onToggleStatus(member.id)}
          className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          aria-label={member.active ? "Disattiva membro" : "Attiva membro"}
        >
          {member.active ? (
            <Eye className="h-5 w-5 text-[#3B44AC]" />
          ) : (
            <EyeOff className="h-5 w-5 text-[#3B44AC]" />
          )}
        </button>
        <DeleteMemberDialog onDelete={() => onDelete(member.id)} />
      </div>
    </div>
  )
}

