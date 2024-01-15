import Cookies from "js-cookie";
import { UserData} from "../types/user-data";
import { ResultData } from "../../features/user/types/user-data";

export const useAuth = () => {
    const authCookie: string | null | undefined = Cookies.get('auth');
    const auth = authCookie ? JSON.parse(authCookie).auth : null;
    let userData = authCookie ? JSON.parse(authCookie) : null;
    
    const logout = () => {
        Cookies.remove('auth', { path: '/' })
    }
    const login = (data: UserData) => {
        Cookies.set('auth',JSON.stringify(data), { expires: 365 });
    }
    const update = (data: ResultData) => {
       if(authCookie){
            const currentData = JSON.parse(authCookie);
            const newData = {
                ...currentData,
                first_name: data.firstName,
                last_name: data.lastName,
                phone: data.phone,
                city: data.city,
                date_of_birth: data.dateOfBirth,
                
            }
            Cookies.set('auth',JSON.stringify(newData), { expires: 365 })
            userData = newData;
        
       }
    }

    return {auth,update,userData, logout, login};
}