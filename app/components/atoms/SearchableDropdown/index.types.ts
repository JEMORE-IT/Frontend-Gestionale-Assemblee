export interface Option {
    [key: string]: string | number;
}

export default interface SearchableDropdownProps {
    options: Option[];
    label: string;
    id: string;
    selectedVal: string | null;
    handleChange: (value: string | null) => void;
}