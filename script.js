let rock = document.querySelector(".input__rock");
let paper = document.querySelector(".input__paper");
let scissors = document.querySelector(".input__scissors");

let startGameBtn = document.querySelector(".start-game");
let playerCount = 0;
let aiCount = 0;
let roundCount = 0;
let buttonField = document.querySelector(".button-field");

let playerResultHeader = document.querySelector(".player-result-header");


const ROCK = 0;
const PAPER = 1;
const SCISSORS = 2;

let fieldset = document.querySelector("fieldset");

let roundResultTable = document.querySelector(".round-result");
let roundResultHeaders = document.querySelectorAll(".round-header");
let aiChoiceMessages = document.querySelectorAll(".ai-result-round-1, .ai-result-round-2, .ai-result-round-3");
let playerChoiceMessages = document.querySelectorAll(".player-result-round-1, .player-result-round-2, .player-result-round-3");
// генерируем ответ компьютера
function getRandomWeapon(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return result = Math.floor(Math.random() * (max - min + 1)) + min;
}

// функция остановки игры
function stopGame() {
    rock.disabled = true;
    paper.disabled = true;
    scissors.disabled = true;
    startGameBtn.disabled = true;

    fieldset.insertAdjacentHTML("beforeend", "<p class='score'></p>");
    let scoreMessage = document.querySelector(".score");
    console.log("ИИ: " + aiCount + "; " + "Игрок: " + playerCount);

    if(playerCount > aiCount) {
        scoreMessage.textContent = "Победитель игры: " + playerName;
    }
    if(playerCount < aiCount) {
        scoreMessage.textContent = "Компьютер победил тебя, ха-ха-ха!";
    }
    else if(playerCount == aiCount) {
        scoreMessage.textContent = "Сегодня нет победителей, но нет и побеждённых";
    }


    startGameBtn.insertAdjacentHTML("afterend", "<button class='button reset-game' type='submit'>Начать новую игру</button>");
    let resetGameBtn = document.querySelector(".reset-game");
    resetGameBtn.addEventListener("click", resetGame);

    function resetGame() {
        playerCount = 0;
        aiCount = 0;
        roundCount = 0;
        rock.disabled = false;
        paper.disabled = false;
        scissors.disabled = false;
        startGameBtn.disabled = false;
        resetGameBtn.disabled = true;
        scoreMessage.remove();

        
        roundResultTable.classList.add("hidden");
        for(let i = 0; i < 3; i++) {
            aiChoiceMessages[i].textContent = "";
            playerChoiceMessages[i].textContent = "";
            roundResultHeaders[i].textContent = i+1 + " раунд:";
        }
    }
}

function playerWin() {
    playerCount++;
    let i = roundCount - 1;
    roundResultHeaders[i].textContent = playerName + " - победитель " + roundCount + " раунда!";
    // console.log("Игрок выиграл " + roundCount + " раунд!");
      
    if (roundCount >= 3) {
        stopGame();
    }
}

function playerLose() {
    aiCount++;
    // console.log("Игрок проиграл " + roundCount + " раунд");
    let i = roundCount - 1;
    roundResultHeaders[i].textContent = "Компьютер - победитель " + roundCount + " раунда!";
    
    if (roundCount >= 3) {
        stopGame();
    }
}

function draw() {
    // console.log("Ничья");
    let i = roundCount - 1;
    roundResultHeaders[i].textContent = roundCount + " раунд: ничья";
    if (roundCount >= 3) {
        stopGame();
    }
}

let playerNameInput = document.querySelector(".player-name-input");
let playerName = "человек";
function setPlayerName() {
    let name;
    if (playerNameInput.value !== "") {
        name = playerNameInput.value
    } else {name = playerName}
    return name;
}

function checkRound() {
    roundCount++;
    playerName = setPlayerName();
    playerResultHeader.textContent = playerName;
    roundResultTable.classList.remove("hidden");
    let aiChoice = getRandomWeapon(0, 2);
    let i = roundCount - 1;
    aiChoiceMessages[i].textContent = (aiChoice == ROCK) ? "Камень" :
        (aiChoice == PAPER) ? "Бумага" : 
        (aiChoice == SCISSORS) ? "Ножницы" :
        "Фигня какая-то";

    console.log("Искуственный интеллект выбрал: " + aiChoice); // проверка, после тестов удалить
    let playerChoice = document.querySelector("input:checked").value;
    console.log("Пользователь выбрал: " + playerChoice);

    playerChoiceMessages[i].textContent = (playerChoice == ROCK) ? "Камень" :
    (playerChoice == PAPER) ? "Бумага" : 
    (playerChoice == SCISSORS) ? "Ножницы" :
    "Фигня какая-то";

    if (aiChoice == ROCK) {
        if (playerChoice == PAPER) {
            // запустить анимацию "бумага заворачивает камень"
            playerWin();
        }
        if (playerChoice == SCISSORS) {
            // запустить анимацию "камень тупит ножницы"
            playerLose();
        }
        else if (playerChoice == ROCK) {
            draw();
            // console.log("два камня стукнулись");
        }
    }

    if (aiChoice == PAPER) {
        if (playerChoice == ROCK) {
            // запустить анимацию "бумага заворачивает камень"
            playerLose();
        }
        if (playerChoice == SCISSORS) {
            // запустить анимацию "ножницы режут бумагу"
            playerWin();
        }
        else if (playerChoice == PAPER) {
            draw();
            // console.log("два листа бумаги поколыхались");
        }
    }

    if (aiChoice == SCISSORS) {
        if (playerChoice == ROCK) {
            // запустить анимацию "камень тупит ножницы"
            playerWin();
        }
        if (playerChoice == PAPER) {
            // запустить анимацию "ножницы режут бумагу"
            playerLose();
        }
        else if (playerChoice == SCISSORS) {
            draw();
            // console.log("две пары ножниц звякнули"); 
        }
    }
}

startGameBtn.addEventListener("click", checkRound);
