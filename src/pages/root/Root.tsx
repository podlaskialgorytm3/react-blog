import { Outlet } from "react-router-dom"
import { Menu } from "../../shared/components/Menu"

export const Root = () => {
    return (
        <>
            <Menu />
            <h1>Strona główna</h1>
            <Outlet />
        </>
    )
}