export default interface AgendaItemProps {
    id: number;
    text: string;
    onDelete: (id: number) => void;
}