import { ACCESS_TOKEN, AUTHRIZATION_WORD, URL_ADD_CLIENTS, URL_ALL_CLIENTS, URL_DELETE_USER, URL_SEARCH_CLIENTS } from '../../utils/const';
import api from "./api";

 function getAllClients() {
    return api.get(URL_ALL_CLIENTS, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
}

 function getStatusClient() {
    return api.get(URL_ADD_CLIENTS, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
}

 function setNewClient(companyName, nameCliet, phoneNumber, status) {

    const u = {
        companyName: companyName,
        nameClient: nameCliet,
        phoneNumber: phoneNumber,
        status: status
    };
    return api.post(URL_ADD_CLIENTS, u, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
}

 function getClient(url) {
    return api.get(url, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
}

 function updateCompany(companyName, nameCliet, phoneNumber, enabledStatus, url) {
    const u = {
        companyName: companyName,
        nameClient: nameCliet,
        phoneNumber: phoneNumber,
        status: enabledStatus
    };
    return api.post(url, u, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
}

 function findClient(findString) {
    const u = {
        searchValue: findString,
    };
    return api.post(URL_SEARCH_CLIENTS, u, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
}

 function deleteUser(box) {
    const u = {
        idUsers: box
    };
    return api.post(URL_DELETE_USER, u, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
}

const ClientHttpServise = {
    getAllClients,
    getStatusClient,
    setNewClient,
    getClient,
    updateCompany,
    findClient,
    deleteUser
};

export default ClientHttpServise;