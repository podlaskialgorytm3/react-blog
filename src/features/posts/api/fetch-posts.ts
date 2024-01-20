import { fetchImage } from "./fetch-image";

export const fetchPosts = async () => {
    const response = await fetch('http://localhost:3000/fetch-posts');

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const posts = await response.json();

    const imagePromises = posts.map(async (post: any) => {
        const image = await fetchImage(post.post_id);
        post.image = image;
    });

    await Promise.all(imagePromises);

    return posts;
};
