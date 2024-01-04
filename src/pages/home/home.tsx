import { MainDescription } from "../../features/home/components/main-description"
import { MainTitle } from "../../features/home/components/main-title"

import { TextContainer } from "../../features/home/components/text-container"


export const Home = () => {
    return (
       <main>
        <TextContainer>
            <MainTitle />
            <MainDescription />
        </TextContainer>
       </main>
    )
}