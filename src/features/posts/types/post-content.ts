export interface PostContent {
    postId: number;
    userId: number;
    title: string;
    content: string;
}
export interface PostRequest {
    post_id: number;
    user_id: number;
    title: string;
    description: string;
    image: string;
}