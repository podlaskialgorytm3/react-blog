import { fetchPostImage } from "../../../api/fetch-post-image";

export const fetchUserPost = async (id: number) => {
    const response = await fetch(`http://localhost:3000/fetch-user-post/${id}`);

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