import Cookies from "js-cookie";

export const useAuth = () => {
    const authCookie: string | null | undefined = Cookies.get('auth');
    const auth = authCookie ? JSON.parse(authCookie).auth : null;
    
    const logout = () => {
        Cookies.remove('auth', { path: '/' })
    }

    return {auth, logout};
}