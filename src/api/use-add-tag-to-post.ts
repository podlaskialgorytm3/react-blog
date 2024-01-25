import { useMutation } from "@tanstack/react-query";
import { queryClient } from "./query-client";
import { PostTag } from "../shared/types/post-tag";

const addTagToPost = async ({postId, tagId}: PostTag) => {
    const response = await fetch(`http://localhost:3000/add-tag-to-post`,{
        method: 'POST',
        body: JSON.stringify({postId, tagId}),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(!response.ok){
        throw new Error('Something went wrong')
    }

    const { data } = await response.json()

    return data
}

export const useAddTagToPost = () => (
    useMutation({
        mutationFn: addTagToPost,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['post-tag']})
        }
    })
)