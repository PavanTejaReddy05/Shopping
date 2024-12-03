import Home from '../Views/Home'
import Login from './login';
import { RouterProvider , createBrowserRouter } from 'react-router-dom'
import Signup from './Signup';
import Cart from '../Routes/cart';

const Routes = () => {
    const routesForPublic: any=[
        {
            path:"/",
            element: <Login/>,
        },
        {
            path:"/home",
            element: <Home/>,
        },
        {
            path:"/signup",
            element:<Signup/>
        },
        {
            path:"/cart",
            element:<Cart cart={[]}/>
        },
        ];
    const router=createBrowserRouter([
        ...routesForPublic
    ]);
    return <RouterProvider router={router}/>;
};
export default Routes;