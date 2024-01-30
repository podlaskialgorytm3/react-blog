import Cookies from "js-cookie";
export const useAuth = () => {
    const authCookie = Cookies.get('auth');
    const auth = authCookie ? JSON.parse(authCookie).auth : null;
    let userData = authCookie ? JSON.parse(authCookie) : null;
    const logout = () => {
        Cookies.remove('auth', { path: '/' });
    };
    const login = (data) => {
        Cookies.set('auth', JSON.stringify(data), { expires: 365 });
    };
    const update = (data) => {
        if (authCookie) {
            const currentData = JSON.parse(authCookie);
            const newData = {
                ...currentData,
                first_name: data.firstName,
                last_name: data.lastName,
                phone: data.phone,
                city: data.city,
                date_of_birth: data.dateOfBirth,
            };
            Cookies.set('auth', JSON.stringify(newData), { expires: 365 });
            userData = newData;
        }
    };
    return { auth, update, userData, logout, login };
};
