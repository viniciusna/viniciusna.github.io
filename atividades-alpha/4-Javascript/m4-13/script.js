function getById(id) {
    return document.getElementById(id)
}

function getByName(name) {
    return document.getElementsByName(name)
}

function getValueInput(id) {
    return getById(id).value
}

function writeInTag(id, content) {
    getById(id).innerHTML = content
}

let pedroCar = {
    vmin : 150 ,
    vmax : 230 ,
    drift : 3 ,
}

let jucaCar = {
    vmin : 120 ,
    vmax : 260 ,
    drift : 5 ,
}

let ednaCar = {
    vmin : 180 ,
    vmax : 220 ,
    drift : 1 ,
}

function whoIsGreater(a,b,c) {
    let aORb = ( (a+b) + Math.abs(b-a) )/2

    return ( (aORb+c) + Math.abs(c-aORb) )/2
}

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function createCarPedro() {
    pedroCar.vmin = getRandom(100, 150)
    pedroCar.vmax = getRandom(200, 280)
    pedroCar.drift = getRandom(1, 8)

    writeInTag("vmin-pedro", pedroCar.vmin)
    writeInTag("vmax-pedro", pedroCar.vmax)
    writeInTag("drift-pedro", pedroCar.drift)
}

function createCarJuca() {
    jucaCar.vmin = getRandom(100, 150)
    jucaCar.vmax = getRandom(200, 280)
    jucaCar.drift = getRandom(1, 8)

    writeInTag("vmin-juca", jucaCar.vmin)
    writeInTag("vmax-juca", jucaCar.vmax)
    writeInTag("drift-juca", jucaCar.drift)
}

function createCarEdna() {
    ednaCar.vmin = getRandom(100, 150)
    ednaCar.vmax = getRandom(200, 280)
    ednaCar.drift = getRandom(1, 8)

    writeInTag("vmin-edna", ednaCar.vmin)
    writeInTag("vmax-edna", ednaCar.vmax)
    writeInTag("drift-edna", ednaCar.drift)
}

function lapsOptions() {
    for (let i = 0; i < 3; i++) {
        if ( getByName("modality")[i].checked ) {
            writeInTag("laps-number", `${getByName("modality")[i].value}`)
        }
    }
}

function getInput() {
    writeInTag("laps-number",`${getValueInput("lapInput")}`)
}

function race() {

    writeInTag("laps", '')
    writeInTag("tiebreaker", '')

    let lapsNumber = parseInt( getById("laps-number").innerHTML )
    let pedroLapsWon = 0
    let jucaLapsWon = 0
    let ednaLapsWon = 0
    let raceWinner

    for (let i=0; i < lapsNumber; i++) {
        let pedrolap = ( getRandom(pedroCar.vmin, pedroCar.vmax)*(1-pedroCar.drift/100) ).toFixed(2)
        let jucalap = ( getRandom(jucaCar.vmin, jucaCar.vmax)*(1-jucaCar.drift/100) ).toFixed(2)
        let ednalap = ( getRandom(ednaCar.vmin, ednaCar.vmax)*(1-ednaCar.drift/100) ).toFixed(2)

        let greaterSpeed = whoIsGreater(parseFloat(pedrolap), parseFloat(jucalap), parseFloat(ednalap)).toFixed(2)
        let lapWinner

        switch (greaterSpeed) {
            case pedrolap : lapWinner = "Pedro" ; break;
            case jucalap : lapWinner = "Juca" ; break;
            case ednalap : lapWinner = "Edna" ; break;
        }

        getById("laps").innerHTML += `<p> lap ${i+1}: ${lapWinner} </p>`

        switch (lapWinner) {
            case "Pedro" : pedroLapsWon++ ; break;
            case "Juca" : jucaLapsWon++ ; break;
            case "Edna" : ednaLapsWon++ ; break;
        }
    }

    writeInTag("pedro-laps-won", pedroLapsWon)
    writeInTag("juca-laps-won", jucaLapsWon)
    writeInTag("edna-laps-won", ednaLapsWon)

    while ( pedroLapsWon == jucaLapsWon || pedroLapsWon == ednaLapsWon || jucaLapsWon == ednaLapsWon ) {
        let pedrolap = ( getRandom(pedroCar.vmin, pedroCar.vmax)*(1-pedroCar.drift/100) ).toFixed(2)
        let jucalap = ( getRandom(jucaCar.vmin, jucaCar.vmax)*(1-jucaCar.drift/100) ).toFixed(2)
        let ednalap = ( getRandom(ednaCar.vmin, ednaCar.vmax)*(1-ednaCar.drift/100) ).toFixed(2)

        let greaterSpeed = whoIsGreater(parseFloat(pedrolap), parseFloat(jucalap), parseFloat(ednalap)).toFixed(2)
        let lapWinner

        switch (greaterSpeed) {
            case pedrolap : lapWinner = "Pedro" ; break;
            case jucalap : lapWinner = "Juca" ; break;
            case ednalap : lapWinner = "Edna" ; break;
        }

        getById("laps").innerHTML += `<p> Extra lap (desempate): ${lapWinner} </p>`

        switch (lapWinner) {
            case "Pedro" : pedroLapsWon++ ; break;
            case "Juca" : jucaLapsWon++ ; break;
            case "Edna" : ednaLapsWon++ ; break;
        }

        writeInTag("tiebreaker", 
        `Resultado final após o desempate
        <p>Pedro: ${pedroLapsWon} </p>
        <p>Juca: ${jucaLapsWon} </p>
        <p>Edna: ${ednaLapsWon} </p>`)
    }

    let moreLapsWon = whoIsGreater(pedroLapsWon, jucaLapsWon, ednaLapsWon)

    switch (moreLapsWon) {
        case pedroLapsWon : raceWinner = "Pedro"; break;
        case jucaLapsWon : raceWinner = "Juca"; break;
        case ednaLapsWon : raceWinner = "Edna"; break;
    }

    writeInTag("result", `O vencedor da corrida é ${raceWinner}`)
}
