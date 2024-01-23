import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../api/query-client";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { EditPostContent } from "../types/edit-post-content";

const updatePost = async (data: EditPostContent) => {
    const response = await fetch(`http://localhost:3000/update-post`,{
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        }
    })

    if(!response.ok) {
        const info = await response.json();
        const error: any = new Error(info.details || 'Something went wrong');
        throw error;
    }

    return response.json();
}

export const useUpdatePost = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: updatePost,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['post']})
            Swal.fire({
                title: 'Success!',
                text: 'Your post has been updated.',
                icon: 'success',
                confirmButtonText: 'Okay',
              });
            navigate('/user/profile')
        }
    })
}