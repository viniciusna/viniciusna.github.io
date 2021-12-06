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
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function getRandomDrift(min, max) {
    return ( ( (Math.random()).toFixed(2) * (max - min)) + min).toFixed(2)
}

function raffleCar(idToWriteIn, object, writeRaflleVMIN, writeRaflleVMAX, writeRaflleDrift) {
    let raffle = getRandom(0, 100)

    if ( raffle <= 60 ) {
        writeInTag(idToWriteIn, "Popular")

        object.vmin = getRandom(110, 130)
        object.vmax = getRandom(180, 200)
        object.drift = getRandomDrift(3, 4)

        writeInTag(writeRaflleVMIN, object.vmin)
        writeInTag(writeRaflleVMAX, object.vmax)
        writeInTag(writeRaflleDrift, object.drift)
    }

    else if ( raffle <= 95 ) {
        writeInTag(idToWriteIn, "Sport")

        object.vmin = getRandom(125, 145)
        object.vmax = getRandom(195, 215)
        object.drift = getRandomDrift(2, 3)

        writeInTag(writeRaflleVMIN, object.vmin)
        writeInTag(writeRaflleVMAX, object.vmax)
        writeInTag(writeRaflleDrift, object.drift)
    }

    else {
        writeInTag(idToWriteIn, "Super sport")

        object.vmin = getRandom(140, 160)
        object.vmax = getRandom(210, 230)
        object.drift = getRandomDrift(1,1.75)

        writeInTag(writeRaflleVMIN, object.vmin)
        writeInTag(writeRaflleVMAX, object.vmax)
        writeInTag(writeRaflleDrift, object.drift)
    }
}

function createCarPedro() {
    raffleCar("type-car-pedro", pedroCar, "vmin-pedro", "vmax-pedro", "drift-pedro")
}

function createCarJuca() {
    raffleCar("type-car-juca", jucaCar, "vmin-juca", "vmax-juca", "drift-juca")
}

function createCarEdna() {
    raffleCar("type-car-edna", ednaCar, "vmin-edna", "vmax-edna", "drift-edna")
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
