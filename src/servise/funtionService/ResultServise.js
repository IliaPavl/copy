
class ResultServise {
    setHeader(){
        var keys2 = [];
        keys2.push({ title: "IndResult" });
        keys2.push({ title: "ResultDate" });
        return keys2;
    }
    
    setRows(data){
        var rows = [];
        data.tableData.forEach(element => {
            rows.push({IndResult: element.dateCreate, ResultDate: element.dateSumma})
        });
        return rows;
    }
};

export default new ResultServise();