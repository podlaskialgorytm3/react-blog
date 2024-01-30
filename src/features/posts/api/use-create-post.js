import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../../api/query-client';
import { useNavigate } from 'react-router-dom';
import { URL } from '../../../shared/config/confidential-data';
import Swal from 'sweetalert2';
const createPost = async (postData) => {
    const response = await fetch(`${URL}/posts`, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(postData),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        const info = await response.json();
        const error = new Error(info.details || 'Something went wrong');
        throw error;
    }
    const { data } = await response.json();
    return data;
};
export const useCreatePost = () => {
    const navigate = useNavigate();
    const createPostMutation = useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            Swal.fire({
                title: 'Success!',
                text: 'Your post has been created',
                icon: 'success',
                confirmButtonText: 'Okey'
            });
            navigate("/");
        }
    });
    return createPostMutation;
};
