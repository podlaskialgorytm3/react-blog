import { Description } from "../../features/home/components/description"
import { Title } from "../../features/home/components/title"

import { HomeContainer } from "../../features/home/components/home"


export const Home = () => {
    return (
       <main>
        <HomeContainer>
            <Title />
            <Description />
        </HomeContainer>
       </main>
    )
}