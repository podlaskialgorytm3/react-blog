import { useMutation } from '@tanstack/react-query';
import { updateUser, queryClient } from './update-user';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../shared/hooks/useAuth';
import Swal from 'sweetalert2';

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