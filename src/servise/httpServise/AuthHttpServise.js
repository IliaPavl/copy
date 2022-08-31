import { ACCESS_TOKEN, AUTHRIZATION_WORD, REG_LINK, URL_LOGIN, URL_REGISTRATION_ROUTE } from "../../utils/const";
import api from "./api";

class AuthHttpServise {
    logining(username, password) {
        const u = {
            username: username,
            password: password
        };
        return api.post(URL_LOGIN, u, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    createAdmin(login, email, password,companyE){
        const u = {
            username: login,
            password: password,
            email: email,
            nameClient: companyE,
            link: window.location.href+REG_LINK
        };
        return api.post(URL_REGISTRATION_ROUTE, u,{
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
            }
        });
    }
}
export default new AuthHttpServise();