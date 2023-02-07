import { ACCESS_TOKEN, AUTH, LAST_PAGE, LOGIN_ROUTE, REFRESH_TOKEN, REMEMBER_MY, USERNAME } from "../../utils/const";

 function saveTokens(data) {
    const { token, refreshToken } = data.data;
    localStorage.setItem(ACCESS_TOKEN, token);
    localStorage.setItem(AUTH, true);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
}

 function setLastPage(page) {
    localStorage.setItem(LAST_PAGE, page);
}

 function setRememberMy(value) {
    localStorage.setItem(REMEMBER_MY, value);
}

 function getRememberMy() {
    return localStorage.getItem(REMEMBER_MY);
}

 function getLastPage() {
    return localStorage.getItem(LAST_PAGE);
}

 function getAccesToken() {
    return localStorage.getItem(ACCESS_TOKEN);
}

 function getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN);
}

 function setAccesToken(accessToken) {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
}

 function setRefreshToken(refreshToken) {
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
}

 function logoutUser() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(AUTH);
    localStorage.removeItem(USERNAME);
}

 function navigate() {
    window.location.replace(LOGIN_ROUTE);
}

 function isLoginUser() {
    if (localStorage.getItem(ACCESS_TOKEN) === null ||
        localStorage.getItem(REFRESH_TOKEN) === null ||
        localStorage.getItem(AUTH) === null ||
        localStorage.getItem(USERNAME) === null
    )
        return false
    else
        return true
}

 function saveUserName(username) {
    localStorage.setItem(USERNAME, username);
}

 function getUserName() {
    let name = localStorage.getItem(USERNAME)
    if (name !== null)
        return name;
    else
        return "error";
}

const LocalServise = {
    saveTokens,
    setLastPage,
    setRememberMy,
    getRememberMy,
    getLastPage,
    getAccesToken,
    getRefreshToken,
    setAccesToken,
    setRefreshToken,
    logoutUser,
    navigate,
    isLoginUser,
    saveUserName,
    getUserName
};

export default LocalServise;