
class ResultServise {
    setHeader(){
        var keys2 = [];
        keys2.push({ title: "ClientInd_ID" });
        keys2.push({ title: "LastSession_ID" });
        keys2.push({ title: "IndResult" });
        keys2.push({ title: "ResultDate" });
        keys2.push({ title: "ResultComment" });
        return keys2;
    }
    
    setRows(data){
        var keys3 = [];
        for (let k in data) {
            keys3.push({
                ClientInd_ID: data[k].clientId,
                LastSession_ID: data[k].lastSessionId,
                IndResult: data[k].indResult,
                ResultDate: data[k].resultDate,
                ResultComment: data[k].resultComment
            });
        }

        return keys3;
    }
};

export default new ResultServise();