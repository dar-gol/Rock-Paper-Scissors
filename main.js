const button = document.querySelector(".introduction button");
const input = document.querySelector("#round");
const buttonGame = document.querySelector(".fight button");
const buttonEnd = document.querySelector(".end");
const your = document.querySelector(".your");
const computer = document.querySelector(".ai");;
const attributes = [...document.querySelectorAll(".weapon img")];
const battle = document.querySelector(".battleground");

const means = ['paper', 'rock', 'scissors'];
let countRound;

// document.querySelector(".introduction").style.display = "none";
// document.querySelector(".game").style.display = "none";
document.querySelector(".battleground").style.display = "none";

const gamer = {
    choice: -1,
    failures: 0,
    win: 0,
    result: 0,
}
const ai = {
    choice: -1,
}

document.querySelector(".game").style.display = "none";

function insertData() {
    document.querySelector(".introduction").style.display = "none";
    document.querySelector(".game").style.display = "flex";
    document.querySelector(".count").textContent = input.value;
    document.querySelector(".win").textContent = 0;
    document.querySelector(".failures").textContent = 0;
}

function resetData() {
    your.textContent = '-';
    if (!countRound) {
        document.querySelector('.win').textContent = '0';
        document.querySelector('.failures').textContent = '0';
        computer.textContent = '-';
        attributes.forEach(attribute => attribute.classList.remove('active'))
        document.querySelector(".game").style.display = "none";
        document.querySelector(".battleground").style.display = "none";
    }
}
function insertResult(){
    if(gamer.result == 1){
        document.querySelector('.win').textContent = ++gamer.win;
        document.querySelector(".right").classList.add('win');
        document.querySelector(".right").classList.remove('fail');
        document.querySelector(".left").classList.remove('win');
        document.querySelector(".left").classList.add('fail');
    }
    else if(gamer.result == 0){
        document.querySelector('.failures').textContent = ++gamer.failures;
        document.querySelector(".left").classList.add('win');
        document.querySelector(".left").classList.remove('fail');
        document.querySelector(".right").classList.remove('win');
        document.querySelector(".right").classList.add('fail');
    }
    else{
        document.querySelector(".right").classList.remove('fail');
        document.querySelector(".left").classList.remove('win');
        document.querySelector(".left").classList.remove('fail');
        document.querySelector(".right").classList.remove('win');
    }
}
function showBattle(isPlay) {
    if (isPlay) {
        insertResult();
        document.querySelector(".right").src = `img/${means[gamer.choice]}.png`;
        document.querySelector(".left").src = `img/${means[ai.choice]}.png`;
        document.querySelector(".game").style.display = "none";
        document.querySelector(".battleground").style.display = "block";
    }
    else{
        if(!countRound){
            if(gamer.win > gamer.failures){
                alert("Wygrałeś!!!");
            }
            else{
                alert("Przegrałeś!!!");
            }
            resetData();
            gamer.win = 0;
            gamer.failures = 0;
            document.querySelector(".introduction").style.display = "flex";
            return 0;
        }
        else{
        document.querySelector(".game").style.display = "flex";
        document.querySelector(".battleground").style.display = "none";
        }
    }
}

const aiChoice = () => {
    const choice = Math.floor(ai.choice = Math.random() * 3);
    ai.choice = choice;
    computer.textContent = means[ai.choice];
}

const compareChoice = () => {
    if((ai.choice + 1)%3 == gamer.choice){
        gamer.result = 0;
    }
    else if((gamer.choice + 1)%3 == ai.choice){
        gamer.result = 1;
    }
    else{
        gamer.result = -1;
    }
}

const afterPressPlay = () => {
    if (gamer.choice <= -1) {
        alert('Wybierz swoją broń!');
        return 0;
    }
    attributes.forEach(attribute => attribute.classList.remove('active'))
    aiChoice();
    if (countRound) {
        compareChoice();
    }
    document.querySelector(".count").textContent = --countRound;
    resetData();
    showBattle(true);
    setTimeout(showBattle, 4000, false);
    gamer.choice = -1;
    console.log(gamer.win);
}

function duringGame() {
    attributes.forEach(attr => attr.addEventListener("click", () => {
        attributes.forEach(attribute => attribute.classList.remove('active'));
        attr.classList.add('active');
        gamer.choice = parseInt(attr.dataset['option']);
        // console.log(gamer.choice);
        your.textContent = means[gamer.choice];
    }));
    buttonGame.addEventListener("click", afterPressPlay);
    buttonEnd.addEventListener("click", () => {
        countRound = 0;
        resetData();
        document.querySelector(".introduction").style.display = "flex";
    });
}

function startGame() {
    countRound = parseInt(input.value);
    if (!countRound || countRound <= 0) {
        alert("Wpisz liczbę rund lub liczba rund mniejsza bądź równa 0");
    }
    else {
        insertData();
        duringGame();
    }
    // console.log(countRound);
}

button.addEventListener("click", startGame)