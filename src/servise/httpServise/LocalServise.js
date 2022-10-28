import { ACCESS_TOKEN, AUTH, LAST_PAGE, REFRESH_TOKEN, REMEMBER_MY, USERNAME } from "../../utils/const";

class LocalServise {
    saveTokens(data) {
        const { token, refreshToken } = data.data;
        localStorage.setItem(ACCESS_TOKEN, token);
        localStorage.setItem(AUTH, true);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
    }

    setLastPage(page) {
        localStorage.setItem(LAST_PAGE, page);
    }
    setRememberMy(value) {
        localStorage.setItem(REMEMBER_MY, value);
    }

    getRememberMy() {
        return localStorage.getItem(REMEMBER_MY);
    }

    getLastPage() {
        return localStorage.getItem(LAST_PAGE);
    }

    getAccesToken() {
        return localStorage.getItem(ACCESS_TOKEN);
    }

    getRefreshToken() {
        return localStorage.getItem(REFRESH_TOKEN);
    }

    setAccesToken(accessToken) {
        localStorage.setItem(ACCESS_TOKEN, accessToken);
    }
    setRefreshToken(refreshToken) {
        localStorage.setItem(ACCESS_TOKEN, refreshToken);
    }

    logoutUser() {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        localStorage.removeItem(AUTH);
        localStorage.removeItem(USERNAME);
    }

    saveUserName(username) {
        localStorage.setItem(USERNAME, username);
    }

    getUserName() {
        let name = localStorage.getItem(USERNAME)
        if (name !== null)
            return name;
        else
            return "error";
    }
};

export default new LocalServise();