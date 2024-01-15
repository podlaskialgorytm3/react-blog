import Cookies from "js-cookie";
import { UserData} from "../types/user-data";

export const useAuth = () => {
    const authCookie: string | null | undefined = Cookies.get('auth');
    const auth = authCookie ? JSON.parse(authCookie).auth : null;
    const userData = authCookie ? JSON.parse(authCookie) : null;
    
    const logout = () => {
        Cookies.remove('auth', { path: '/' })
    }
    const login = (data: UserData) => {
        Cookies.set('auth',JSON.stringify(data), { expires: 365 });
    }

    return {auth,userData, logout, login};
}