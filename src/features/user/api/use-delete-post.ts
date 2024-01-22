import { useMutation } from "@tanstack/react-query";
import { deletePost } from "./delete-post";
import { queryClient } from "../../../api/query-client";

export const useDeletePost = () => (
    useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['post']})
        
        }
    })
)