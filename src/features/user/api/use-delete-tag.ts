import { useMutation  } from "@tanstack/react-query";
import { queryClient } from "../../../api/query-client";

const deleteTag = async (id: number) =>{
    const response = await fetch(`http://localhost:3000/delete-tag`,{
        method: 'DELETE',
        body: JSON.stringify({id}),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(!response.ok){
        throw new Error('Something went wrong')
    }

    const data = await response.json()

    return data
}

export const useDeleteTag = () => (
    useMutation({
        mutationFn: deleteTag,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['tags']})
        }
    })
)