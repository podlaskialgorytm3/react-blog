import { Tag } from '../types/tag';
import { useMutation } from "@tanstack/react-query";
import { queryClient } from '../../../api/query-client';

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

export const useCreateTag = () => (
    useMutation({
        mutationFn: createTag,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["tags"]})
        }
    })
)