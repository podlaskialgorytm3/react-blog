import { useQuery } from "@tanstack/react-query";

const fetchTagToPost = async (postId: number) => {
    const response = await fetch(`http://localhost:3000/fetch-post-tags/${postId}`);

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