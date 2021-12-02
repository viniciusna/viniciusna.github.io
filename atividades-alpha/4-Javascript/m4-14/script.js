function getById(id) {
    return document.getElementById(id)
}

function getByClass(classs) {
    return document.getElementsByClassName(classs)
}

function writeInTag(id, content) {
    getById(id).innerHTML = content
}

function getValueInputbyClass(classs, i) {
    return document.getElementsByClassName(classs)[i].value
}

function whoIsGreater(a,b) {
    return ( (a + b) + Math.abs(b - a) )/2
}

let array = []

function createArray() {

    array = []
    for (let i = 0; i < 4; i++) {
        array.push( parseFloat(getValueInputbyClass("inputs", i)) )
    }

    rounder()

    writeInTag("result", array)
}

function rounder() {
    array.forEach(element => {
        array[ array.indexOf(element) ] = Math.round(element)
    });
}

function invertArray() {

    writeInTag("result", '')
    createArray()

    let arrayInverted = []

    array.forEach(element => {
        arrayInverted.unshift(element)
    });

    writeInTag("result", arrayInverted)
}

function orderArray() {

    writeInTag("result", '')
    createArray()

    let arrayOrdered = []
    let arrayCopie = array.slice()

    let max01 = whoIsGreater(array[0], array[1])
    let max012 = whoIsGreater(max01, array[2])
    let max = whoIsGreater(max012, array[3])

    arrayOrdered.unshift(max)

    arrayCopie.splice(arrayCopie.indexOf(max), 1)

    let secondmax01 = whoIsGreater(arrayCopie[0], arrayCopie[1])
    let secondmax = whoIsGreater(secondmax01, arrayCopie[2])

    arrayOrdered.unshift(secondmax)

    arrayCopie.splice(arrayCopie.indexOf(secondmax), 1)

    arrayOrdered.unshift( whoIsGreater(arrayCopie[0], arrayCopie[1]) )

    arrayCopie.splice(arrayCopie.indexOf( whoIsGreater(arrayCopie[0], arrayCopie[1]) ), 1)

    arrayOrdered.unshift( arrayCopie[0] )

    writeInTag("result", arrayOrdered)
}