function getById(id) {
    return document.getElementById(id)
}

function getByName(name) {
    return document.getElementsByName(name)
}

function responsePost(name, idResponse) {
    for (let i = 0; i < getByName(name).length; i++) {
        if ( getByName(name)[i].checked ) {
            getById(idResponse).innerHTML = getByName(name)[i].value
        }
    }
}

function send() {
    responsePost('atendimento', 'resposta-atendimento');
    responsePost('produtos', 'resposta-produtos')
    responsePost("retorno", 'resposta-retornaria')
    responsePost("recomendacao", "resposta-recomendacao")
}