function getById(id) {
    return document.getElementById(id)
}

function writeInTag(id, content) {
    getById(id).innerHTML = content
}

function getByName(name) {
    return document.getElementsByName(name)
}

let paoValue = 0
let hamburguerValue = 0
let saladaValue = 0
let queijoValue = 0

function getValuePao() {
    for (let i = 0; i < getByName("pao").length; i++) {
        if ( getByName("pao")[i].checked ) {
            if (i == 0) {
                paoValue = 3
            }

            else if (i == 1) {
                paoValue = 8
            }

            else {
                paoValue = 6
            }
        }
    }
}

function getValuehamburguer() {
    for (let i = 0; i < getByName("hamburguer").length; i++) {
        if ( getByName("hamburguer")[i].checked ) {
            if (i == 0) {
                hamburguerValue = 13
            }

            else if (i == 1) {
                hamburguerValue = 10
            }

            else {
                hamburguerValue = 12
            }
        }
    }
}

function getValuesalada() {
    for (let i = 0; i < getByName("salada").length; i++) {
        if ( getByName("salada")[i].checked ) {
            if (i == 0) {
                saladaValue = 1.5
            }

            else if (i == 1) {
                saladaValue = 1.5
            }

            else {
                saladaValue = 0
            }
        }
    }
}

function getValuequeijo() {
    for (let i = 0; i < getByName("queijo").length; i++) {
        if ( getByName("queijo")[i].checked ) {
            if (i == 0) {
                queijoValue = 3
            }

            else if (i == 1) {
                queijoValue = 3
            }

            else {
                queijoValue = 5
            }
        }
    }
}

function showTotal() {
    getValuePao();
    getValuehamburguer();
    getValuesalada()
    getValuequeijo()
    writeInTag("total", `R$ ${(paoValue + hamburguerValue + saladaValue + queijoValue).toFixed(2)}`)
}

function getAwnser(name, idWherePutAwnser) {
    for (let i = 0; i < getByName(name).length; i++) {
        if ( getByName(name)[i].checked ) {
            writeInTag(idWherePutAwnser, getByName(name)[i].value)
        }
    }
}

function confirm() {
    getAwnser("pao", "pao-awnser")
    getAwnser("hamburguer", "hamburguer-awnser")
    getAwnser("salada", "salada-awnser")
    getAwnser("queijo", "queijo-awnser")
}
