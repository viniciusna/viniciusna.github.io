function getCoinsToSelect(){
    $.ajax({
        url: 'https://economia.awesomeapi.com.br/json/all'
    })
    .done( (data) => 
        Object.entries(data).forEach( element => {
            $("#coins").append( `<option value="${element[0]}">${element[0]}</option>`)
        })
    )
    .done(() => getCoinFromSelect())
}

$(document).ready( () => getCoinsToSelect() )

function clearTables() {
    $("table").html(`<tr>
        <th>Moeda</th>
        <th>Cotação</th>
        <th>Data</th>
        <th>Hora</th>
        <th>Mínimo</th>
        <th>Máximo</th>
    </tr>`)
}

function fillTable(data) {
    $("table").append(`
    <tr>
        <td> ${data[0].name.slice(0, data[0].name.indexOf('/'))} </td>
        <td> R$ ${data[0].bid.replace(".",",")} </td>
        <td> ${data[0].create_date.slice(0, 10)} </td>
        <td> ${data[0].create_date.slice(11)} </td>
        <td> R$ ${data[0].low.replace(".",",")} </td>
        <td> R$ ${data[0].high.replace(".",",")} </td>
    </tr>
    `)

    $("tr").odd().css("background","#d5d5d5")
}

function getCoinFromSelect() {
    const selectedCoin = $("#coins").val()

    $.ajax({
        url: `https://economia.awesomeapi.com.br/${selectedCoin}-BRL`
    })
    .done( (data) => {
    clearTables()
    fillTable(data)
    })
}

//Captura evento no select
$("#coins").change( () => getCoinFromSelect() )

function getCotations() {
    const initialDate = $("#initial-date").val()
    const finalDate = $("#final-date").val()
    const selectedCoin = $("#coins").val()

    const initialDateFormatted = new Date(initialDate) //Transforma as datas em formato de data do JS
    const finalDateFormatted = new Date(finalDate)

    if ( initialDateFormatted.getTime() > finalDateFormatted.getTime() ) {
        clearTables()
        return $("#response").text("A data inicial do período não pode ser uma data após a data final")
    } else if ( initialDate === '' || finalDate === '' ) {
        clearTables()
        return $("#response").text("Preencha todos os campos de data para fazer a consulta")
    }

    let dateCotation = initialDateFormatted //Essa é a data que será incrementada para se buscar a cotação na API, ela inicia sendo igual a um dia antes da data inicial pedida pelo usuário

    clearTables()
    $("#response").text("Carregando...") //Vai aparecer "carregando..." enquanto as requisições são feitas

    async function update() {
        //Verfica se a variável "dateCotation" já chegou na data final pedida pelo usuário
        let arrivedOnTheFinalDay = dateCotation.getTime() <= finalDateFormatted.getTime() ? false : true;
        
        if ( !arrivedOnTheFinalDay ) {
            dateCotation.setDate(dateCotation.getDate() + 1);//incrementa "dateCotation" em um dia
            let month = dateCotation.getMonth() + 1 //Pega o número referente ao mês de "dateCotation"
            let day = dateCotation.getDate() //Pega o dia de "dateCotation"

            month < 10 ? month = "0" + month : false; //Se o dia ou o mês tiver apenas um dígito, deve-se acrescer um "0" na frente para atender ao padrão da API (exemplo, após esse trecho o dígito "1" vira "01")
            day < 10 ? day = "0" + day : false;

            const dateForConsult = `${dateCotation.getFullYear()}${month}${day}` //Coloca a data no formato correto para a URL

            //Faz-se a requisição aqui
            function callAjax() {
                const response = $.ajax({url:`https://economia.awesomeapi.com.br/${selectedCoin}-BRL?start_date=${initialDate.replaceAll("-","")}&end_date=${dateForConsult}`
                })
                return response
            }

            //E então o programa espera a reposta da API para dar continuidade
            await callAjax().then(data => {

                //Verifica se existe dados, se houver ele dá continuidade
                if ( data.length > 0 ) {
                    let dateFromData = new Date(data[0].create_date.slice(0, 10))
                    dateFromData = new Date(dateFromData.getTime() + 86400000)
                    dateFromData = dateFromData.getDate()   //"dateFromData" é o dia que vem no dado da API

                    //Verifica se a data do dado atual é igual a do dado anterior, se for diferente, quer dizer que a data atual não é um dia útil para a bolsa de valores brasileira e protanto não tem cotação
                    if ( dateFromData === dateCotation.getDate() ) {
                        console.log(data)
                        fillTable(data)
                    }

                    update() //Chama a função novamente até que se chegue na data final
                }

                //Se não houver dados retornados, esse "else" notifica que os dados não existem ao usuário
                else {
                    return $("#response").text("Dados não existem")
                }
            })
            .catch( err => {
                console.error(err)
                $("#response").text("Dados não existem")
            })
        }

        //Terminada as requisições, será rodado esse "else" que vai limpar o campo onde aparecia "Carregando..."
        else {
            return $("#response").text("")
        }
    }

    update()//Chama a função acima
}