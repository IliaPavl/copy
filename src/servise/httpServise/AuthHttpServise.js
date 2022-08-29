import { URL_LOGIN } from "../../utils/const";
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
}
export default new AuthHttpServise();