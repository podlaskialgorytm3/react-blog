import { useState } from "react";
import { useAuth } from "../../../shared/hooks/useAuth";
import { useCreateTag } from "../api/use-create-tag";
import { tagContentSchema } from "../utils/validate";
import { fromZodError } from "zod-validation-error";
import Swal from "sweetalert2";
export const useAddTagForm = () => {
    const [color, setColor] = useState('#000000');
    const [name, setName] = useState('');
    const [error, setError] = useState({ name: '', color: '', userId: 0 });
    const { userData } = useAuth();
    const { mutate, isPending, isError, error: errorTag } = useCreateTag();
    const handleChangeColor = (newColor) => {
        setColor(newColor);
    };
    const handleChangeName = (e) => { setName(e.target.value); };
    const handleSubmit = (e) => {
        e.preventDefault();
        const tag = {
            name: e.currentTarget['name-tag'].value,
            color: color,
            userId: userData.user_id
        };
        setError({ name: '', color: '', userId: 0 });
        try {
            const tagCorrectData = tagContentSchema.parse(tag);
            setError({ name: '', color: '', userId: 0 });
            mutate(tagCorrectData);
        }
        catch (errorInfo) {
            const validationError = fromZodError(errorInfo);
            validationError.details.forEach((item) => {
                setError((prevState) => ({
                    ...prevState,
                    [item.path[0]]: item.message,
                }));
            });
        }
    };
    if (isError) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${errorTag?.message}`,
            confirmButtonText: 'Ok',
        });
    }
    return { name, color, error, isPending, handleChangeColor, handleChangeName, handleSubmit };
};
