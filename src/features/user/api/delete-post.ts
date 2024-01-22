import { DeletePostResponse } from '../types/delete-post-response';

export const deletePost = async (post_id: number): Promise<DeletePostResponse> => {
    const response = await fetch(`http://localhost:3000/delete-post/${post_id}`, {
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
