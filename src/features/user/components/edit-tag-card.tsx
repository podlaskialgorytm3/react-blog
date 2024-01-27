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
import { useUpdateTag } from "../api/use-update-tag";
import { fromZodError } from "zod-validation-error";
import { tagContentSchema } from "../utils/validate-tag";
import { useNavigate } from "react-router-dom";

export const EditTagCard = () => {
    const [color, setColor] = useState<string>('#000000');
    const [name, setName] = useState<string>('');
    const [error, setError] = useState<TagDispatch>({name: '', color: '',tagId: 0});

    const { id } = useParams<{id: string}>();
    const navigate = useNavigate();

    const { data, isLoading, isError, error: errorTag } = useFetchTag(id || '');
    const { mutate } = useUpdateTag();

    const handleChangeColor = (newColor: string) => {
        setColor(newColor);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const tag: TagDispatch = {
            name: e.currentTarget['name-tag'].value,
            color: color,
            tagId: parseInt(id ?? '')
        }
        setError({name: '', color: '',tagId: 0});
        try{
            const tagCorrectData: TagDispatch = tagContentSchema.parse(tag);
            setError({name: '', color: '',tagId: 0});
            mutate(tagCorrectData)
            setTimeout(() => {
                navigate('/user/post-settings/tag-settings');
            }, 1000);
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
                >Edit Tag
                </Button>
            </Box>
            <TagLabel name={name} color={color} />
            </div>
            )}
        </div>
    )
}