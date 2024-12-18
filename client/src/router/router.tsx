import { createBrowserRouter } from "react-router-dom"
import Layout from "../pages/Layout"
import ErrorPage from "../pages/ErrorPage"
import Home from "../pages/Home"
import Transactions from "../pages/Transactions"
import Categories, { categoriesAction, cayegoryLoader } from "../pages/Categories"
import Auth from "../pages/Auth"
import About from "../pages/About"
import { ProtectedRoute } from "../components/ProtectedRoute"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children:[
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'transactions',
                element: <ProtectedRoute>
                            <Transactions/>
                        </ProtectedRoute>,
            },
            {
                path: 'categories',
                action: categoriesAction,
                loader: cayegoryLoader,
                element: <ProtectedRoute>
                            <Categories />
                        </ProtectedRoute>,
            },
            {
                path: 'auth',
                element: <Auth />,
            },
            {
                path: 'about',
                element: <About />,
            },

        ]
    }
])
