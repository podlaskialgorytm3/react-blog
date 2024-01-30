import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Description } from "../../features/home/components/description";
import { Title } from "../../features/home/components/title";
import { HomeContainer } from "../../features/home/components/home";
import { PostContainer } from "../../features/posts/components/post-container";
export const Home = () => {
    return (_jsxs("main", { children: [_jsxs(HomeContainer, { children: [_jsx(Title, {}), _jsx(Description, {})] }), _jsx(PostContainer, {})] }));
};
