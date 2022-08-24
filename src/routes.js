import {USER_ADD, USER_LIST, ERROR, HOME_PAGE, LOGIN_ROUTE, REGISTRATION_ROUTE, COMPANY_LIST,COMPANY_ADD, USER_PROFILE, COMPANY_PROFILE} from "./utils/const";
import LoginPage from "./pages/Authorization/loginPage";
import RegistrationPage from "./pages/Authorization/registrationPage";
import CompanyLIst from "./pages/Company/companyList";
import UserList from "./pages/User/userList";
import HomePage from "./pages/start";
import UserAdd from "./pages/User/userAdd";
import Error from "./pages/Errors/error";
import CompanyAdd from "./pages/Company/companyCreate";
import userProfilePage from "./pages/User/userProfilePage";
import UserProfile from "./components/Users/UserProfile";


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
        path: USER_PROFILE,
        Component: UserProfile
    },
    {
        path: COMPANY_PROFILE,
        Component: CompanyAdd
    },
]
