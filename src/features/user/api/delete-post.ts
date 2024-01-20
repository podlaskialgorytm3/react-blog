export const deletePost = (post_id: number) => {
    const response: any = fetch(`http://localhost:3000/delete-post/${post_id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    } )

    if(!response.ok) {
        throw new Error('Something went wrong')
    }

    return response.json()
}