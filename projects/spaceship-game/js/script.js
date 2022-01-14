function start() {
    $("#inicio").hide();

    $("#fundoGame").append("<div id='jogador' class='anima1'></div>");
    $("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
    $("#fundoGame").append("<div id='inimigo2'></div>");
    $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
    $("#fundoGame").append("<div id='placar'></div>");
    $("#fundoGame").append("<div id='energia'></div>");

    //Principais variáveis do jogo
    let jogo = {}
    const TECLA = {
            W: 87,
            S: 83,
            D: 68
        }
    let velocidade = 5;
    let posicaoY = parseInt(Math.random() * 334);
    let podeAtirar = true;
    let fimDeJogo = false;
    let pontos = 0;
    let salvos = 0;
    let perdidos = 0;
    let energiaAtual = 3;
    let somDisparo = document.getElementById("somDisparo");
    let somExplosao = document.getElementById("somExplosao");
    let musica = document.getElementById("musica");
    let somGameover = document.getElementById("somGameover");
    let somPerdido = document.getElementById("somPerdido");
    let somResgate = document.getElementById("somResgate");

    //Música em loop
    musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
    musica.play();

    jogo.pressionou = [];

    //Verifica se o usuário pressionou alguma tecla
    $(document).keydown(function(e){
        jogo.pressionou[e.which] = true;
        });

    $(document).keyup(function(e){
       jogo.pressionou[e.which] = false;
    });

    jogo.timer = setInterval(loop,30);

    //Função responsável por executar as outras funções do jogo a cada 30ms (no setInterval acima)
    function loop() {
        moveFundo();
        moveJogador();
        moveNaveInimiga();
        moveCaminhao();
        movePrisioneiro();
        colisao();
        placar();
        barraDeEnergia();
    }

    function moveFundo() {
        esquerda = parseInt($("#fundoGame").css("background-position"));
        $("#fundoGame").css("background-position",esquerda-1);
    }

    function moveJogador() {

        if (jogo.pressionou[TECLA.W]) {
            let topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top",topo-10);

            if (topo <= 0) {
                $("#jogador").css("top",topo+10);
            }
        }

        if (jogo.pressionou[TECLA.S]) {
            let topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top",topo+10);

            if (topo >= 434) {
                $("#jogador").css("top",topo-10);
            }
        }

        if (jogo.pressionou[TECLA.D]) {
            disparo();
        }
    }

    function moveNaveInimiga() {
        posicaoX = parseInt($("#inimigo1").css("left"));
        $("#inimigo1").css("left",posicaoX-velocidade);
        $("#inimigo1").css("top",posicaoY);

        if (posicaoX <= 0) {
            velocidade = velocidade + 0.5;
            pontos -= 40;
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left",694);
            $("#inimigo1").css("top",posicaoY);
        }
    } //Fim da função moveNaveInimiga()

    function moveCaminhao() {
        posicaoX = parseInt($("#inimigo2").css("left"));
        $("#inimigo2").css("left",posicaoX-3);

        if (posicaoX <= 0) {
            $("#inimigo2").css("left",775);
        }
    } // Fim da função moveCaminhao()

    function movePrisioneiro() {
        posicaoX = parseInt($("#amigo").css("left"));
        $("#amigo").css("left",posicaoX+1);

        if (posicaoX>906) {
            $("#amigo").css("left",0);
        }
    } // fim da função movePrisioneiro()

    function disparo() {
        if (podeAtirar == true) {
            somDisparo.play();
            podeAtirar = false;

            topo = parseInt($("#jogador").css("top"))
            posicaoX = parseInt($("#jogador").css("left"))
            tiroX = posicaoX + 190;
            topoTiro = topo+37;
            $("#fundoGame").append("<div id='disparo'></div");
            $("#disparo").css("top",topoTiro);
            $("#disparo").css("left",tiroX);

            var tempoDisparo = window.setInterval(executaDisparo, 30);
        } //Fecha podeAtirar

        function executaDisparo() {
            posicaoX = parseInt($("#disparo").css("left"));
            $("#disparo").css("left",posicaoX+25); 

            if (posicaoX>900) {
                window.clearInterval(tempoDisparo);
                tempoDisparo = null;
                $("#disparo").remove();
                podeAtirar = true;
            }
        } // Fecha executaDisparo()
    } // Fecha disparo()

    function colisao() {
        let colisao1 = ($("#jogador").collision($("#inimigo1"))); //colisão entre jogador e nave inimiga
        let colisao2 = ($("#jogador").collision($("#inimigo2"))); //colisão entre jogador e caminhão
        let colisao3 = ($("#disparo").collision($("#inimigo1"))); //colisão entre disparo e nave inimiga
        let colisao4 = ($("#disparo").collision($("#inimigo2"))); //colisão entre disparo e caminhão
        let colisao5 = ($("#jogador").collision($("#amigo"))); //colisão entre jogador e prisioneiro, no caso é o que representa o resgate
        let colisao6 = ($("#inimigo2").collision($("#amigo"))); //colisão entre prisioneiro e caminhão

        // jogador e nave inimiga
        if (colisao1.length>0) {
            energiaAtual--;
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
            explosaoNaveInimiga(inimigo1X,inimigo1Y);

            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left",694);
            $("#inimigo1").css("top",posicaoY);
        }

        // jogador e caminhão
        if (colisao2.length>0) {
            energiaAtual--;
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            explosaoCaminhao(inimigo2X,inimigo2Y);
            $("#inimigo2").remove();
            reposicionaCaminhao();
        }

        // disparo e nave inimiga
        if (colisao3.length>0) {
            velocidade = velocidade+0.3;
            pontos = pontos+100;
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
            explosaoNaveInimiga(inimigo1X,inimigo1Y);
            $("#disparo").css("left",950);
            $("#inimigo1").remove();

            let tempoReposicaoNave = window.setInterval(reposicionaNave, 1000);

            function reposicionaNave() {
                $("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
                posicaoY = parseInt(Math.random() * 334);
                $("#inimigo1").css("left",694);
                $("#inimigo1").css("top",posicaoY);
                window.clearInterval(tempoReposicaoNave);
                tempoReposicaoNave = null;
            }
        }

        // disparo e caminhão
        if (colisao4.length>0) {
            pontos = pontos+50;
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            $("#inimigo2").remove();

            explosaoCaminhao(inimigo2X,inimigo2Y);
            $("#disparo").css("left",950);
            reposicionaCaminhao();
        }

        // jogador e prisioneiro
        if (colisao5.length>0) {
            pontos += 100;
            salvos++;
            somResgate.play();
            reposicionaPrisioneiro();
            $("#amigo").remove();
        }

        //prisioneiro e caminhão
        if (colisao6.length>0) {
            pontos -= 50;
            perdidos++;
            amigoX = parseInt($("#amigo").css("left"));
            amigoY = parseInt($("#amigo").css("top"));
            colisaoPrisioneiroComCaminhao(amigoX,amigoY);
            $("#amigo").remove();

            reposicionaPrisioneiro();
        }
    } //Fim da função colisao()

    //Animação de explosão de nave inimiga
    function explosaoNaveInimiga(inimigo1X,inimigo1Y) {
        somExplosao.play();
        $("#fundoGame").append("<div id='explosao1'></div>");
        $("#explosao1").css("background-image", "url(imgs/explosao.png)");
        let div = $("#explosao1");
        div.css("top", inimigo1Y);
        div.css("left", inimigo1X);
        div.animate({width:200, opacity:0}, "slow");

        let tempoExplosao = window.setInterval(removeExplosao, 1000);

        function removeExplosao() {
            div.remove();
            window.clearInterval(tempoExplosao);
            tempoExplosao = null;
        }
    } // Fim da função explosaoNaveInimiga()

    //Animação de explosão do caminhao
    function explosaoCaminhao(inimigo2X,inimigo2Y) {
        somExplosao.play();
        $("#fundoGame").append("<div id='explosao2'></div>");
        $("#explosao2").css("background-image", "url(imgs/explosao.png)");
        let div2 = $("#explosao2");
        div2.css("top", inimigo2Y);
        div2.css("left", inimigo2X);
        div2.animate({width:200, opacity:0}, "slow");

        let tempoExplosaoCaminhao = window.setInterval(removeExplosaoCaminhao, 1000);

        function removeExplosaoCaminhao() {
            div2.remove();
            window.clearInterval(tempoExplosaoCaminhao);
            tempoExplosaoCaminhao = null;
        }
    } // Fim da função explosaoCaminhao()

    //Animação da colisão entre prisioneiro e caminhao
    function colisaoPrisioneiroComCaminhao(amigoX,amigoY) {
        somPerdido.play();
        $("#fundoGame").append("<div id='explosao3' class='anima4'></div");
        $("#explosao3").css("top",amigoY);
        $("#explosao3").css("left",amigoX);

        let tempoColisaoPrisioneiroComCaminhao = window.setInterval(resetaColisaoPrisioneiroComCaminhao, 1000);

        function resetaColisaoPrisioneiroComCaminhao() {
            $("#explosao3").remove();
            window.clearInterval(tempoColisaoPrisioneiroComCaminhao);
            tempoColisaoPrisioneiroComCaminhao = null;
        }
    } // Fim da função colisaoPrisioneiroComCaminhao

    //Reposiciona o prisioneiro
    function reposicionaPrisioneiro() {
        let tempoAmigo = window.setInterval(reposiciona6, 6000);

        function reposiciona6() {
            window.clearInterval(tempoAmigo);
            tempoAmigo = null;

            if (fimDeJogo == false) {
                $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
            }
        }
    } // Fim da função reposicionaPrisioneiro()

    //Reposiciona o caminhão
    function reposicionaCaminhao() {
        let tempoColisao4 = window.setInterval(reposiciona4, 5000);

        function reposiciona4() {
            window.clearInterval(tempoColisao4);
            tempoColisao4 = null;

            if (fimDeJogo == false) {
                $("#fundoGame").append("<div id=inimigo2></div>");
            }
        }
    }

    function placar() {
        $("#placar").html(`<span> Pontos: ${pontos} </span> <span> salvos: ${salvos} </span> <span> perdidos: ${perdidos} </span>`);
    } //fim da função placar()

    function barraDeEnergia() {
        if (energiaAtual == 3) {
            $("#energia").css("background-image", "url(imgs/energia3.png)");
        }

        if (energiaAtual == 2) {
            $("#energia").css("background-image", "url(imgs/energia2.png)");
        }

        if (energiaAtual == 1) {
            $("#energia").css("background-image", "url(imgs/energia1.png)");
        }

        if (energiaAtual == 0 || pontos < 0) {
            $("#energia").css("background-image", "url(imgs/energia0.png)");
            gameOver();
        }
    } // Fim da função barraDeEnergia()

    //Função GAME OVER
    function gameOver() {
        fimDeJogo = true;
        musica.pause();
        somGameover.play();

        window.clearInterval(jogo.timer);
        jogo.timer = null;

        $("#jogador").remove();
        $("#inimigo1").remove();
        $("#inimigo2").remove();
        $("#amigo").remove();
        $("#fundoGame").append("<div id='fim'></div>");
        $("#fim").html("<h1> Game Over </h1><p>Sua pontuação foi: " + pontos + "</p>" + "<div id='reinicia' onClick=reiniciaJogo()><h3>Jogar Novamente</h3></div>");
    } // Fim da função gameOver();
}

function reiniciaJogo() {
    somGameover.pause();
    $("#fim").remove();
    start();
} //Fim da função reiniciaJogo
