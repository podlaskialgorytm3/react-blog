import { useMutation } from '@tanstack/react-query';
import { createPost } from '../api/create-post';
import { queryClient } from '../api/query-client';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const useCreatePost = () => {
    const navigate = useNavigate();

    const createPostMutation = useMutation({
        mutationFn: createPost,
        onSuccess: (data) => {
            console.log(data)
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