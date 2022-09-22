const data = [];
let val = 0;

function getData() {

    for (let year = 2021; year <= 2022; year++) {
        for (let month = 1; month <= 12; month++) {
            let sum = 0;
            for (let day = 1; day <= 29; day++) {
                val = getRandomArbitrary(2, 55);
                sum += val;
                if (day < 29) {
                    data.push({
                        ClientInt: 1,
                        LastSession_ID: 1,
                        IndResult: val,
                        ResultDate: day + ':' + month + ':' + year,
                        ResultComment: 1
                    })
                }
                else {
                    data.push({
                        ClientInt: 1,
                        LastSession_ID: 1,
                        IndResult: sum,
                        ResultDate: day + ':' + month + ':' + year,
                        ResultComment: 2
                    })
                }
            }
        }
    }
    return data;
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

export default getData();


