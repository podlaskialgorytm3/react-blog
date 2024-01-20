import { fetchImage } from "./fetch-image";
import { fetchUsername } from "./fetch-username";

export const fetchPosts = async () => {
    const response = await fetch('http://localhost:3000/fetch-posts');

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const posts = await response.json();

    const usernamePromises = posts.map(async (post: any) => {
        const userData = await fetchUsername(post.user_id);
        post.username = userData; // Dodaj username do obiektu post
    });

    await Promise.all(usernamePromises);

    const imagePromises = posts.map(async (post: any) => {
        const image = await fetchImage(post.post_id);
        post.image = image;
    });

    await Promise.all(imagePromises);

    console.log(posts)

    return posts;
};