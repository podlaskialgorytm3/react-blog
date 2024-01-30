import { useQuery } from "@tanstack/react-query";
import { URL } from "../shared/config/confidential-data";

const fetchTagToPost = async (postId: number) => {
    const response = await fetch(`${URL}/post/tags/${postId}`);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const data = await response.json();

    return data;
}
export const useFetchTagToPost = (postId: number) => (
    useQuery({
        queryKey: ['post-tag', postId],
        queryFn: () => fetchTagToPost(postId),
    })
)