export interface ErrorModalData {
    isOpen: boolean;
    closeModal: (event: React.MouseEvent | React.KeyboardEvent) => void;
    isError: boolean;
    error: any
}