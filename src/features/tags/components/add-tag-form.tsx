import { Box } from "@mui/material";
import TextField from '@mui/material/TextField';
import { MuiColorInput } from 'mui-color-input';
import { Button } from "@mui/material";
import { useState } from "react";
import { Tag } from "../types/tag"
import { tagContentSchema } from "../utils/validate";
import { fromZodError } from "zod-validation-error";

export const AddTagForm = () => {
    const [color, setColor] = useState<string>('#000000');
    const [error, setError] = useState<Tag>({name: '', color: ''});

    const handleChangeColor = (newColor: string) => {
        setColor(newColor);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const tag:Tag = {
            name: e.currentTarget['name-tag'].value,
            color: color,
        }
        setError({name: '', color: ''});
        try{
            const tagCorrectData = tagContentSchema.parse(tag);
            setError({name: '', color: ''});
            console.log(tagCorrectData)
            // mutate({...postContentCorrectData, postId: randomID})
        }
        catch(errorInfo: any){
            const validationError = fromZodError(errorInfo);
            validationError.details.forEach((item: any) => {
               setError((prevState) => ({
                 ...prevState,
                [item.path[0]]: item.message,
                }));
            })
        }
    }

    return (
        <div>
            <h1 className='text-center text-4xl'>Creating tag 🏷️✨ </h1>
            <Box
                component="form"
                onSubmit={handleSubmit}
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
                    error={error.name ? true : false}
                    helperText={error.name}
                />
                <MuiColorInput value={color} onChange={handleChangeColor} />
                <p className="text-[red]">{error.color}</p>
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