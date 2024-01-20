import { Description } from "../../features/home/components/description"
import { Title } from "../../features/home/components/title"

import { HomeContainer } from "../../features/home/components/home"
import { PostContainer } from "../../features/posts/components/post-container"


export const Home = () => {
    return (
       <main>
        <HomeContainer>
            <Title />
            <Description />
        </HomeContainer>
        <PostContainer />
       </main>
    )
}