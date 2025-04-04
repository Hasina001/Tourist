/* eslint-disable no-unused-vars */
import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Home from '../pages/home/Home'
import APropos from '../pages/miniPage/APropos'
import Contact from '../pages/miniPage/Contact'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '/acceuil',
                element: <Home/>
            },
            {
                path:'/a-propos',
                element: <APropos/>
            },
            {
                path:'/contact',
                element: <Contact/>
            }
        ]
    }
])

export default router