import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useAuth } from '../../../shared/hooks/useAuth';


export const ProfileSettings = () => {
    const { userData  } = useAuth()

    const data = new Date(userData.date_of_birth);
    const date = `${data.getUTCFullYear()}-${String(data.getUTCMonth() + 1).padStart(2, '0')}-${String(data.getUTCDate()).padStart(2, '0')}`;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData: any = new FormData(e.currentTarget);
        const userFormData = {
            first_name: formData.get('firstName'),
            last_name: formData.get('lastName'),
            city: formData.get('city'),
            phone: formData.get('phone'),
            date: formData.get('date'),
        }
        console.log(userFormData)
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
                <TextField id="standard-basic" label="First Name" variant="standard" defaultValue={userData.first_name} name="firstName"/>
                <TextField id="standard-basic" label="Last Name" variant="standard" defaultValue={userData.last_name} name="lastName" />
                <TextField id="standard-basic" label="City" variant="standard" defaultValue={userData.city} name="city"/>
                <TextField id="standard-basic" label="Phone Number" variant="standard"  type="number" defaultValue={userData.phone} name="phone"/>
                <TextField id="standard-basic" label="Date Of Birth" variant="standard" type='date' defaultValue={date} name="date"/>
                <Button type="submit" variant="contained"
                        sx={{ mt: 3, mb: 2 , bgcolor: '#41c48b', color: '#fff' ,'&:hover': {backgroundColor: '#328a63',opacity: [0.9, 0.8, 0.7],}}}
                >Confirm changes
                </Button>
            </Box>
        </div>
    )
}