
class ResultServise {
    setHeader(){
        var keys2 = [];
        keys2.push({ title: "Результат_показателя" });
        keys2.push({ title: "Дата_расчета" });
        return keys2;
    }
    
    setRows(data){
        var rows = [];
        data.tableData.forEach(element => {
            rows.push({Результат_показателя: element.dateSumma, Дата_расчета: element.parseDate})
        });
        return rows;
    }
};

export default new ResultServise();