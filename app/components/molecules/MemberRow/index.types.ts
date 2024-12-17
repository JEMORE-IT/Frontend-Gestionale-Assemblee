import { Member } from '@type/member'

export default interface MemberRowProps {
    member: Member
    onToggleStatus: (id: string) => void
    onDelete: (id: string) => void
}