import { NavLink, useNavigate } from "react-router-dom"
import Logo from "../../assets/logo.png"
import { MenuItemsStyles } from "../types/menu"


const menuItemsStyles: MenuItemsStyles = {
    loginItems: "border-[1px] border-solid rounded-[20px] text-white pt-3 pb-3 pl-5 pr-5 font-bold",
    gradient: "bg-gradient-to-r from-green-500 via-green-700 to-green-900"
}

export const Menu = () => {
    const navigate = useNavigate();
    const auth = localStorage.getItem('token')

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/signin')
    }

    return (
        <nav className="w-full h-[100px] p-4 shadow-md flex justify-center bg-[#030712]">
            <div className="flex justify-between items-center h-full w-[90%]">
                <NavLink to="/"><img src={Logo} className="w-16"/></NavLink>
                <div className="w-[200px] flex justify-between">
                    {
                        auth ? (
                            <>
                                <NavLink to="/profile" className={menuItemsStyles.loginItems}>Profile</NavLink>
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