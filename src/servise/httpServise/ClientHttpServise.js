import { ACCESS_TOKEN, AUTHRIZATION_WORD, URL_ADD_CLIENTS, URL_ALL_CLIENTS } from '../../utils/const';
import api from "./api";


class ClientHttpServise {
    getAllClients() {
        return api.get(URL_ALL_CLIENTS, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
            }
        });
    }
    getStatusClient() {
        return api.get(URL_ADD_CLIENTS, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
            }
        });
    }
    setNewClient(companyName, nameCliet, phoneNumber, status) {

        const u = {
            companyName: companyName,
            nameCliet: nameCliet,
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
};

export default new ClientHttpServise();