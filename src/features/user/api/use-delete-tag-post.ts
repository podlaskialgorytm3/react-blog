import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../api/query-client";

const deleteTagPost = async (post_id: number) => {
    const response = await fetch(`http://localhost:3000/delete-tag-post/${post_id}`, {
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
}

export const useDeleteTagPost = () => (
    useMutation({
        mutationFn: deleteTagPost,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["post-tag"]});
            console.log("Tag deleted from post")
        }
    })
)