import { MainDescription } from "../../features/home/main-description"
import { MainTitle } from "../../features/home/main-title"

import { useSpring, animated } from 'react-spring';


export const Home = () => {


    const props = useSpring({
        opacity: 1,
        from: { opacity: 0 },
      });

    return (
       <main>
        <animated.div style={props}>
            <MainTitle />
            <MainDescription />
        </animated.div>
       </main>
    )
}