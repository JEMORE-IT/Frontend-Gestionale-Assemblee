import { Option } from "@atoms/SearchableDropdown/index.types";

export default interface AddAttendeeDialogProps {
  options: Option[]; // Elenco delle opzioni per il dropdown
  onAdd: (mid: number | null, status: string) => void; // Funzione per gestire l'aggiunta di un partecipante
}
