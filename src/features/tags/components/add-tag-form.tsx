import { Box } from "@mui/material";
import TextField from '@mui/material/TextField';
import { MuiColorInput } from 'mui-color-input';
import { Button } from "@mui/material";
import { useState } from "react";
import { Tag } from "../types/tag"
import { tagContentSchema } from "../utils/validate";
import { fromZodError } from "zod-validation-error";
import { useCreateTag } from "../api/use-create-tag";
import { Loading } from "../../../shared/components/loading";
import Swal from 'sweetalert2';
import { TagLabel } from "../../../shared/components/tag";
import { useAuth } from '../../../shared/hooks/useAuth';

export const AddTagForm = () => {
    const [color, setColor] = useState<string>('#000000');
    const [name, setName] = useState<string>('');
    const [error, setError] = useState<Tag>({name: '', color: '',userId: 0});
    const { userData } = useAuth();

    const { mutate, isPending,isError,error: errorTag } = useCreateTag();

    const handleChangeColor = (newColor: string) => {
        setColor(newColor);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const tag:Tag = {
            name: e.currentTarget['name-tag'].value,
            color: color,
            userId: userData.user_id
        }
        setError({name: '', color: '',userId: 0});
        try{
            const tagCorrectData: Tag = tagContentSchema.parse(tag);
            setError({name: '', color: '',userId: 0});
            mutate(tagCorrectData)
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

    if(isError){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${errorTag?.message}`,
            confirmButtonText: 'Ok',
          })
    }

    return (
        <div className="flex flex-col items-center">
            <h1 className='text-center text-4xl'>Creating tag 🏷️✨ </h1>
            {isPending && <Loading size={100} />}
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
                    onChange={(e) => setName(e.target.value)}
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
            <TagLabel name={name} color={color} />
        </div>
    )
}