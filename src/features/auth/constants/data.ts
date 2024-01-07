import { SignUpData } from "../types/sign-up";

export const DEFAULT_DATA: SignUpData = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    dateOfBirth: '',
  };
export const STYLES_BUTTON = {
    mx: 'auto',
    display: 'block',
    mb: 2,
    mt: 2,
    color: 'white',
    bgcolor: 'red',
    '&:hover': {
        bgcolor: 'red',
        opacity: [0.9, 0.8, 0.7],
    }
}