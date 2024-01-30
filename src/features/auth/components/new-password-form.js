import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { queryClient, sendPassword } from '../utils/fetch-data';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import Typography from '@mui/material/Typography';
import { object, string } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { REDIRECT_TIME } from '../constants/data';
import { SuccessModal } from './success-modal';
import { ErrorModal } from './error-modal';
const passwordSchema = object({
    password: string()
        .min(8, 'The password must be at least 8 characters long')
        .max(50, 'The password cannot be longer than 50 characters')
        .refine((value) => /[a-z]/.test(value), 'The password must contain at least one lowercase letter')
        .refine((value) => /[A-Z]/.test(value), 'The password must contain at least one uppercase letter')
        .refine((value) => /\d/.test(value), 'The password must contain at least one digit')
        .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), 'The password must contain at least one special character'),
});
export const NewPasswordForm = () => {
    const [errorPassword, setErrorPassword] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { mutate, isError, error } = useMutation({
        mutationFn: sendPassword,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
            setIsSuccess(true);
            setTimeout(() => {
                navigate('/signin');
            }, REDIRECT_TIME);
        }
    });
    const token = useParams();
    const navigate = useNavigate();
    const handleChange = () => {
        setErrorPassword('');
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            passwordSchema.parse({ password: event.currentTarget.password.value });
            setErrorPassword('');
            mutate({
                password: event.currentTarget.password.value,
                resetToken: token.token?.slice(7)
            });
        }
        catch (error) {
            const validationError = fromZodError(error);
            setErrorPassword(validationError.details[0].message);
        }
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };
    return (_jsxs(_Fragment, { children: [_jsx(ErrorModal, { isOpen: modalIsOpen, closeModal: closeModal, error: error, isError: isError }), _jsx(SuccessModal, { isOpen: isSuccess, redirect_time: REDIRECT_TIME, text: "Your password is now changing ..." }), _jsxs(Box, { sx: {
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }, children: [_jsx(Avatar, { sx: { m: 1, bgcolor: 'secondary.main' }, children: _jsx(LockResetOutlinedIcon, {}) }), _jsx(Typography, { component: "h1", variant: "h5", children: "Enter your new password!" }), _jsxs(Box, { component: "form", noValidate: true, sx: { mt: 1 }, onSubmit: handleSubmit, children: [_jsx(TextField, { margin: "normal", required: true, fullWidth: true, id: "password", label: "New Password", name: "password", type: 'password', autoFocus: true, error: errorPassword ? true : false, helperText: errorPassword, onChange: () => handleChange() }), _jsx(Button, { type: "submit", fullWidth: true, variant: "contained", sx: {
                                    mt: 3,
                                    mb: 2,
                                    bgcolor: '#41c48b',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#328a63',
                                        opacity: [0.9, 0.8, 0.7],
                                    },
                                }, children: "Change password" })] })] })] }));
};
