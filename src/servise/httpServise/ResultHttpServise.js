import { ACCESS_TOKEN, AUTHRIZATION_WORD, URL_CHANGR_SETTINGS_TRENDS, URL_GET_SETTINGS_INDICATOR, URL_INDICATOR_LINKS, URL_INDICATOR_RESULT, URL_INDICATOR_RESULT_NAME, URL_INDICATOR_RESULT_SEARCH, URL_NEW_DATA } from '../../utils/const';
import api from "./api";

class ResultHttpServise  {

    getAllClientsResult(url) {
        return api.get(URL_INDICATOR_RESULT+'/'+url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
            }
        });
    }

    getLinksResult(url) {
        return api.get(URL_INDICATOR_LINKS+'/'+url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
            }
        });
    }
    
    getNameResult() {
        return api.get(URL_INDICATOR_RESULT_NAME, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
            }
        });
    }

    getIndicatorSettings(id_indicator) {
        return api.get(URL_GET_SETTINGS_INDICATOR+"/"+id_indicator, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
            }
        });
    }

    changeSettins(settings) {
        const modalSettings = settings;
        return api.post(URL_CHANGR_SETTINGS_TRENDS,modalSettings,{
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
            }
        });
    }

    searchClientsResult(seachMessege) {
        const u = {
            searchValue: seachMessege,
        };
        return api.post(URL_INDICATOR_RESULT_SEARCH,u,{
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
            }
        });
    }

    getIndicatorValues(url) {
        return api.get(URL_NEW_DATA+"/"+url[2]+"/"+url[3],{
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
            }
        });
    }

    setIndicatorValues(localUrl ,value,comment) {
        const values = {member_id: localUrl[2],session_id: localUrl[3], value: value,comment: comment};
        return api.post(URL_NEW_DATA+"/"+localUrl[2]+"/"+localUrl[3],values,{
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
            }
        });
    }
};

export default new ResultHttpServise();