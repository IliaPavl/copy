 function setHeader() {
    var keys2 = [];
    keys2.push({ title: "Дата_расчета" });
    keys2.push({ title: "Результат_показателя" });
    return keys2;
}

 function setRows(data) {
    var rows = [];
    data.forEach(element => {
        rows.push({ Дата_расчета: element.parseDate, Результат_показателя: element.dateSumma })
    });
    return rows;
}

const ResultServise = {
    setHeader,
    setRows
};

export default ResultServise;