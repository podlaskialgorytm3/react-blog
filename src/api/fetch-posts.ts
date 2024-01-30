import { fetchPostImage } from "./fetch-post-image";
import { fetchUsername } from "./fetch-username";
import { fetchUserImage } from "./fetch-user-image";
import { URL } from "../shared/config/confidential-data";

export const fetchPosts = async (page: number,postCountOnPage: number) => {
    const response = await fetch(`${URL}/posts?page=${page}&postCount=${postCountOnPage}`);

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