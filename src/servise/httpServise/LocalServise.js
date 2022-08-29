import { ACCESS_TOKEN, AUTH, REFRESH_TOKEN } from "../../utils/const";

class LocalServise  {
    saveTokens(data){
        const { accessToken, refreshToken } = data.data;
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(AUTH,true);
        localStorage.setItem(REFRESH_TOKEN,refreshToken);
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

};

export default new LocalServise();