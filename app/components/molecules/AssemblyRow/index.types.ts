import { Assembly } from '../../../../types/assembly'

export default interface AssemblyRowProps {
    assembly: Assembly
    onDelete: (id: string) => void
}