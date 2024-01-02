import { Outlet } from "react-router-dom"
import { Menu } from "../../shared/components/Menu"

export const Root = () => {
    return (
        <>
            <Menu />
            <Outlet />
        </>
    )
}