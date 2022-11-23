import IndicatorResult from "../IndicatorResult/IndicatorResult";
import UserProfileEdit from "../Users/UserProfileEdit";
import LoginPage from "../../pages/Authorization/loginPage";
import RegistrationPage from "../../pages/Authorization/registrationPage";
import CompanyAdd from "../../pages/Company/companyCreate";
import companyEdit from "../../pages/Company/companyEdit";
import CompanyLIst from "../../pages/Company/companyList";
import Error from "../../pages/Errors/error";
import TrendsPage from "../../pages/Trends/start";
import profilePage from "../../pages/User/profilePage";
import newPassword from "../../pages/User/newPasswordPage";
import activate from "../../pages/User/activateAccauntPage";
import UserAdd from "../../pages/User/userAdd";
import UserList from "../../pages/User/userList";
import { ACTIVATION, COMPANY_ADD, COMPANY_LIST, COMPANY_PROFILE, ERROR, FORGOT_PASSWPRD, HOME_PAGE, INDICATOR_RESULT, LOGIN_ROUTE, NEW_PASSWORD, REGISTRATION_ROUTE, USER_ADD, USER_EDIT, USER_LIST, USER_PROFILE } from "../../utils/const";
import forgotPassword from "../../pages/User/forgotPassword";


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
        path: USER_EDIT + "/:searchValue",
        Component: UserProfileEdit
    },
    {
        path: COMPANY_PROFILE + "/:searchValue",
        Component: companyEdit
    },
    {
        path: INDICATOR_RESULT + "/:searchValue",
        Component: IndicatorResult
    },
    {
        path: HOME_PAGE,
        Component: TrendsPage
    },
    {
        path: USER_PROFILE,
        Component: profilePage
    },
]

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
        path: NEW_PASSWORD + "/:searchValue",
        Component: newPassword
    },
    {
        path: ACTIVATION + "/:searchValue",
        Component: activate
    },
    {
        path: FORGOT_PASSWPRD,
        Component: forgotPassword
    },
]
