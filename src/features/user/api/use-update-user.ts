import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../../api/query-client';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../shared/hooks/useAuth';
import Swal from 'sweetalert2';
import { ResultData } from "../types/user-data";

const updateUser = async (userData: ResultData) => {
    const response = await fetch('http://localhost:3000/users',{
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer your_token_here'
        }
    });

    if (!response.ok) {
        const info = await response.json();
        const error: any = new Error(info.details || 'Something went wrong');
        throw error;
    }

    const { data } = await response.json();

    return data;
};

export const useUpdateUser = () => {
    const navigate = useNavigate()
    const { update } = useAuth()

    const updateUserMutation = useMutation({
        mutationFn: updateUser,
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['users']})
            update(data)
            Swal.fire({
                title: 'Success!',
                text: 'Your profile has been updated.',
                icon: 'success',
                confirmButtonText: 'Okay',
              });
            navigate('/user/profile')
        }
      
    })

    return updateUserMutation
}