import { RouterProvider } from "react-router-dom"
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from "./features/auth/utils/fetch-data"
import { routes } from "./routes/routes"

function App() {

  return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={routes}/>
        </QueryClientProvider>
    
  )
}

export default App
