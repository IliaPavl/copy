import {
    ACCESS_TOKEN,
    URL_INDICATOR_IND_MEMBER_LIST,
    AUTHRIZATION_WORD,
    URL_INEGTRATION_LIST,
    URL_INEGTRATION_DELETE,
    URL_INEGTRATION_ONE,
    URL_INEGTRATION_SET,
    URL_INEGTRATION_SETTINGS,
    URL_INDICATOR_LIST,
    URL_INDICATOR_IND_MEMBER
} from '../../utils/const';
import api from "./api";

 function getIntegrationSettings() {
    return api.get(URL_INEGTRATION_SETTINGS, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
}

 function getIntegrationList() {
    return api.get(URL_INEGTRATION_LIST, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
}

 function getIntegrationOne(id_inegration) {
    return api.get(URL_INEGTRATION_ONE + id_inegration, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
}

 function setIntegration(name, comment, views, id, source, isOn) {
    let integration = {
        id_integration: id,
        source: source,
        viewName: name,
        json: views,
        jsonData: "",
        testComment: comment,
        isOn: isOn
    }
    return api.post(URL_INEGTRATION_SET, integration, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
}

 function deleteIntegration(integrations) {
    const del = { integrations: integrations }
    return api.post(URL_INEGTRATION_DELETE, del, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
}

 function getIndicatorList() {
    return api.get(URL_INDICATOR_LIST, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
}

 function getIndicatorMemberList(id_indicator) {
    return api.get(URL_INDICATOR_IND_MEMBER_LIST + "/" + id_indicator, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
}

 function getIndicatorMember(id_member) {
    return api.get(URL_INDICATOR_IND_MEMBER + "/" + id_member, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
}

const IntegrationSetting = {
    getIntegrationSettings,
    getIntegrationList,
    getIntegrationOne,
    setIntegration,
    deleteIntegration,
    getIndicatorList,
    getIndicatorMemberList,
    getIndicatorMember
};

export default IntegrationSetting;