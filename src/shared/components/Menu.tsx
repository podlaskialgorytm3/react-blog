import { NavLink } from "react-router-dom"

export const Menu = () => {
    return (
        <nav className="w-11 h-20 bg-red-500">
            <NavLink to="/">Strona główna</NavLink>
            <NavLink to="/signin">Zaloguj się</NavLink>
            <NavLink to="/signup">Zarejestruj się</NavLink>
        </nav>
    )
}