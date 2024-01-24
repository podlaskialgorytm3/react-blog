import { fetchPostImage } from "./fetch-post-image";
import { fetchUsername } from "./fetch-username";
import { fetchUserImage } from "./fetch-user-image";

export const fetchPosts = async (page: number) => {
    const response = await fetch(`http://localhost:3000/fetch-posts?page=${page}`);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const posts = await response.json();

    const userPromises = posts.map(async (post: any) => {
        const userData = await fetchUsername(post.user_id);
        post.user = userData;

        const userImage = await fetchUserImage(post.user_id);
        post.user.image = userImage;
    });

    await Promise.all(userPromises);

    const imagePromises = posts.map(async (post: any) => {
        const image = await fetchPostImage(post.post_id);
        post.image = image;
    });

    await Promise.all(imagePromises);

    return posts;
};