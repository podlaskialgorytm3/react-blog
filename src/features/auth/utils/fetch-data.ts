import { QueryClient } from "@tanstack/react-query";

import { SignUpData } from "../types/sign-up";
import { SignInData } from "../types/sing-in";

export const queryClient = new QueryClient();

export const createNewUser = async (userData: SignUpData) => {
    const response = await fetch('http://localhost:3000/users',{
        method: 'POST',
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
export const fetchUsers = async (userData: SignInData) => {
    const response = await fetch('http://localhost:3000/login',{
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer your_token_here'
        }
    });
    if(response.ok){
        const  data  = await response.json();
        return data;
    }
    else{
        const info = await response.json();
        const error: any = new Error(info.error || 'Something went wrong');
        throw error;
    }
}
export const sendMail = async (email: string) => {
    const response = await fetch('http://localhost:3000/send-email',{
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({email}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer your_token_here'
        }
    });
    if(response.ok){
        const  data  = await response.json();
        return data;
    }
    else{
        const info = await response.json();
        const error: any = new Error(info.error || 'Something went wrong');
        throw error;
    }
}
export const sendPassword = async (passwordData: { password: string, auth: string }) => {
    const response = await fetch('http://localhost:3000/send-password', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(passwordData),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer your_token_here'
        }
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        const info = await response.json();
        const error: any = new Error(info.error || 'Something went wrong');
        throw error;
    }
}

