import { ResultData } from "../types/user-data";

export const updateUser = async (userData: ResultData) => {
    const response = await fetch('http://localhost:3000/update-user',{
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer your_token_here'
        }
    });

    if (!response.ok) {
        const info = await response.json();
        const error: any = new Error(info.details || 'Something went wrong');
        throw error;
    }

    const { data } = await response.json();

    return data;
};
