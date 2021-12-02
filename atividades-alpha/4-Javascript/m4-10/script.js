function getById(id) {
    return document.getElementById(id)
}

function getValueInput(id) {
    return getById(id).value
}

function sum() {
        let result = parseFloat(getValueInput("first-input")) + parseFloat(getValueInput("second-input"))
        return getById("output").innerHTML = result
}

function subtract() {
        let result = parseFloat(getValueInput("first-input")) - parseFloat(getValueInput("second-input"))
        return getById("output").innerHTML = result
}

function multiply() {
        let result = parseFloat(getValueInput("first-input")) * parseFloat(getValueInput("second-input"))
        return getById("output").innerHTML = result
}

function division() {
        let result = parseFloat(getValueInput("first-input")) / parseFloat(getValueInput("second-input"))
        return getById("output").innerHTML = result
}

function cl() {
    const input = document.querySelectorAll("input")

    input.forEach(element => {
        element.value = ''
    });

    getById("output").innerHTML = 0
}