import api from "./api";

function amoGet(url){
    return api.get(url, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

const AmoHtttp ={
    amoGet
}
export default AmoHtttp;