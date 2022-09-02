
class ClientServise {

    setStatusClient(respons) {
        var keys2 = respons.data.status;
        var keys = [];

        for (let i = 0; i < keys2.length; i++) {
            keys.push({ item: keys2[i] });
        }
        return keys;
    }
    setHeadClients() {
        var keys2 = [];
        keys2.push({ title: "id" });
        keys2.push({ title: "Client_Name" });
        keys2.push({ title: "Date_add" });
        keys2.push({ title: "Full_Name" });
        keys2.push({ title: "Phonenumber" });
        keys2.push({ title: "Status" });
        return keys2;
    }

    setRowsClients(data) {
        var keys3 = [];
        for(let k in data){
            keys3.push({ 
                id: data[k].id,
                Client_Name: data[k].companyName,
                Date_add: data[k].data,
                Full_Name: data[k].nameClient,
                Phonenumber: data[k].phoneNumber,
                Status: data[k].status
            });
        }
        
        return keys3;
    }
};

export default new ClientServise();