import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Copyright } from './copyright';
import { ErrorModal } from './error-modal';
import { SuccessModal } from './success-modal';
import { fromZodError } from 'zod-validation-error';
import { userSchema } from '../utils/validate';
import { createNewUser, queryClient } from '../utils/fetch-data';
import { DEFAULT_DATA, REDIRECT_TIME } from '../constants/data';
export default function SignUpForm() {
    const [formErrors, setFormErrors] = useState(DEFAULT_DATA);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();
    const { mutate, isError, error } = useMutation({
        mutationFn: createNewUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            setIsSuccess(true);
            setTimeout(() => {
                navigate('/signin');
            }, REDIRECT_TIME);
        }
    });
    useEffect(() => {
        if (isError) {
            setModalIsOpen(true);
        }
    }, [isError]);
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
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            phone: formData.get('phone'),
            city: formData.get('city'),
            dateOfBirth: formData.get('date'),
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
    return (_jsxs(_Fragment, { children: [_jsx(ErrorModal, { isOpen: modalIsOpen, closeModal: closeModal, error: error, isError: isError }), _jsx(SuccessModal, { isOpen: isSuccess, redirect_time: REDIRECT_TIME, text: "You have successfully created your account." }), _jsxs(Box, { sx: {
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }, children: [_jsx(Avatar, { sx: { m: 1, bgcolor: 'secondary.main' }, children: _jsx(LockOutlinedIcon, {}) }), _jsx(Typography, { component: "h1", variant: "h5", children: "Sign up" }), _jsxs(Box, { component: "form", noValidate: true, onSubmit: handleSubmit, sx: { mt: 3 }, children: [_jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { item: true, xs: 12, sm: 6, children: _jsx(TextField, { autoComplete: "given-name", color: "primary", name: "firstName", required: true, fullWidth: true, id: "firstName", label: "First Name", autoFocus: true, error: formErrors.firstName ? true : false, helperText: formErrors.firstName, onChange: () => handleChange('firstName') }) }), _jsx(Grid, { item: true, xs: 12, sm: 6, children: _jsx(TextField, { required: true, fullWidth: true, id: "lastName", label: "Last Name", name: "lastName", autoComplete: "family-name", error: formErrors.lastName ? true : false, helperText: formErrors.lastName, onChange: () => handleChange('lastName') }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(TextField, { required: true, fullWidth: true, id: "email", label: "Email Address", name: "email", autoComplete: "email", error: formErrors.email ? true : false, helperText: formErrors.email, onChange: () => handleChange('email') }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(TextField, { required: true, fullWidth: true, name: "password", label: "Password", type: "password", id: "password", autoComplete: "new-password", error: formErrors.password ? true : false, helperText: formErrors.password, onChange: () => handleChange('password') }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(TextField, { required: true, fullWidth: true, name: "phone", label: "Phone Number", type: "tel", id: "phone", autoComplete: "phone", InputProps: {
                                                inputProps: {
                                                    pattern: '[0-9]*',
                                                },
                                            }, error: formErrors.phone ? true : false, helperText: formErrors.phone, onChange: () => handleChange('phone') }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(TextField, { required: true, fullWidth: true, name: "city", label: "City", id: "city", autoComplete: "city", error: formErrors.city ? true : false, helperText: formErrors.city, onChange: () => handleChange('city') }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(TextField, { required: true, fullWidth: true, name: "date", label: "Date of Birth", id: "date", autoComplete: "date", type: "date", InputProps: {
                                                inputProps: {
                                                    max: new Date().toISOString().split("T")[0],
                                                },
                                            }, error: formErrors.dateOfBirth ? true : false, helperText: formErrors.dateOfBirth, onChange: () => handleChange('dateOfBirth') }) })] }), _jsx(Button, { type: "submit", fullWidth: true, variant: "contained", sx: { mt: 3, mb: 2, bgcolor: '#41c48b', color: '#fff', '&:hover': {
                                        backgroundColor: '#328a63',
                                        opacity: [0.9, 0.8, 0.7],
                                    } }, children: "Sign Up" }), _jsx(Grid, { container: true, justifyContent: "flex-end", children: _jsx(Grid, { item: true, children: _jsx(NavLink, { to: '/signin', className: "text-main font-bold", children: "Already have an account? Sign in" }) }) })] })] }), _jsx(Copyright, { sx: { mt: 5 } })] }));
}
