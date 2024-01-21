import { PostContent } from "../types/post-content"

export const createPost = async (postData: PostContent) => {
    const response = await fetch('http://localhost:3000/create-post', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(postData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(!response.ok) {
        const info = await response.json()
        const error: object = new Error(info.details || 'Something went wrong')
        throw error
    }

    const { data } = await response.json()

    return data;
}