import { ACCESS_TOKEN, AUTHRIZATION_WORD, URL_INEGTRATION_AMO_SAVE, URL_INEGTRATION_AMO_TEST, URL_INEGTRATION_AMO_TEST_FUNCTION } from "../../utils/const";
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

function testFunction(data){
    return api.post(URL_INEGTRATION_AMO_TEST_FUNCTION, data, {
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
    saveAmo,
    testFunction
}
export default AmoHtttp;