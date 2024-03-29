import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../api/query-client";
import { DeletePostResponse } from '../types/delete-post-response';
import { URL } from "../../../shared/config/confidential-data";

const deletePost = async (post_id: number): Promise<DeletePostResponse> => {
    const response = await fetch(`${URL}/posts/${post_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        throw new Error('Something went wrong');
    }

    return response.json() as Promise<DeletePostResponse>;
};


export const useDeletePost = () => (
    useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['post']})
        
        }
    })
)