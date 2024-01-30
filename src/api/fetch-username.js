import { URL } from "../shared/config/confidential-data";
export const fetchUsername = async (userId) => {
    const response = await fetch(`${URL}/username/${userId}`);
    const username = await response.json();
    if (!response.ok) {
        throw new Error(username.message);
    }
    return username;
};
