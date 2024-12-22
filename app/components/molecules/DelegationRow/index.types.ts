export default interface DelegationRowProps {
    id: number;
    delegante: string;
    delegato: string;
    onDelete: (id: number) => void;
}
  