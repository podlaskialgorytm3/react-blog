import { NavLink } from "react-router-dom"

export const Menu = () => {
    return (
        <>
            <NavLink to="/">Strona główna</NavLink>
            <NavLink to="/signin">Zaloguj się</NavLink>
            <NavLink to="/signup">Zarejestruj się</NavLink>
        </>
    )
}