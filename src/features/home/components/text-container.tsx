import { useSpring, animated } from 'react-spring';
//import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

import PropsType from "../types/props-types"

export const TextContainer = ({children}: any) => {
    //const auth = useSelector((state: {auth: {token: string}}) => state.auth.token)
    const authCookie = Cookies.get('auth');
    let auth;
    if (authCookie) {
        auth = JSON.parse(authCookie).auth;
    }

    const props = useSpring<PropsType>({
        opacity: 1,
        from: { opacity: 0 },
        config: { duration: 3000 },
      });

    return(
        <animated.div style={props}>
            {children}
        {auth && <h1>Auth</h1>}
        </animated.div>
    )
}