import Upload from "./upload/uploadFunctionality"
import Login from './authentication/login'


export const allRoute = [
    {
        path: '/',
        component: Upload
    },
    {
        path: '/login',
        component: Login
    }
]