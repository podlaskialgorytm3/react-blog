import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';

import { Copyright } from './copyright';

import { useState } from 'react';

import { SignUpData } from '../types/sign-up';

import { object, string  } from 'zod';
import { fromZodError } from 'zod-validation-error';


const userSchema = object({
  email: string().email().refine((value) => value.length > 0, "Email can't be empty"),
  password: string()
  .min(8, 'The password must be at least 8 characters long')
  .max(50, 'The password cannot be longer than 50 characters')
  .refine((value) => /[a-z]/.test(value), 'The password must contain at least one lowercase letter')
  .refine((value) => /[A-Z]/.test(value), 'The password must contain at least one uppercase letter')
  .refine((value) => /\d/.test(value), 'The password must contain at least one digit')
  .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), 'The password must contain at least one special character'),
  firstName: string().min(2, "First name can't be empty"),
  lastName: string().min(2, "Last name can't be empty"),
  phone: string().refine(value => /^\d{9}$/.test(value), {message: 'The telephone number must consist of 9 digits',}),
  city: string().refine((value) => value.length > 0, "City can't be empty"),
  dateOfBirth: string().refine((value) => value.length > 0, "Date of birth can't be empty")
})

const DEFAULT_DATA = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  phone: '',
  city: '',
  dateOfBirth: '',
};


export default function SignUpForm() {
  const [data, setData] = useState<SignUpData>(DEFAULT_DATA);
  const [formErrors, setFormErrors] = useState<SignUpData>(DEFAULT_DATA);


  const handleChange = (name: string) => {
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: '',
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData: any = new FormData(event.currentTarget);
    let userData: SignUpData = {
      email: formData.get('email'),
      password: formData.get('password'),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      phone: formData.get('phone'),
      city: formData.get('city'),
      dateOfBirth: formData.get('date'),
    }
    try{
      const user = userSchema.parse(userData);
      setFormErrors(DEFAULT_DATA);
      setData(userData)
    }
    catch(error: any){
      const validationError = fromZodError(error);
      validationError.details.forEach((item: any) => {
        setFormErrors((prevState) => ({
          ...prevState,
          [item.path[0]]: item.message,
        }));
      })
    }
    
  };

  
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  color="primary"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error={formErrors.firstName ? true : false}
                  helperText={formErrors.firstName}
                  onChange={() => handleChange('firstName')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error={formErrors.lastName ? true : false}
                  helperText={formErrors.lastName}
                  onChange={() => handleChange('lastName')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={formErrors.email ? true : false}
                  helperText={formErrors.email}
                  onChange={() => handleChange('email')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={formErrors.password ? true : false}
                  helperText={formErrors.password}
                  onChange={() => handleChange('password')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="Phone Number"
                  type="tel"
                  id="phone"
                  autoComplete="phone"
                  InputProps={{
                    inputProps: {
                      pattern: '[0-9]*',
                    },
                  }}
                  error={formErrors.phone ? true : false}
                  helperText={formErrors.phone}
                  onChange={() => handleChange('phone')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="city"
                  label="City"
                  id="city"
                  autoComplete="city"
                  error={formErrors.city ? true : false}
                  helperText={formErrors.city}
                  onChange={() => handleChange('city')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="date"
                  label="Date of Birth"
                  id="date"
                  autoComplete="date"
                  type="date"
                  InputProps={{
                    inputProps: {
                      max: new Date().toISOString().split("T")[0],
                    },
                  }}
                  error={formErrors.dateOfBirth ? true : false}
                  helperText={formErrors.dateOfBirth}
                  onChange={() => handleChange('dateOfBirth')}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 , bgcolor: '#41c48b', color: '#fff' ,'&:hover': {
                backgroundColor: '#328a63',
                opacity: [0.9, 0.8, 0.7],
              } }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to='/signin' className="text-main font-bold">
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
        </>
  );
}