import { useSpring, animated } from 'react-spring';
import { useAuth } from '../../../shared/hooks/useAuth';

import PropsType from "../types/props-types"

import { Menu } from "./menu"

export const HomeContainer = ({children}: any) => {
    const  {auth, userData}  = useAuth();

    const props = useSpring<PropsType>({
        opacity: 1,
        from: { opacity: 0 },
        config: { duration: 3000 },
      });

    return(
        <>
            <animated.div style={props}>
            {auth && 
                <div className="flex flex-col items-center justify-center w-full h-full">
                    <h1 className="text-4xl">Witaj {userData.first_name} {userData.last_name} 👋</h1>
                </div>
            }
            {children}
            </animated.div>
            <br/>
            {auth && 
            <>
                <Menu/>
            </>
            }
        </>
    )
}