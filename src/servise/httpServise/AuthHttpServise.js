import { ACCESS_TOKEN, AUTHRIZATION_WORD, REG_LINK, URL_ACTIVATION, URL_FORGOT_PASSWPRD, URL_LOGIN, URL_NEW_PASSWORD, URL_REGISTRATION_ROUTE } from "../../utils/const";
import api from "./api";
import LocalServise from "./LocalServise";

 function logining(username, password) {
    const u = {
        username: username,
        password: password,
        refreshToken: LocalServise.getRefreshToken()
    };
    return api.post(URL_LOGIN, u, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

 function createAdmin(login, email, password, companyE) {
    const u = {
        username: login,
        password: password,
        email: email,
        nameClient: companyE,
        link: window.location.href + REG_LINK
    };
    return api.post(URL_REGISTRATION_ROUTE, u, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
}

 function postNewPassword(password, link) {
    const u = {
        message: password,
    };
    return api.post(URL_NEW_PASSWORD + "/" + link, u, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
}

 function postForgotPassword(email) {
    const u = {
        message: email,
    };
    return api.post(URL_FORGOT_PASSWPRD, u, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
}

 function postActivateLink(link) {
    return api.get(URL_ACTIVATION + "/" + link, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
}

const AuthHttpServise = {
    logining,
    createAdmin,
    postNewPassword,
    postForgotPassword,
    postActivateLink
}
export default AuthHttpServise;