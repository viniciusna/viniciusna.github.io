Projeto feito no bootcamp MRV da Dio, após ter terminado a versão "original" do projeto com as orientações
das aulas, fiz algumas mudanças que achei convenientes e listei elas abaixo. A motivação para as mudanças
são dadas na outra lista

Mudanças que fiz

1. Arrumei a identação do código
2. Troquei "var" por "let" nas declarações das variáveis
3. Coloquei os nomes de todas as variáveis e funções no padrão camelCase e com um nome melhor para lembrar o que ela faz
e comentários mais claros
4. Coloquei a nave inimiga para reaparecer 1s após ser atingido por algum disparo
5. Dei mais espaço entre as informações do placar na tela
6. Mudei algumas regras na pontuação
    - Regatar um prisioneiro dá 100 pontos
    - Prisioneiro atropelado pelo caminhão faz o jogador perder 50 pontos
    - Se deixar uma nave inimiga chegar ao final da tela, o jogador perde 40 pontos e a velocidade dela aumenta em 0.5
    - Pontuação negativa dá game over
7. Adicionei um efeito de "hover" pelo CSS na opção "jogar novamente"
8. Exibi as regras de pontuação do jogo na página inicial
9. Aumentei a velocidade do disparo

Motivos das Mudanças

1. Os trechos de códigos passados estavam com identação ruim
2. Questão de boas práticas
3. Algumas funções e variáveis não estavam no padrão camelCase e/ou não indicavam do que se tratava
4. Esse delay é por causa de um bug que acontece se o jogador destruir duas naves quase que seguidamente, a segunda não exibe
a animação e nem o som de explosão
5. Melhor para a visualização dos dados
6. As mudanças foram feitas para incentivar o jogador a salvar os prisioneiros e tentar destruir as naves inimigas, com as regras
originais, bastava o jogador ficar na parte mais baixa da tela resgatando prisioneiros e destruindo os caminhões e ele não seria
punido por isso
7. Só pra ficar mais intuitivo de que se tratar de um elemento clicável
8. Instruir melhor o jogador
9. Deixa o jogo mais dinâmico