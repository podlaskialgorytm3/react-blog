import { NavLink, useNavigate } from "react-router-dom"
import Logo from "../../assets/logo.png"
import { MenuItemsStyles } from "../types/menu"
import { useAuth } from "../hooks/useAuth";

const menuItemsStyles: MenuItemsStyles = {
    loginItems: "border-[1px] border-solid rounded-[20px] text-white pt-3 pb-3 pl-5 pr-5 font-bold",
    gradient: "bg-gradient-to-r from-green-500 via-green-700 to-green-900"
}

export const Menu = () => {
    const {auth , logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout()
        navigate('/signin')
    }

    return (
        <nav className="w-full h-[100px] p-4 shadow-md flex justify-center">
            <div className="flex justify-between items-center h-full w-full md:w-[90%]">
                <NavLink to="/"><img src={Logo} className="w-16"/></NavLink>
                <div className="w-[200px] flex justify-between">
                    {
                        auth ? (
                            <>
                                <NavLink to="/user/profile" className={menuItemsStyles.loginItems}>Profile</NavLink>
                                <button className={menuItemsStyles.loginItems} onClick={handleLogout}>Logout</button>
                            </>
                        ) : (
                            <>
                                <NavLink to="/signin" className={menuItemsStyles.loginItems}>Sign In</NavLink>
                                <NavLink to="/signup" className={`${menuItemsStyles.loginItems} ${menuItemsStyles.gradient}`}>Sign Up</NavLink>
                            </>
                        )
                    }
                </div>
            </div>
        </nav>
    )
}