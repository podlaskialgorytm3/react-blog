import { useQuery } from "@tanstack/react-query"
import { fetchPostImage } from "../../../api/fetch-post-image";
import { URL } from "../../../shared/config/confidential-data";

const fetchUserPost = async (id: number) => {
    const response = await fetch(`${URL}/fetch-user-post/${id}`);


    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const posts = await response.json();

    const imagePromises = posts.map(async (post: any) => {
        const image = await fetchPostImage(post.post_id);
        post.image = image;
    });

    await Promise.all(imagePromises);

    return posts;
}

export const useFetchUserPost = (id: number) => (
    useQuery({
        queryKey: ["post"],
        queryFn: () => fetchUserPost(id)
    })
)