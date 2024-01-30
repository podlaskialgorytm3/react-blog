import { jsx as _jsx } from "react/jsx-runtime";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from "./features/auth/utils/fetch-data";
import { routes } from "./routes/routes";
function App() {
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(RouterProvider, { router: routes }) }));
}
export default App;
