import { toast } from "react-toastify";
import { ROLE_VLADELTC } from "../../utils/const";
import ResultHttpServise from "../httpServise/ResultHttpServise";
import UserHttpServise from "../httpServise/UserHttpServise";

class UserServise {

    setHeadUsers() {
        var keys2 = [];
        keys2.push({ title: "id" });
        keys2.push({ title: "Client" });
        keys2.push({ title: "Roles" });
        keys2.push({ title: "Status" });
        keys2.push({ title: "FIO" });
        keys2.push({ title: "Login" });
        keys2.push({ title: "Email" });
        keys2.push({ title: "RegistrationLink" });
        return keys2;
    }

    async setRowsUsers() {
        return UserHttpServise.getAllUsers().then((respons) => {
            return (this.makeRowsUsers(respons.data))
        }).catch((error) => {
            let message = error.request.responseText.split('"');
            toast.error(message[3]);
            return null
        })
    }

    async createUsers(clients, renj) {
        UserHttpServise.createUsers(clients, renj).then((respons) => {
            toast.success(respons.data)
        }).catch((error) => {
            let message = error.request.responseText.split('"');
            toast.error(message[3]);
        })
    }

    async findUsers(seachMessege) {
        return UserHttpServise.findUsers(seachMessege).then((respons) => {
            let k = this.makeRowsUsers(respons.data);
            if (k.length === 0)
                toast.warning("No result find users");
            return (k)
        }).catch((error) => {
            let message = error.request.responseText.split('"');
            toast.error(message[3]);
            return this.makeRowsUsers(null)
        })
    }

    async bars(url) {
        return this.getBarComponents(url).then((obj) => {
            return ({ linkMonitors: obj,  isAdmin: true });
        })

    }

    async trends() {
        return ResultHttpServise.getNameResult().then((respons) => {
            return respons.data;
        }).catch((error) => {
            let message = error.request.responseText.split('"');
            toast.error(message[3]);
            return (null)
        })
    }

    async getBarComponents(url) {
        return ResultHttpServise.getLinksResult(url).then((respons) => {
            return respons.data;
        }).catch((error) => {
            let message = error.request.responseText.split('"');
            toast.error(message[3]);
            return (null)
        })
    }

    async setAxiosClients() {
        return UserHttpServise.getClientUser().then((respons) => {
            return this.setClientUser(respons);
        }).catch((error) => {
            let message = error.request.responseText.split('"');
            toast.error(message[3]);
        })
    }

    makeRowsUsers(data) {
        var keys3 = [];
        for (let k in data) {
            keys3.push({
                id: data[k].id,
                Client: data[k].company,
                Roles: data[k].role,
                Status: data[k].status,
                FIO: data[k].fio,
                Login: data[k].login,
                Email: data[k].email,
                RegistrationLink: data[k].link
            });
        }

        return keys3;
    }

    setClientUser(respons) {
        var keys = [];
        for (let k in respons.data) {
            keys.push({
                item: respons.data[k].companyName,
            });
        }
        return keys;
    }

    setStatusUser(respons) {
        var keys = [];
        for (let k in respons.data) {
            keys.push({
                item: respons.data[k].status,
            });
        }
        return keys;
    }

    setRoleUser(respons) {
        var keys = [];
        let key2 = [];
        // for (let k in respons.data) {
        key2 = respons.data.status;
        for (let k1 in key2) {
            keys.push({
                item: key2[k1],
            });
        }
        // }
        return keys;
    }

    setRRoleUser(respons) {
        var keys = [];
        for (let k in respons.data) {
            keys.push({
                item: respons.data[k].role
            });
        }
        return keys;
    }

    async setUserProfile() {
        return UserHttpServise.getUserProfile().then((respons) => {
            return (respons);
        }).catch((error) => {
            let message = error.request.responseText.split('"');
            toast.error(message[3]);
        })
    }
}
export default new UserServise();