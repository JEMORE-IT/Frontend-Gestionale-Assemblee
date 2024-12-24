import { Option } from "@atoms/SearchableDropdown/index.types";
import { Attendee } from "@type/attendee";

export default interface AddAttendeeDialogProps {
  options: Option[]; // Elenco delle opzioni per il dropdown
  attendees: Attendee[]; // Elenco degli attendees già presenti
  onAdd: (mid: number | null, status: string) => void; // Funzione per gestire l'aggiunta di un partecipante
}
