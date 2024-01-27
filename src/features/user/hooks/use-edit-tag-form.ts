import { useState, useEffect } from "react";
import { TagDispatch } from "../types/tag-dispatch";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchTag } from "../api/use-fetch-tag";
import { useUpdateTag } from "../api/use-update-tag";
import { tagContentSchema } from "../utils/validate-tag"
import { fromZodError } from "zod-validation-error";
import Swal from "sweetalert2";

export const useEditTagForm = () => {
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

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {setName(e.target.value)}

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

    return { color, name, error, data, isLoading, handleChangeColor,handleChangeName, handleSubmit }
}