export const fetchUsername = async (userId: number) => {
    const response = await fetch(`http://localhost:3000/fetch-username/${userId}`)
    const  username  = await response.json()
    
    if(!response.ok) {
        throw new Error(username.message)
    }
    console.log(username)

    return username
}