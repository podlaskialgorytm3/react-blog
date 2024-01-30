import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../api/query-client";
import { URL } from "../../../shared/config/confidential-data";
const deleteTagPost = async (post_id) => {
    const response = await fetch(`${URL}/post/tags/${post_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
};
export const useDeleteTagPost = () => (useMutation({
    mutationFn: deleteTagPost,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["post-tag"] });
        console.log("Tag deleted from post");
    }
}));
