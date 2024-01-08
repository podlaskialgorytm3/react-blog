import { useState} from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { queryClient, sendMail } from '../utils/fetch-data';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import Typography from '@mui/material/Typography';
import { BallTriangle } from 'react-loader-spinner';

import { object, string  } from 'zod';
import { fromZodError } from 'zod-validation-error';

import { REDIRECT_TIME } from '../constants/data';
import { SuccessModal } from './success-modal';

const userSchemaLogin = object({
    email: string().email().refine((value) => value.length > 0, {message: "Email can't be empty"}),
  })

export const ResetPasswordForm = () => {
    const [errorEmail,setErrorEmail] = useState<string>('');
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const navigate = useNavigate();

    const { mutate, isPending, isError,error } = useMutation({
        mutationFn: sendMail,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['users']})
            setIsSuccess(true)
            setTimeout(() => {
                navigate('/signin');
            },REDIRECT_TIME)
        }
    })

    const handleChange = () => {
        setErrorEmail('')
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
            userSchemaLogin.parse({email: event.currentTarget.email.value})
            setErrorEmail('')
            mutate(event.currentTarget.email.value)
        }
        catch(error: any){
            const validationError = fromZodError(error);
            setErrorEmail(validationError.details[0].message)
        }
    }




    return (
    <>
    {isError && <p>{error.message}</p>}
    <SuccessModal isOpen={isSuccess} redirect_time={REDIRECT_TIME} text={"Check your e-mail!"}/>
    <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {isPending && <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#41c48b"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{marginBottom: '50px'}}
        wrapperClass=""
        visible={true}
      />}
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockResetOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={errorEmail ? true : false}
            helperText={errorEmail}
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
            Reset
          </Button>
        </Box>
      </Box>        
    </>
    )
}