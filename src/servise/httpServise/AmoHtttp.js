import { ACCESS_TOKEN, AUTHRIZATION_WORD, URL_INEGTRATION_AMO_SAVE, URL_INEGTRATION_AMO_TEST } from "../../utils/const";
import api from "./api";

function amoGet(url){
    return api.get(url, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

function testConnection(data){
    return api.post(URL_INEGTRATION_AMO_TEST, data, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
}
function saveAmo(data){
    return api.post(URL_INEGTRATION_AMO_SAVE, data, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
}


const AmoHtttp ={
    amoGet,
    testConnection,
    saveAmo
}
export default AmoHtttp;