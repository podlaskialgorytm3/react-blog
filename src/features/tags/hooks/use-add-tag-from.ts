import { useState } from "react";
import { Tag } from "../types/tag";
import { useAuth } from "../../../shared/hooks/useAuth";
import { useCreateTag } from "../api/use-create-tag";
import { tagContentSchema } from "../utils/validate"
import { fromZodError } from "zod-validation-error";
import Swal from "sweetalert2";

export const useAddTagForm = () => {
    const [color, setColor] = useState<string>('#000000');
    const [name, setName] = useState<string>('');
    const [error, setError] = useState<Tag>({name: '', color: '',userId: 0});
    const { userData } = useAuth();

    const { mutate, isPending,isError,error: errorTag } = useCreateTag();

    const handleChangeColor = (newColor: string) => {
        setColor(newColor);
    }

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {setName(e.target.value)}

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

    return { name, color, error, isPending, handleChangeColor, handleChangeName, handleSubmit}
}