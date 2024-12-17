import { Assembly } from '@type/assembly'

export default interface AssemblyRowProps {
    assembly: Assembly
    onDelete: (id: string) => void
}