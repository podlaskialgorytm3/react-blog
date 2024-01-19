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

import { SignInData } from '../types/sing-in';
import { fromZodError } from 'zod-validation-error';

import { Copyright } from './copyright';
import { Loading } from '../../../shared/components/loading';
import { ErrorModal } from './error-modal'

import { userSchemaLogin as userSchema } from '../utils/validate';
import { fetchUsers, queryClient } from '../utils/fetch-data';
import { DEFAULT_DATA_LOGIN as DEFAULT_DATA } from '../constants/data';

import { useAuth } from '../../../shared/hooks/useAuth';


export default function SignInForm() {
  const [formErrors, setFormErrors] = useState<SignInData>(DEFAULT_DATA);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const { login } = useAuth();

  const navigate = useNavigate();

  const {mutate,isPending,isError,error} = useMutation({
    mutationFn: fetchUsers,
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['users']})
      login(data.data)
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
      mutate(user);
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

  const closeModal = () => {
    setModalIsOpen(false);
  }
  return (
    <>
    <ErrorModal isOpen={modalIsOpen} closeModal={closeModal} error={error} isError={isError}/>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {isPending && <Loading size={100}/>}
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
              <NavLink to="/reset-password" className="text-main font-bold">
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
