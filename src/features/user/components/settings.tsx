import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useAuth } from '../../../shared/hooks/useAuth';

import { userSchema } from '../utils/validate';
import { fromZodError } from 'zod-validation-error';

import { DEFAULT_DATA } from '../constants/data';
import { ResultData,EnteredData } from '../types/user-data';

import { useMutation } from '@tanstack/react-query';
import { updateUser, queryClient } from '../api/update-user';

import Swal from 'sweetalert2';

export const ProfileSettings = () => {
    const [formErrors, setFormErrors] = useState<EnteredData>( DEFAULT_DATA );
    const { userData, update } = useAuth()
    const navigate = useNavigate()
    const { mutate } = useMutation({
        mutationFn: updateUser,
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['users']})
            update(data)
            Swal.fire({
                title: 'Success!',
                text: 'Your profile has been updated.',
                icon: 'success',
                confirmButtonText: 'Okay',
              });
            navigate('/user/profile')
        }
      
    })

    const data = new Date(userData.date_of_birth);
    const date = `${data.getUTCFullYear()}-${String(data.getUTCMonth() + 1).padStart(2, '0')}-${String(data.getUTCDate()).padStart(2, '0')}`;

    const handleChange = (name: string) => {
        setFormErrors((prevState) => ({
          ...prevState,
          [name]: '',
        }));
      };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData: any = new FormData(e.currentTarget);
        const userFormData: ResultData = {
            id: userData.user_id,
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            city: formData.get('city'),
            phone: formData.get('phone'),
            dateOfBirth: formData.get('date'),
        }
        try{
            let user = userSchema.parse(userFormData);
            setFormErrors(DEFAULT_DATA);
            mutate(user)
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
    }

    return(
        <div>
            <h1 className="text-4xl">Profile Settings</h1>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField 
                    id="standard-basic" 
                    label="First Name" 
                    variant="standard" 
                    defaultValue={userData.first_name} 
                    name="firstName"
                    error={formErrors.firstName ? true : false}
                    onChange={() => handleChange('firstName')}
                    helperText={formErrors.firstName}
                />
                <TextField 
                    id="standard-basic" 
                    label="Last Name" 
                    variant="standard" 
                    defaultValue={userData.last_name} 
                    name="lastName" 
                    error={formErrors.lastName ? true : false}
                    onChange={() => handleChange('lastName')}
                    helperText={formErrors.lastName}
                />
                <TextField 
                    id="standard-basic" 
                    label="City" 
                    variant="standard" 
                    defaultValue={userData.city} 
                    name="city"
                    error={formErrors.city ? true : false}
                    onChange={() => handleChange('city')}
                    helperText={formErrors.city}
                />
                <TextField 
                    id="standard-basic" 
                    label="Phone Number" 
                    variant="standard"  
                    type="number" 
                    defaultValue={userData.phone} 
                    name="phone"
                    error={formErrors.phone ? true : false}
                    onChange={() => handleChange('phone')}
                    helperText={formErrors.phone}
                />
                <TextField 
                    id="standard-basic" 
                    label="Date Of Birth" 
                    variant="standard" 
                    type='date' 
                    defaultValue={date} 
                    name="date"
                    error={formErrors.dateOfBirth ? true : false}
                    onChange={() => handleChange('date')}
                    helperText={formErrors.dateOfBirth}
                />
                <Button type="submit" variant="contained"
                        sx={{ mt: 3, mb: 2 , bgcolor: '#41c48b', color: '#fff' ,'&:hover': {backgroundColor: '#328a63',opacity: [0.9, 0.8, 0.7],}}}
                >Confirm changes
                </Button>
            </Box>
        </div>
    )
}