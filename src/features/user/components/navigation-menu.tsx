import { NavLink } from "react-router-dom";

import AccountIcon from '../../../assets/account.png';
import BlogIcon from '../../../assets/blog.png';
import SettingsIcon from '../../../assets/settings.png';


const imgStyle = "w-[70px] h-[70px] p-1 rounded-[10px]"

export const NavigationMenu = () => {

    return(
        <div className={`mb-10 w-[500px] h-[100px] flex justify-around`}>
                <NavLink to="/user/post-settings" style={({isActive}) => ({backgroundColor: isActive ? '#41c48b' : ''})} className={'h-[70px] rounded-3xl'}>
                    <img src={BlogIcon} alt="Post Settings" className={imgStyle}/>
                </NavLink>
                <NavLink to="/user/profile" style={({isActive}) => ({backgroundColor: isActive ? '#41c48b' : ''})}  className={'h-[70px] rounded-3xl'}>
                    <img src={AccountIcon} alt="Account Information" className={imgStyle}/>
                </NavLink>
                <NavLink to="/user/settings" style={({isActive}) => ({backgroundColor: isActive ? '#41c48b' : ''})}  className={'h-[70px] rounded-3xl'}>
                    <img src={SettingsIcon} alt="Account Settings" className={imgStyle}/>
                </NavLink>
        </div>
    )
}