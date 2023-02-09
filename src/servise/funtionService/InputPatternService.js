function passwordInput(value) {
    if (!/^[a-zA-Z0-9]{1,25}$/.test(value))
        return ("Пароль должен быть от 1 до 25 символов и может содержать цифры и латинские буквы")
    else
        return ('')
    // if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,25}/.test(value))
    //     return ("Пароль должен быть от 6 до 25 символов с спец символом, со строчными и прописными буквами на латинице")
    // else
    //     return ('')
}

function loginInput(value) {
    if (!/^[A-z0-9][-A-z0-9]{4,20}$/.test(value))
        return ('Логин должен быть от 5 до 20 символов и может содержать цифры и латинские буквы')
    else
        return ('')
}

function emailInput(value) {
    if (!/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(value))
        return ('некорректный формат почты')
    else
        return ('')
}

function procent100(value) {
    if (!/^(0|[1-9]\d*)$/.test(value)) { return ("Вводите только цифры от 0 до 100"); }
    else if (value < 0) { return ("Не может быть меньше 0"); }
    else if (value > 100) { return ("Не может быть больше 100"); }
    else return ('');
}

function modalRedRange(value, maxValue) {
    let err = this.procent100(value);
    if (err === '')
        if (value > maxValue) { return ("Красная граница не может быть больше зелёной"); }
        else if (maxValue - value < 20) { return ("Между зелёной границей и красной должно быть минимум 20%"); }
        else return ('');
    else return err;
}

function modalGreenRange(value, minValue) {
    let err = this.procent100(value);
    if (err === '')
        if (value - minValue < 20) { return ("Между зелёной границей и красной должно быть минимум 20%"); }
        else if (value > 100) { return ("Зелёная граница не может быть больше 100"); }
        else return ('');
    else return err;
}

function modalPlan(value) {
    if (!/^\d{1,30}(?:,\d{3})*(?:\.\d{1,2})?$/.test(value)) { return ("План измеряется только в цифрах 999.99"); }
    else if (value < 0) { return ("План не может быть меньше 0"); }
    else return ('');
}

function valueIndicator(value) {
    if (!/^\d{1,30}(?:,\d{3})*(?:\.\d{1,2})?$/.test(value)) { return ("Значение измеряется только в цифрах 999.99"); }
    else if (value < 0) { return ("Значение не может быть меньше 0"); }
    else return ('');
}

function modalPlanMonth(value) {
    if (!/^(0|[1-9]\d*)$/.test(value)) { return ("Вводите только цифры от 0 до 12"); }
    else if (value < 0) { return ("Не может быть меньше 0"); }
    else if (value > 12) { return ("Не может быть больше 12"); }
    else return ('');
}

function intputChar(value) {
    if (value !== null)
        if (value !== "")
            if (value.lenght <= 150)
                return ("Проверьте введённую строку, не более 150 символов")
            else
                return ('');

    return ("Проверьте введённую строку, не более 150 символов")
}

function intputInt(value) {
    if (!/^(0|[1-9]\d*)$/.test(value))
        return ('');
    else
        return ("Это не число")
}

function intputDec(value) {
    if (!/^\d{1,30}(?:,\d{3})*(?:\.\d{1,2})?$/.test(value)) { return ("Значение измеряется только в цифрах 999.99"); }
    else return ('');
}

const InputPatternService = {
    passwordInput,
    loginInput,
    emailInput,
    procent100,
    modalRedRange,
    modalGreenRange,
    modalPlan,
    valueIndicator,
    modalPlanMonth,
    intputChar,
    intputInt,
    intputDec
};

export default InputPatternService;