/* declaração de variáveis */
const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        timerId: null,  
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
    actions: {
        countDownTimerId: setInterval(countDown, 1000),
    }
};

/* cálculo do tempo restante */
function countDown () {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.values.timerId);
        alert("Game over! O seu resultado foi: " + state.values.result);
    }
}

/* função para tocar audio genérico.*/
/* obs: colocar nome do audio na chamada da função. */
function playSound (audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.1;
    audio.play();
}

/* sorteio do quadrado que inimigo irá aparecer */
function randomSquare(){
    //remove qualquer inimigo que existir
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    })
    // sorteia uma posição para o inimigo aparecer
    // .floor pega o número inteiro apenas
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy () {
    // sorteia uma nova posição a cada X millisegundos
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

/* função que "escuta" o clique do jogador e verifica se o inimigo estava no 
respectivo quadro no momento do clique */
function addListenerHitBox () {
    state.view.squares.forEach((square) => {
       square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
       });
    });
}


/* função para inicializar */
function init() {
    moveEnemy();
    addListenerHitBox();
}


/* execução */
init();
