import { useEffect, useState } from 'react';
import{ useMutation } from '@tanstack/react-query';
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

import { SignUpData } from '../types/sign-up';

import { fromZodError } from 'zod-validation-error';
import { userSchema } from '../utils/validate';
import { createNewUser, queryClient } from '../utils/fetch-data';

import { DEFAULT_DATA, REDIRECT_TIME } from '../constants/data';


export default function SignUpForm() {
  const [formErrors, setFormErrors] = useState<SignUpData>(DEFAULT_DATA);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const navigate = useNavigate();

  const { mutate, isError, error} = useMutation({
    mutationFn: createNewUser,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['users']})
      setIsSuccess(true)
      setTimeout(() => {
        navigate('/signin');
      },REDIRECT_TIME)
    }
  })
  useEffect(() => {
    if(isError){
      setModalIsOpen(true);
    }
  },[isError])


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
      mutate(user);
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

  const closeModal = () => {
    setModalIsOpen(false);
  }

  return (
    <>
        <ErrorModal isOpen={modalIsOpen} closeModal={closeModal} error={error} isError={isError}/>
        <SuccessModal isOpen={isSuccess} redirect_time={REDIRECT_TIME} text={"You have successfully created your account."}/>
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