import HomePage from '../pages/Home/HomePage';
import NewspaperEditor from '../pages/Templates/NewspaperEditor';
import LoginPage from '../pages/Login/LoginPage';



// Define your routes as an array of route objects
const routes = [
    {
        path: '/',
        element: HomePage,
        exact: true,
    },
    {
        path: '/newspapereditor/',
        element: NewspaperEditor,
    },
    {
        path: '/newspapereditor/:newsid/:pageid',
        element: NewspaperEditor,
    },
    {
        path: '/login',
        element: LoginPage,
    },





];

export default routes;
