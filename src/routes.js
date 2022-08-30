import UserProfile from "./components/Users/UserProfile";
import LoginPage from "./pages/Authorization/loginPage";
import RegistrationPage from "./pages/Authorization/registrationPage";
import companyEdit from "./pages/Company/companyEdit";
import CompanyAdd from "./pages/Company/companyCreate";
import CompanyLIst from "./pages/Company/companyList";
import Error from "./pages/Errors/error";
import HomePage from "./pages/start";
import UserAdd from "./pages/User/userAdd";
import UserList from "./pages/User/userList";
import { COMPANY_ADD, COMPANY_LIST, COMPANY_PROFILE, ERROR, HOME_PAGE, LOGIN_ROUTE, REGISTRATION_ROUTE, USER_ADD, USER_LIST, USER_PROFILE } from "./utils/const";


export const authRoutes = [
    {
        path: USER_LIST,
        Component: UserList
    },
    {
        path: COMPANY_LIST,
        Component: CompanyLIst
    },
    {
        path: USER_ADD,
        Component: UserAdd
    },
    {
        path: ERROR,
        Component: Error
    },
    {
        path: COMPANY_ADD,
        Component: CompanyAdd
    },
    {
        path: USER_PROFILE+"/:searchValue",
        Component: UserProfile
    },
    {
        path: COMPANY_PROFILE+"/:searchValue",
        Component: companyEdit
    },]

export const publicRoutes = [
    {
        path: HOME_PAGE,
        Component: HomePage
    },
    {
        path: LOGIN_ROUTE,
        Component: LoginPage
    },
    {
        path: REGISTRATION_ROUTE,
        Component: RegistrationPage
    }
]
