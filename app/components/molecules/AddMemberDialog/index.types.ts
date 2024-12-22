export default interface AddMemberDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onAdd: (name: string) => void;
}
  