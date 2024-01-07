import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import { Copyright } from './copyright';

import { NavLink, useNavigate } from 'react-router-dom';

import { useState } from 'react';

import { SignInData } from '../types/sing-in';

import { object, string } from 'zod';
import { fromZodError } from 'zod-validation-error';

import { useMutation } from '@tanstack/react-query';
import { fetchUsers, queryClient } from '../utils/fetch-data';

const userSchema = object({
  email: string().email().refine((value) => value.length > 0, "Email can't be empty"),
  password: string().refine((value) => value.length > 0, "Password can't be empty")
})

const DEFAULT_DATA = {
  email: '',
  password: '',
};

export default function SignInForm() {
  const [formErrors, setFormErrors] = useState<SignInData>(DEFAULT_DATA);
  const navigate = useNavigate();

  const {mutate} = useMutation({
    mutationFn: fetchUsers,
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['users']})
      localStorage.setItem('token', data.token)
      navigate('/')
    }
  })

  const handleChange = (name: string) => {
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: '',
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData: any = new FormData(event.currentTarget);

    let userData: SignInData = {
      email: formData.get('email'),
      password: formData.get('password'),
    };
    
    try {
      const user = userSchema.parse(userData);
      setFormErrors(DEFAULT_DATA);
      mutate(user)
    } catch (error: any) {
      const validationError = fromZodError(error);
      validationError.details.forEach((item: any) => {
        setFormErrors((prevState) => ({
          ...prevState,
          [item.path[0]]: item.message,
        }));
      });
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={formErrors.email ? true : false}
            helperText={formErrors.email}
            onChange={() => handleChange('email')}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={formErrors.password ? true : false}
            helperText={formErrors.password}
            onChange={() => handleChange('password')}
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
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <NavLink to="/forgot-password" className="text-main font-bold">
                Forgot password?
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink to="/signup" className="text-main font-bold">
                {"Don't have an account? Sign Up"}
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </>
  );
}
