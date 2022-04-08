const gamesLinksNode = document.querySelectorAll('.nav-games .gameLink');
const gamesLinks = Array.prototype.slice.call(gamesLinksNode);
console.log(gamesLinks);


const gamesNode = document.querySelectorAll('.game');
const games = Array.prototype.slice.call(gamesNode);
console.log(games);


const gamesList = ['Black Jack']

// games[0].addEventListener('click', () => [
//     console.log('Black Jack launched')
//
// ])

gamesLinks.forEach((el) => {
    el.addEventListener('click', () => {
        games.forEach((el) => el.classList.remove('active'));
        console.log(`Game ${gamesList[0]} started`);
        games[gamesLinks.indexOf(el)].classList.add('active');
    })
})


function BlackJack() {

    const playerScoreEl = document.getElementsByClassName('BJ-score-P')[0];
    const robotScoreEl = document.getElementsByClassName('BJ-score-R')[0];
    const resultEl = document.getElementsByClassName('BJ-result')[0];

    const addCardBtn = document.getElementsByClassName('BJ-actions-add')[0];
    const finishBtn = document.getElementsByClassName('BJ-actions-finish')[0];

    const restartBtn = document.getElementsByClassName('BJ-result-restart')[0];
    const resultTxt = document.getElementsByClassName('BJ-result-txt')[0];

    const playerCards = document.getElementsByClassName('BJ-playerCards')[0];


    let playerScore = 0;
    let robotScore = 0;

    function card () {
        return Math.floor(Math.random() * 9 + 2)
    }

    function robotGo () {
        robotScore += card();
        console.log(`robot score is ${robotScore}`);
        robotScoreEl.textContent = `Robot score: ${robotScore}`;
    }
    function playerGo() {
        let curCard = card()
        playerScore += curCard;
        console.log(`your score: ${playerScore}`);
        playerScoreEl.textContent = `Your score is ${playerScore}`;
        showCard(curCard, playerCards)
    }

    function showCard (card, place) {
        let cardEl = document.createElement('div');
        cardEl.className = 'card';
        cardEl.textContent = card;
        place.appendChild(cardEl);
    }

    function clearCards () {
        playerCards.textContent = '';
    }

    function robotPlay() {
        console.log('robot is thinking');
        while ( robotScore < 18 ) {
            robotGo();
        }
    }

    function result(res) {
        resultTxt.textContent = `Result: ${res}`

    }

    function compareResults () {
        if (robotScore > 21) {
            console.log('You won');
            result('win');
        }
        else if (robotScore < playerScore) {
            console.log('you won');
            result('win');
        }
        else if (robotScore === playerScore) {
            console.log('draw')
            result('draw');
        }
        else if (robotScore > playerScore) {
            console.log('you loose');
            result('lose');
        }
    }

    addCardBtn.addEventListener('click', () => {
        playerGo();
        if(playerScore > 21 ) {
            console.log('you loose');
            result('lose');
        }
    })

    finishBtn.addEventListener('click', () => {
        robotPlay();
        compareResults();
    })

    restartBtn.addEventListener('click', () => {
        console.log('restart')
        playerScore = 0;
        robotScore = 0;
        robotScoreEl.textContent = 'Robot score: 0';
        playerScoreEl.textContent = 'Your score: 0';
        clearCards();
    })

}

BlackJack();