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

    setRowsUsers(data) {
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
        for (let k in respons.data) {
            key2 = respons.data[k].status;
            for (let k1 in key2) {
                keys.push({
                    item: key2[k1],
                });
            }
        }
        return keys;
    }



}
export default new UserServise();