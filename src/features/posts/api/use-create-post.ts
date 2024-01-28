import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../../api/query-client';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { PostContent } from "../../../shared/types/post-content"

const createPost = async (postData: PostContent) => {
    const response = await fetch('http://localhost:3000/create-post', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(postData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(!response.ok) {
        const info = await response.json()
        const error: object = new Error(info.details || 'Something went wrong')
        throw error
    }

    const { data } = await response.json()

    return data;
}

export const useCreatePost = () => {
    const navigate = useNavigate();
    const createPostMutation = useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['posts']});
            Swal.fire({
                title: 'Success!',
                text: 'Your post has been created',
                icon: 'success',
                confirmButtonText: 'Okey'
            })
            navigate("/")
        }
    })

    return createPostMutation;
}