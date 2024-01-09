import { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import Typography from '@mui/material/Typography';
import { object, string  } from 'zod';
import { fromZodError } from 'zod-validation-error';

const passwordSchema = object({
    password: string()
    .min(8, 'The password must be at least 8 characters long')
    .max(50, 'The password cannot be longer than 50 characters')
    .refine((value) => /[a-z]/.test(value), 'The password must contain at least one lowercase letter')
    .refine((value) => /[A-Z]/.test(value), 'The password must contain at least one uppercase letter')
    .refine((value) => /\d/.test(value), 'The password must contain at least one digit')
    .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), 'The password must contain at least one special character'),
})

export const NewPasswordForm = () => {
    const [errorPassword,setErrorPassword] = useState<string>('');

    const handleChange = () => {
        setErrorPassword('')
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
            passwordSchema.parse({password: event.currentTarget.password.value})
            setErrorPassword('')
            console.log("Password changed")
            //mutate(event.currentTarget.email.value)
        }
        catch(error: any){
            const validationError = fromZodError(error);
            setErrorPassword(validationError.details[0].message)
        }
    }


    return (
        <>
             <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockResetOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Enter your new password!
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="New Password"
                name="password"
                type='password'
                autoFocus
                error={errorPassword ? true : false}
                helperText={errorPassword}
                onChange={() => handleChange()}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                    mt: 3,
                    mb: 2,
                    bgcolor: '#41c48b',
                    color: '#fff',
                    '&:hover': {
                    backgroundColor: '#328a63',
                    opacity: [0.9, 0.8, 0.7],
                },
                }}
            >
            Change password
          </Button>
        </Box>
      </Box>        
    </>
    )
}