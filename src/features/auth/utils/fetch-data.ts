import { QueryClient } from "@tanstack/react-query";

import { SignUpData } from "../types/sign-up";

export const queryClient = new QueryClient();

export const createNewUser = async (userData: SignUpData) => {
    const response = await fetch('http://localhost:3000/users',{
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(!response.ok){
        const error = new Error('An error occurred while sending the data');
        throw error;
    }

    const { data } = await response.json();
    return data;
}