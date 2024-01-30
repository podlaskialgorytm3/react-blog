import { useQuery } from "@tanstack/react-query";
import { fetchPostImage } from "./fetch-post-image";
import { fetchUsername } from "./fetch-username";
import { fetchUserImage } from "./fetch-user-image";
import { URL } from "../shared/config/confidential-data";
const fetchPost = async (post_id) => {
    const response = await fetch(`${URL}/posts/${post_id}`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const post = await response.json();
    const userData = await fetchUsername(post.user_id);
    post.user = userData;
    const userImage = await fetchUserImage(post.user_id);
    post.user.image = userImage;
    const image = await fetchPostImage(post.post_id);
    post.image = image;
    return post;
};
export const useFetchPost = (id) => (useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(parseInt(id || ""))
}));
