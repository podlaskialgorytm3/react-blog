import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAuth } from '../../../shared/hooks/useAuth';
import { userSchema } from '../utils/validate';
import { fromZodError } from 'zod-validation-error';
import { DEFAULT_USER_DATA } from '../constants/data';
import { useUpdateUser } from '../api/use-update-user';
export const ProfileSettings = () => {
    const [formErrors, setFormErrors] = useState(DEFAULT_USER_DATA);
    const { userData } = useAuth();
    const { mutate } = useUpdateUser();
    const data = new Date(userData.date_of_birth);
    const date = `${data.getUTCFullYear()}-${String(data.getUTCMonth() + 1).padStart(2, '0')}-${String(data.getUTCDate()).padStart(2, '0')}`;
    const handleChange = (name) => {
        setFormErrors((prevState) => ({
            ...prevState,
            [name]: '',
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userFormData = {
            id: userData.user_id,
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            city: formData.get('city'),
            phone: formData.get('phone'),
            dateOfBirth: formData.get('date'),
        };
        try {
            const user = userSchema.parse(userFormData);
            setFormErrors(DEFAULT_USER_DATA);
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
    return (_jsxs("div", { children: [_jsx("h1", { className: "text-center text-3xl md:text-4xl", children: "Profile Settings \u2699\uFE0F\u2692\uFE0F" }), _jsxs(Box, { component: "form", onSubmit: handleSubmit, sx: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > :not(style)': { m: 1, width: '25ch' },
                }, noValidate: true, autoComplete: "off", children: [_jsx(TextField, { id: "standard-basic", label: "First Name", variant: "standard", defaultValue: userData.first_name, name: "firstName", error: formErrors.firstName ? true : false, onChange: () => handleChange('firstName'), helperText: formErrors.firstName }), _jsx(TextField, { id: "standard-basic", label: "Last Name", variant: "standard", defaultValue: userData.last_name, name: "lastName", error: formErrors.lastName ? true : false, onChange: () => handleChange('lastName'), helperText: formErrors.lastName }), _jsx(TextField, { id: "standard-basic", label: "City", variant: "standard", defaultValue: userData.city, name: "city", error: formErrors.city ? true : false, onChange: () => handleChange('city'), helperText: formErrors.city }), _jsx(TextField, { id: "standard-basic", label: "Phone Number", variant: "standard", type: "number", defaultValue: userData.phone, name: "phone", error: formErrors.phone ? true : false, onChange: () => handleChange('phone'), helperText: formErrors.phone }), _jsx(TextField, { id: "standard-basic", label: "Date Of Birth", variant: "standard", type: 'date', defaultValue: date, name: "date", error: formErrors.dateOfBirth ? true : false, onChange: () => handleChange('date'), helperText: formErrors.dateOfBirth }), _jsx(Button, { type: "submit", variant: "contained", sx: { mt: 3, mb: 2, bgcolor: '#41c48b', color: '#fff', '&:hover': { backgroundColor: '#328a63', opacity: [0.9, 0.8, 0.7], } }, children: "Confirm changes" })] })] }));
};
