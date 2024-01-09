import { Description } from "../../features/home/components/description"
import { Title } from "../../features/home/components/title"

import { TextContainer } from "../../features/home/components/text-container"


export const Home = () => {
    return (
       <main>
        <TextContainer>
            <Title />
            <Description />
        </TextContainer>
       </main>
    )
}