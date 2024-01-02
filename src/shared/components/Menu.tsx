import { NavLink } from "react-router-dom"
import HomeWorkIcon from '@mui/icons-material/HomeWork';

export const Menu = () => {
    return (
        <nav className="w-full h-[100px] bg-[white] p-4 shadow-md flex justify-center">
            <div className="flex justify-between items-center h-full w-[80%]">
                <NavLink to="/"><HomeWorkIcon sx={{color: "black",fontSize: "40px"}} /> micheal-react-blog</NavLink>
                <div className="w-[200px] flex justify-between">
                    <NavLink to="/signin" className="w-[100px] h-[60px] text-center leading-[60px]">Sign In</NavLink>
                    <NavLink to="/signup" className="bg-[#41c48b] w-[100px] h-[60px] text-center leading-[60px] text-white rounded-2xl hover:bg-[#328a63]">Sign Up</NavLink>
                </div>
            </div>
        </nav>
    )
}