let rock = document.querySelector(".input__rock");
let paper = document.querySelector(".input__paper");
let scissors = document.querySelector(".input__scissors");

let startGameBtn = document.querySelector(".start-game");
let userName = "человек";
let userCount = 0;
let iiCount = 0;
let roundCount = 0;
let buttonField = document.querySelector(".button-field");

let fieldset = document.querySelector("fieldset");

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
    console.log("ИИ: " + iiCount + "; " + "Игрок: " + userCount);

    if(userCount > iiCount) {
        scoreMessage.textContent = "Победитель игры: " + userName;
    }
    if(userCount < iiCount) {
        scoreMessage.textContent = "Компьютер победил тебя, ха-ха-ха!";
    }
    else if(userCount == iiCount) {
        scoreMessage.textContent = "Сегодня нет победителей, но нет и побеждённых";
    }


    startGameBtn.insertAdjacentHTML("afterend", "<button class='button reset-game' type='submit'>Начать новую игру</button>");
    let resetGameBtn = document.querySelector(".reset-game");
    resetGameBtn.addEventListener("click", resetGame);

    function resetGame() {
        userCount = 0;
        iiCount = 0;
        roundCount = 0;
        rock.disabled = false;
        paper.disabled = false;
        scissors.disabled = false;
        startGameBtn.disabled = false;
        resetGameBtn.disabled = true;
        scoreMessage.remove();
    }
}

function userWin() {
    userCount++;
    console.log("Игрок выиграл " + roundCount + " раунд!");
    // добавить элемент p "Игрок выиграл раунд!"
    
    if (roundCount >= 3) {
        stopGame();
    }
}

function userLose() {
    iiCount++;
    console.log("Игрок проиграл " + roundCount + " раунд");
    // добавить элемент p "Игрок проиграл раунд"
    
    if (roundCount >= 3) {
        stopGame();
    }
}

function draw() {
    console.log("Ничья");
    // добавить элемент p "Ничья"
    if (roundCount >= 3) {
        stopGame();
    }
}

function checkRound() {
    roundCount++;
    let iiChoice = getRandomWeapon(0, 2);
    console.log("Искуственный интеллект выбрал: " + iiChoice); // проверка, после тестов удалить
    let userChoice = document.querySelector("input:checked").value;
    console.log("Пользователь выбрал: " + userChoice);

    if (iiChoice == 0) {
        if (userChoice == 1) {
            // запустить анимацию "бумага заворачивает камень"
            userWin();
        }
        if (userChoice == 2) {
            // запустить анимацию "камень тупит ножницы"
            userLose();
        }
        else if (userChoice == 0) {
            draw();
            // console.log("два камня стукнулись");
        }
    }

    if (iiChoice == 1) {
        if (userChoice == 0) {
            // запустить анимацию "бумага заворачивает камень"
            userLose();
        }
        if (userChoice == 2) {
            // запустить анимацию "ножницы режут бумагу"
            userWin();
        }
        else if (userChoice == 1) {
            draw();
            // console.log("два листа бумаги поколыхались");
        }
    }

    if (iiChoice == 2) {
        if (userChoice == 0) {
            // запустить анимацию "камень тупит ножницы"
            userWin();
        }
        if (userChoice == 1) {
            // запустить анимацию "ножницы режут бумагу"
            userLose();
        }
        else if (userChoice == 2) {
            draw();
            // console.log("две пары ножниц звякнули"); 
        }
    }
}

startGameBtn.addEventListener("click", checkRound);