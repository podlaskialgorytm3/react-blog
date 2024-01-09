import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import Typography from '@mui/material/Typography';

export const NewPasswordForm = () => {
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
            <Box component="form" noValidate sx={{ mt: 1 }} >
            <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="New Password"
                name="password"
                type='password'
                autoFocus
                // error={errorEmail ? true : false}
                // helperText={errorEmail}
                // onChange={() => handleChange()}
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