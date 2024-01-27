import Home from "./pages/Home";
import AddContact from "./pages/AddContact";

const routes = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/new',
        element: <AddContact />
    }
];

export default routes;
