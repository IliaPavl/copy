import {BOOK_ADD, BOOK_LIST, ERROR, HOME_PAGE, LOGIN_ROUTE, REGISTRATION_ROUTE, USER_LIST} from "./utils/const";
import LoginPage from "./pages/Authorization/loginPage";
import RegistrationPage from "./pages/Authorization/registrationPage";
import UsersList from "./pages/Users/userList";
import BookList from "./pages/Book/bookList";
import HomePage from "./pages/start";
import BookAdd from "./pages/Book/bookAdd";
import Error from "./pages/Errors/error";

export const authRoutes = []

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: LoginPage
    },
    {
        path: REGISTRATION_ROUTE,
        Component: RegistrationPage
    },
    {
        path: HOME_PAGE,
        Component: HomePage
    },
    {
        path: BOOK_LIST,
        Component: BookList
    },
    {
        path: USER_LIST,
        Component: UsersList
    },
    {
        path: BOOK_ADD,
        Component: BookAdd
    },
    {
        path: ERROR,
        Component: Error
    },
]
