import { Box } from "@mui/material";
import TextField from '@mui/material/TextField';
import { MuiColorInput } from 'mui-color-input';
import { Button } from "@mui/material";
import { useState } from "react";

export const AddTagForm = () => {
    const [color, setColor] = useState<string>('#000000');

    const handleChangeColor = (newColor: string) => {
        setColor(newColor);
    }

    return (
        <div>
            <h1 className='text-center text-4xl'>Creating tag 🏷️✨ </h1>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '100%' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField 
                    id="standard-basic" 
                    label="name-tag" 
                    variant="standard" 
                    name="name-tag" 
                    sx={{width: '100%'}}
                    // error={error.title ? true : false}
                    // helperText={error.title}
                />
                <MuiColorInput value={color} onChange={handleChangeColor} />
                <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 , bgcolor: '#41c48b', color: '#fff', width: '300px','&:hover': {
                backgroundColor: '#328a63',
                opacity: [0.9, 0.8, 0.7],
                } }}
                >Create Tag
                </Button>
            </Box>
        </div>
    )
}