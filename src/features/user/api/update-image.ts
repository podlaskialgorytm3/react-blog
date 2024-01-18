export const updateImage = async (formData: any) => {
    const response = await fetch(`http://localhost:3000/update-photo`,{
        method: 'PUT',
        mode: 'cors',
        body: formData,
        headers: {
            'Content-Type': 'multipart/form-data', 
            'Accept': 'application/json'
        }
    })
    console.log(response)
    if(!response.ok){
        const info = await response.json();
        const error: any = new Error(info.details || 'Something went wrong');
        throw error;
    }
    const { data } = await response.json();
    return data;
}