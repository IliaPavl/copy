import { ACCESS_TOKEN, AUTHRIZATION_WORD, URL_ADD_USER, URL_ALL_USER, URL_EDIT_USER, URL_ROLE_USER, URL_STATUS_USER } from "../../utils/const";
import api from "./api";

class UserHttpServise {

    getAllUsers() {
        return api.get(URL_ALL_USER, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
            }
        });
    }

    getClientUser(){
        return api.get(URL_ADD_USER, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
            }
        });
    }

    createUsers(companyName,howUsers){
        const u = {
            companyName: companyName,
            howUsers: howUsers,
        };
        return api.post(URL_ADD_USER,u, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
            }
        });
    }

    getProfileUser(){
        return api.get(URL_EDIT_USER, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
            }
        });
    }

    getStatusUser(){
        return api.get(URL_STATUS_USER, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
            }
        });
    }

    getRoleUser(){
        return api.get(URL_ROLE_USER, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
            }
        });
    }

    getUser(url){
        return api.get(url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
            }
        });
    }

    updateUser(login,fioUser,email,password,roleE,statusE,companyE,url){
        const u = {
            companyName: companyName,
            howUsers: howUsers,
        };
        //доделать
        return api.get(url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
            }
        });
    }


}
export default new UserHttpServise();