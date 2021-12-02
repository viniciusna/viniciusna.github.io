function getById(id) {
    return document.getElementById(id)
}

function writeInTag(id, content) {
    getById(id).innerHTML = content
}

let board = [ ['','',''],
              ['','',''],
              ['','',''] ]

let turn = 0
let clicked00 = false
let clicked01 = false
let clicked02 = false
let clicked10 = false
let clicked11 = false
let clicked12 = false
let clicked20 = false
let clicked21 = false
let clicked22 = false

function reset() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            board[i][j] = ''
        }
    }

    for (let k = 0; k < 9; k++) {
        document.getElementsByClassName("position")[k].innerHTML = ''
    }

    turn = 0
    clicked00 = false
    clicked01 = false
    clicked02 = false
    clicked10 = false
    clicked11 = false
    clicked12 = false
    clicked20 = false
    clicked21 = false
    clicked22 = false
    writeInTag("result", '')
    writeInTag("turn", "O")
}

function gameVerification() {

    for (let i = 0; i < 3; i++) {
        if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            writeInTag("result", `O jogador de ${board[i][0]} venceu!`)
        }

        else if (board[0][i] !== '' && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
            writeInTag("result", `O jogador de ${board[0][i]} venceu!`)
        }
    }

    if ( board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        writeInTag("result", `O jogador de ${board[0][0]} venceu!`)
    }

    if ( board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        writeInTag("result", `O jogador de ${board[0][2]} venceu!`)
    }
}

function mark(pos, i, j) {
    if ( turn % 2 == 0 ) {
        writeInTag(pos, "O")
        board[i][j] = "O"

        writeInTag("turn", "X")
        turn++
    }

    else {
        writeInTag(pos, "X")
        board[i][j] = "X"

        writeInTag("turn", "O")
        turn++
    }

    gameVerification()
}

function mark00() {

    if (!clicked00) {
        mark("p00", 0, 0)

        clicked00 = true
    }
}

function mark01() {

    if (!clicked01) {
        mark("p01", 0, 1)

        clicked01 = true
    }
}

function mark02() {

    if (!clicked02) {
        mark("p02", 0, 2)

        clicked02 = true
    }
}

function mark10() {

    if (!clicked10) {
        mark("p10", 1, 0)

        clicked10 = true
    }
}

function mark11() {

    if (!clicked11) {
        mark("p11", 1, 1)

        clicked11 = true
    }
}

function mark12() {

    if (!clicked12) {
        mark("p12", 1, 2)

        clicked12 = true
    }
}

function mark20() {

    if (!clicked20) {
        mark("p20", 2, 0)

        clicked20 = true
    }
}

function mark21() {

    if (!clicked21) {
        mark("p21", 2, 1)

        clicked21 = true
    }
}

function mark22() {

    if (!clicked22) {
        mark("p22", 2, 2)

        clicked22 = true
    }
}