import { QueryClient } from "@tanstack/react-query";
import { URL } from "../../../shared/config/confidential-data";
export const queryClient = new QueryClient();
export const createNewUser = async (userData) => {
    const response = await fetch(`${URL}/users`, {
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
        const error = new Error(info.details || 'Something went wrong');
        throw error;
    }
    const { data } = await response.json();
    return data;
};
export const fetchUsers = async (userData) => {
    const response = await fetch(`${URL}/login`, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer your_token_here'
        }
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    }
    else {
        const info = await response.json();
        const error = new Error(info.error || 'Something went wrong');
        throw error;
    }
};
export const sendMail = async (email) => {
    const response = await fetch(`${URL}/email`, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({ email }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer your_token_here'
        }
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    }
    else {
        const info = await response.json();
        const error = new Error(info.error || 'Something went wrong');
        throw error;
    }
};
export const sendPassword = async (passwordData) => {
    const response = await fetch(`${URL}/password`, {
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
    }
    else {
        const info = await response.json();
        const error = new Error(info.error || 'Something went wrong');
        throw error;
    }
};
