export interface PostResponse {
    post_id: number;
    user_id: number;
    title: string;
    description: string;
    image: string;
    user: {
        first_name: string;
        last_name: string;
        image: string;
    }
}