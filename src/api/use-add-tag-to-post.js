import { useMutation } from "@tanstack/react-query";
import { queryClient } from "./query-client";
import { URL } from "../shared/config/confidential-data";
const addTagToPost = async ({ postId, tagId }) => {
    const response = await fetch(`${URL}/post/tags`, {
        method: 'POST',
        body: JSON.stringify({ postId, tagId }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message);
    }
    const { data } = await response.json();
    return data;
};
export const useAddTagToPost = () => (useMutation({
    mutationFn: addTagToPost,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['post-tag'] });
    }
}));
