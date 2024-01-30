import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { fromZodError } from 'zod-validation-error';
import { Copyright } from './copyright';
import { Loading } from '../../../shared/components/loading';
import { ErrorModal } from './error-modal';
import { userSchemaLogin as userSchema } from '../utils/validate';
import { fetchUsers, queryClient } from '../utils/fetch-data';
import { DEFAULT_DATA_LOGIN as DEFAULT_DATA } from '../constants/data';
import { useAuth } from '../../../shared/hooks/useAuth';
export default function SignInForm() {
    const [formErrors, setFormErrors] = useState(DEFAULT_DATA);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: fetchUsers,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            login(data.data);
            navigate('/');
        }
    });
    const handleChange = (name) => {
        setFormErrors((prevState) => ({
            ...prevState,
            [name]: '',
        }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        let userData = {
            email: formData.get('email'),
            password: formData.get('password'),
        };
        try {
            const user = userSchema.parse(userData);
            setFormErrors(DEFAULT_DATA);
            mutate(user);
        }
        catch (error) {
            const validationError = fromZodError(error);
            validationError.details.forEach((item) => {
                setFormErrors((prevState) => ({
                    ...prevState,
                    [item.path[0]]: item.message,
                }));
            });
        }
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };
    return (_jsxs(_Fragment, { children: [_jsx(ErrorModal, { isOpen: modalIsOpen, closeModal: closeModal, error: error, isError: isError }), _jsxs(Box, { sx: {
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }, children: [isPending && _jsx(Loading, { size: 100 }), _jsx(Avatar, { sx: { m: 1, bgcolor: 'secondary.main' }, children: _jsx(LockOutlinedIcon, {}) }), _jsx(Typography, { component: "h1", variant: "h5", children: "Sign in" }), _jsxs(Box, { component: "form", onSubmit: handleSubmit, noValidate: true, sx: { mt: 1 }, children: [_jsx(TextField, { margin: "normal", required: true, fullWidth: true, id: "email", label: "Email Address", name: "email", autoComplete: "email", autoFocus: true, error: formErrors.email ? true : false, helperText: formErrors.email, onChange: () => handleChange('email') }), _jsx(TextField, { margin: "normal", required: true, fullWidth: true, name: "password", label: "Password", type: "password", id: "password", autoComplete: "current-password", error: formErrors.password ? true : false, helperText: formErrors.password, onChange: () => handleChange('password') }), _jsx(Button, { type: "submit", fullWidth: true, variant: "contained", sx: {
                                    mt: 3,
                                    mb: 2,
                                    bgcolor: '#41c48b',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#328a63',
                                        opacity: [0.9, 0.8, 0.7],
                                    },
                                }, children: "Sign In" }), _jsxs(Grid, { container: true, children: [_jsx(Grid, { item: true, xs: true, children: _jsx(NavLink, { to: "/reset-password", className: "text-main font-bold", children: "Forgot password?" }) }), _jsx(Grid, { item: true, children: _jsx(NavLink, { to: "/signup", className: "text-main font-bold", children: "Don't have an account? Sign Up" }) })] })] })] }), _jsx(Copyright, { sx: { mt: 5 } })] }));
}
