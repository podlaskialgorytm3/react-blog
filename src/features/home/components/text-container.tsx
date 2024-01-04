import { useSpring, animated } from 'react-spring';

import PropsType from "../types/props-types"

export const TextContainer = ({children}: any) => {
    const props = useSpring<PropsType>({
        opacity: 1,
        from: { opacity: 0 },
        config: { duration: 3000 },
      });
    return(
        <animated.div style={props}>
            {children}
        </animated.div>
    )
}