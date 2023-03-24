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
    URL_INDICATOR_IND_MEMBER,
    URL_INDICATOR_NEW_INFO,
    URL_INDICATOR_NEW,
    URL_INEGTRATION_TEST,
    URL_INDICATOR_TEST
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
        jsonData: views,
        testComment: comment,
        isOn: isOn
    }
    console.info(integration)
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

function getAmoData(id_member) {
    return api.get(URL_INDICATOR_NEW_INFO + "/" + id_member, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
}
function newIngicator(json, id_member) {
    return api.post(URL_INDICATOR_NEW + "/" + id_member, json, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
}

function testIndicator(id) {
    return api.get(URL_INDICATOR_TEST + "/" + id, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${AUTHRIZATION_WORD}_${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
}
function testIntegration(name, comment, views, id, source, isOn) {
    let integration = {
        id_integration: id,
        source: source,
        viewName: name,
        jsonData: views,
        testComment: comment,
        isOn: isOn
    }
    console.info(integration)
    return api.post(URL_INEGTRATION_TEST, integration, {
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
    testIntegration,
    deleteIntegration,
    getIndicatorList,
    getIndicatorMemberList,
    getIndicatorMember,
    getAmoData,
    newIngicator,
    testIndicator
};

export default IntegrationSetting;