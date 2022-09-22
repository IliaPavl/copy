
class ResultServise {
    setHeader(){
        var keys2 = [];
        keys2.push({ title: "IndResult" });
        keys2.push({ title: "ResultDate" });
        return keys2;
    }
    
    setRows(data){
        var keys3 = [];
        for (let k in data) {
            let d= new Date(data[k].resultDate);
            let day = d.getDay();
            let month = d.getMonth()+1;
            let year = d.getFullYear();

            keys3.push({
                IndResult: data[k].indResult,
                ResultDate: day+'-'+month+'-'+year,
                ResultComment: data[k].resultComment
            });
        }

        return keys3;
    }
};

export default new ResultServise();