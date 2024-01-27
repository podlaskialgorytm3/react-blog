import { Box } from "@mui/material";
import TextField from '@mui/material/TextField';
import { MuiColorInput } from 'mui-color-input';
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { TagLabel } from "../../../shared/components/tag";
import { TagDispatch } from "../types/tag-dispatch";
import { useFetchTag } from "../api/use-fetch-tag";
import { useParams } from "react-router-dom";
import { Loading } from "../../../shared/components/loading";
import Swal from 'sweetalert2';

export const EditTagCard = () => {
    const [color, setColor] = useState<string>('#000000');
    const [name, setName] = useState<string>('');
    const [error, setError] = useState<TagDispatch>({name: '', color: '',tagId: 0});

    const { id } = useParams<{id: string}>();

    const { data, isLoading, isError, error: errorTag } = useFetchTag(id || '');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    const handleChangeColor = (newColor: string) => {
        setColor(newColor);
    }



    if(isError){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${errorTag?.message}`,
            confirmButtonText: 'Ok',
          })
    }

    useEffect(() => {
        if(data){
            setName(data.name);
            setColor(data.color);
        }
    
    }, [data])

    return(
        <div className="flex flex-col items-center">
            <h1 className='text-center text-4xl'>Editing tag 🏷️✨ </h1>
            {isLoading && <Loading size={100} />}
            {!isLoading && data && (
            <div className="flex flex-col items-center">
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
                    defaultValue={data.name}
                />
                <MuiColorInput value={color} onChange={handleChangeColor} />
                <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 , bgcolor: '#41c48b', color: '#fff', width: '300px','&:hover': {
                backgroundColor: '#328a63',
                opacity: [0.9, 0.8, 0.7],
                } }}
                >Edit Tag
                </Button>
            </Box>
            <TagLabel name={name} color={color} />
            </div>
            )}
        </div>
    )
}