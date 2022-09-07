import { ACCESS_TOKEN, AUTH, LAST_PAGE, REFRESH_TOKEN, USERNAME } from "../../utils/const";

class LocalServise  {
    saveTokens(data){
        const { token, refreshToken } = data.data;
        localStorage.setItem(ACCESS_TOKEN, token);
        localStorage.setItem(AUTH,true);
        localStorage.setItem(REFRESH_TOKEN,refreshToken);
    }

    setLastPage(page){
        localStorage.setItem(LAST_PAGE, page);
    }

    getLastPage(){
        return localStorage.getItem(LAST_PAGE);
    }

    getAccesToken(){
        return localStorage.getItem(ACCESS_TOKEN);
    }

    getRefreshToken(){
        return localStorage.getItem(REFRESH_TOKEN);
    }

    setAccesToken(accessToken){
        localStorage.setItem(ACCESS_TOKEN,accessToken);
    }
    setRefreshToken(refreshToken){
        localStorage.setItem(ACCESS_TOKEN,refreshToken);
    }

    logoutUser(){
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        localStorage.removeItem(AUTH);
        localStorage.removeItem(USERNAME);
    }

    saveUserName(username){
        localStorage.setItem(USERNAME,username);
    }

    getUserName(){
        return localStorage.getItem(USERNAME);
    }
};

export default new LocalServise();