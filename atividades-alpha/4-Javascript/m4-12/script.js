function getById(id) {
    return document.getElementById(id)
}

function getByName(yourClass) {
    return document.getElementsByClassName(yourClass)
}

function writeInTag(id, content) {
    getById(id).innerHTML = content
}

let erased = 0
let linesWritedNow
let linesWrited = 0

function writeInBlackboard() {
    let qtd = getById("qtd").value
    let i = 0

    if ( qtd <= 11 ) {
        while (i <= (qtd-1) ) {
            getByName("phrases-first-column")[i].innerHTML = "EU NÃO DIRIGIREI O CARRO DO DIRETOR"
            i++
        }
    }

    else if ( qtd <= 22 ) {
        while (i < 11 ) {
            getByName("phrases-first-column")[i].innerHTML = "EU NÃO DIRIGIREI O CARRO DO DIRETOR"
            i++
        }

        while (i <= (qtd-1) ) {
            getByName("phrases-second-column")[i-11].innerHTML = "EU NÃO DIRIGIREI O CARRO DO DIRETOR"
            i++
        }
    }

    linesWritedNow = qtd
    writeInTag("number-of-writed-now", linesWritedNow)
    writeInTag("number-of-writed", linesWrited)
    linesWrited = linesWritedNow
}

function erase() {
    let j = 0

    while ( j < 22 ) {
        document.querySelectorAll("p")[j].innerHTML = ''
        j++
    }

    erased++
    writeInTag("number-of-erased", erased)
}
