import { ACCESS_TOKEN, AUTHRIZATION_WORD, URL_INDICATOR_RESULT, URL_INDICATOR_RESULT_NAME, URL_INDICATOR_RESULT_SEARCH } from '../../utils/const';
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

    getNameResult() {
        return api.get(URL_INDICATOR_RESULT_NAME, {
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
};

export default new ResultHttpServise();