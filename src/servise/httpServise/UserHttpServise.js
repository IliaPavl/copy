import { ACCESS_TOKEN, AUTHRIZATION_WORD, URL_ALL_USER, URL_EDIT_USER, URL_IS_ADMIN, URL_PROFILE, URL_REGISTRATION_ROUTE, URL_ROLEUSER, URL_ROLE_USER, URL_SEARCH_USER, URL_STATUS_USER, URL_USER_COMPANYNAME } from "../../utils/const";
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
        return api.get(URL_USER_COMPANYNAME, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
            }
        });
    }

    getRegistratios(){
        return api.get(URL_REGISTRATION_ROUTE, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
            }
        });
    }

    getEditUser(){
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

    updateUser(login,fioUser,email,password,roleE,statusE,companyE,url,links){
        roleE = roleE.toString()
        const u = {
            login: login,
            company: companyE,
            fio: fioUser,
            password: password,
            email: email,
            role: roleE,
            status: statusE,
            accessUserInCompany: links
        };
        return api.post(url, u,{
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
            }
        });
    }
    findUsers(seachMessege){
        const u = {
            searchValue: seachMessege,
        };
        return api.post(URL_SEARCH_USER, u, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
            }
        });
    }
    userRole(){
        return api.get(URL_ROLEUSER, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
            }
        });
    }

    isAdmin(){
        return api.get(URL_IS_ADMIN, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
            }
        });
    }


    getUserProfile(){
        return api.get(URL_PROFILE, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
            }
        });
    }

}
export default new UserHttpServise();