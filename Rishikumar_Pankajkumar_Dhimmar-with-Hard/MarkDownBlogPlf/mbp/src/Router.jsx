import { createBrowserRouter } from 'react-router-dom'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Home from './Pages/Home';
import CreateBlog from './Pages/CreateBlog';
import ManyBlogs from './Pages/ManyBlogs';
import Blog from './Pages/Blog';
import UserProfile from './Pages/userProfile';
import EditBlog from './Pages/EditBlog';


const Router = createBrowserRouter([
    {
        path: '/',
        // element: <AppLayout />,
        children: [
            { path: '', element: <Login /> },
            {
                path: '/blogs',
                element: <Home />,
                children: [{
                    path: '',
                    element: <ManyBlogs />
                }, {
                    path: 'create',
                    element: <CreateBlog />
                }, {
                    path: ':id',
                    element: <Blog />
                }, {
                    path: 'edit/:id',
                    element: <EditBlog />
                }],

            },
            {
                path: 'account',
                children: [
                    {
                        path: 'register',
                        element: <Register />
                    },
                    {
                        path: 'login',
                        element: <Login />
                    },
                ]
            },
            {
                path: 'account',
                element: <Home />,

                children: [
                    {
                        path: 'profile',
                        element: <UserProfile />
                    },

                ]
            }

        ]
    }])


export default Router;
