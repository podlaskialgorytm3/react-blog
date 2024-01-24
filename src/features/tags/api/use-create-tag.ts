import { Tag } from '../types/tag';
import { useMutation } from "@tanstack/react-query";
import { queryClient } from '../../../api/query-client';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const createTag = async (tag: Tag) => {
    const response = await fetch(`http://localhost:3000/create-tag`,{
        method: 'POST',
        body: JSON.stringify(tag),
        headers: {
            'Content-Type': 'application/json'
        },
    })

    if(!response.ok){
        throw new Error('Something went wrong')
    }
    const data = await response.json()

    return data
}

export const useCreateTag = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: createTag,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["tags"]})
            Swal.fire({
                title: 'Success!',
                text: 'Tag created successfully',
                icon: 'success',
                confirmButtonText: 'Okey'
            })
            navigate('/')
        }
    })
}