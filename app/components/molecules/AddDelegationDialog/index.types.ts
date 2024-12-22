import { Option } from "@atoms/SearchableDropdown/index.types";

export default interface AddDelegationDialogProps {
  options: Option[]; // Prop per ricevere l'array delle opzioni
  onAdd: (idDelegante: number | null, idDelegato: number | null) => void;
}