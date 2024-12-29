export interface Option {
    id: number,
    name: string
    active: boolean
}

export default interface SearchableDropdownProps {
    options: Option[];
    label: string;
    id: string;
    selectedVal: string | null;
    handleChange: (value: string | null, id: number | null) => void;
}