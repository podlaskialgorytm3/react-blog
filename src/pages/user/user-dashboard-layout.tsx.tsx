import { Outlet } from "react-router-dom";
import { useAuth } from "../../shared/hooks/useAuth";
import { AuthError } from "../error/error-auth-page";

import { NavigationMenu } from "../../features/user/components/navigation-menu";

export const UserDashboardLayout = () => {
    const { auth } = useAuth();
    return (
    <>
      {auth ? ( 
      <>
        <NavigationMenu />
        <Outlet />
      </>) 
      : 
      ( <AuthError />)}
    </>
  );
};