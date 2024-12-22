export default interface AttendeeRowProps {
    id: number;
    name: string;
    status: string;
    onDelete: (id: number) => void;
}