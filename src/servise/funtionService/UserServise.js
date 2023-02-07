import { toast } from "react-toastify";
import ResultHttpServise from "../httpServise/ResultHttpServise";
import UserHttpServise from "../httpServise/UserHttpServise";
 function setHeadUsers() {
    var keys2 = [];
    keys2.push({ title: "Роль" });
    keys2.push({ title: "Статус" });
    keys2.push({ title: "Фио" });
    keys2.push({ title: "Логин" });
    keys2.push({ title: "Почта" });
    return keys2;
}

 function setHeadIntegration() {
    var keys2 = [];
    keys2.push({ title: "Тип интеграции" });
    keys2.push({ title: "Название" });
    return keys2;
}

 function setRowsUsers() {
    return UserHttpServise.getAllUsers().then((respons) => {
        return (this.makeRowsUsers(respons.data))
    }).catch((error) => {
        let message = error.request.responseText.split('"');
        toast.error(message[3]);
        return null
    })
}

 function createUsers(clients, renj) {
    UserHttpServise.createUsers(clients, renj).then((respons) => {
        toast.success(respons.data)
    }).catch((error) => {
        let message = error.request.responseText.split('"');
        toast.error(message[3]);
    })
}

 function findUsers(seachMessege) {
    return UserHttpServise.findUsers(seachMessege).then((respons) => {
        let k = this.makeRowsUsers(respons.data);
        if (k.length === 0)
            toast.warning("Таких пользоватей нету");
        return (k)
    }).catch((error) => {
        let message = error.request.responseText.split('"');
        toast.error(message[3]);
        return this.makeRowsUsers(null)
    })
}

 function bars(url) {
    return this.getBarComponents(url).then((obj) => {
        return ({ linkMonitors: obj, isAdmin: true });
    })

}

 function trends() {
    return ResultHttpServise.getNameResult().then((respons) => {
        return respons.data;
    }).catch((error) => {
        let message = error.request.responseText.split('"');
        toast.error(message[3]);
        return (null)
    })
}

 function getBarComponents(url) {
    return ResultHttpServise.getLinksResult(url).then((respons) => {
        return respons.data;
    }).catch((error) => {
        let message = error.request.responseText.split('"');
        toast.error(message[3]);
        return (null)
    })
}

 function setAxiosClients() {
    return UserHttpServise.getClientUser().then((respons) => {
        return this.setClientUser(respons);
    }).catch((error) => {
        let message = error.request.responseText.split('"');
        toast.error(message[3]);
    })
}

 function makeRowsUsers(data) {
    var keys3 = [];
    for (let k in data) {
        keys3.push({
            id: data[k].id,
            Клиент: data[k].company,
            Роль: data[k].role,
            Статус: data[k].status,
            ФИО: data[k].fio,
            Логин: data[k].login,
            Почта: data[k].email,
            RegistrationLink: data[k].link
        });
    }

    return keys3;
}

 function setClientUser(respons) {
    var keys = [];
    for (let k in respons.data) {
        keys.push({
            item: respons.data[k].companyName,
        });
    }
    return keys;
}

 function setStatusUser(respons) {
    var keys = [];
    for (let k in respons.data) {
        keys.push({
            item: respons.data[k].status,
        });
    }
    return keys;
}

 function setRoleUser(respons) {
    var keys = [];
    let key2 = [];
    key2 = respons.data.status;
    for (let k1 in key2) {
        keys.push({
            item: key2[k1],
        });
    }
    return keys;
}

 function setRRoleUser(respons) {
    var keys = [];
    for (let k in respons.data) {
        keys.push({
            item: respons.data[k].role
        });
    }
    return keys;
}

 function setUserProfile() {
    return UserHttpServise.getUserProfile().then((respons) => {
        return (respons);
    }).catch((error) => {
        let message = error.request.responseText.split('"');
        toast.error(message[3]);
    })
}

const UserServise = {
    setHeadUsers,
    setHeadIntegration,
    setRowsUsers,
    createUsers,
    findUsers,
    bars,
    trends,
    getBarComponents,
    setAxiosClients,
    makeRowsUsers,
    setClientUser,
    setStatusUser,
    setRoleUser,
    setRRoleUser,
    setUserProfile

}
export default UserServise;