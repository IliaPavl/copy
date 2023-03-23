import axios from "axios";
import { toast } from 'react-toastify';
import { AUTHRIZATION_WORD, URL_BASE, URL_LOGIN, URL_REFRESH, LOGIN_ROUTE } from "../../utils/const";
import LocalServise from "./LocalServise";
const instance = axios.create({
  baseURL: URL_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});
instance.interceptors.request.use(
  (config) => {
    const token = LocalServise.getAccesToken();
    if (token) {
      config.headers["Authorization"] = AUTHRIZATION_WORD + '_' + token;  // for Spring Boot back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== URL_LOGIN && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await instance.post(URL_REFRESH, {
            refreshToken: LocalServise.getRefreshToken(),
          });
          const { accessToken } = rs.data;
          LocalServise.setAccesToken(accessToken);
          //LocalServise.setRefreshToken(refreshToken);
          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
      if (err.response.status === 400 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await instance.post(URL_REFRESH, {
            refreshToken: LocalServise.getRefreshToken(),
          });
          const { accessToken } = rs.data;
          LocalServise.setAccesToken(accessToken);
          //LocalServise.setRefreshToken(refreshToken);
          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
      if (err.response.status === 403) {
        window.location.replace(LOGIN_ROUTE);
        toast.error("Время сессии истекло, перезайдите в приложение!");
        console.info("Время сессии истекло, перезайдите в приложение!");
        LocalServise.logoutUser();
      }
    }
    if (err.response.status === 0) {
      // network error
      toast.error('Ошибка: Ошибка сети');
    }
    if (err.response.status === 503) {
      // network error
      toast.error('Ошибка: Ошибка сервера');
    }
    return Promise.reject(err);
  }
);
export default instance;