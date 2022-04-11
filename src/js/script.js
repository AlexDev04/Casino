const gamesLinksNode = document.querySelectorAll('.nav-games .gameLink');
const gamesLinks = Array.prototype.slice.call(gamesLinksNode);
console.log(gamesLinks);


const gamesNode = document.querySelectorAll('.game');
const games = Array.prototype.slice.call(gamesNode);
console.log(games);


const gamesList = ['Black Jack', 'Bones']


gamesLinks.forEach((el) => {
    el.addEventListener('click', () => {
        games.forEach((el) => el.classList.remove('active'));
        console.log(`Game ${gamesList[gamesLinks.indexOf(el)]} started`);
        games[gamesLinks.indexOf(el)].classList.add('active');
    })
})


function BlackJack() {

    const playerScoreEl = document.getElementsByClassName('BJ-score-P')[0];
    const robotScoreEl = document.getElementsByClassName('BJ-score-R')[0];

    const addCardBtn = document.getElementsByClassName('BJ-actions-add')[0];
    const finishBtn = document.getElementsByClassName('BJ-actions-finish')[0];

    const restartBtn = document.getElementsByClassName('BJ-score-result-restart')[0];
    restartBtn.style.display = 'none';
    const resultTxt = document.getElementsByClassName('BJ-score-result-txt')[0];

    const playerCards = document.getElementsByClassName('BJ-playerCards')[0];
    const robotCards = document.getElementsByClassName('BJ-robotCards')[0];


    let playerScore = 0;
    let robotScore = 0;

    function card () {
        return Math.floor(Math.random() * 9 + 2)
    }

    function robotGo () {
        let curCard = card();
        robotScore += curCard;
        console.log(`robot score is ${robotScore}`);
        robotScoreEl.textContent = `Robot score: ${robotScore}`;
        showCard(curCard, robotCards)
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
        if(playerScore > 21 ) {
            console.log('you loose');
            result('lose');
        } else {
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
        restartBtn.style.display = 'block';
    }

    function turn () {
        playerGo();
        if(playerScore > 21 ) {
            console.log('you loose');
            result('lose');
            addCardBtn.removeEventListener('click', turn)
            restartBtn.style.display = 'block';
        }
    }

    function restart () {
        console.log('restart')
        playerScore = 0;
        robotScore = 0;
        robotScoreEl.textContent = 'Robot score: 0';
        playerScoreEl.textContent = 'Your score: 0';
        result('');
        clearCards();
        addCardBtn.addEventListener('click', turn)
    }

    addCardBtn.addEventListener('click', turn)

    finishBtn.addEventListener('click', () => {
        robotPlay();
        compareResults();
    })

    restartBtn.addEventListener('click', restart);

}

function Bones() {

    const playerScoreEl = document.getElementsByClassName('bones-score-P')[0];
    const robotScoreEl = document.getElementsByClassName('bones-score-R')[0];

    const throwBtn = document.getElementsByClassName('bones-actions-throw')[0];
    const finishBtn = document.getElementsByClassName('bones-actions-finish')[0];
    const repeates = document.getElementsByClassName('bones-actions-repeates')[0];

    const restartBtn = document.getElementsByClassName('bones-score-result-restart')[0];
    restartBtn.style.display = 'none';
    const resultTxt = document.getElementsByClassName('bones-score-result-txt')[0];

    const playerBones = document.getElementsByClassName('bones-playerBones')[0];
    const robotBones = document.getElementsByClassName('bones-robotBones')[0];

    let playerScore = 0;
    let robotScore = 0;

    function go (rep) {
        let res;
        let throws = [];
        let curRes;
        for(let i = 0; i < rep; i++) {
            curRes = Math.floor(Math.random() * 6 + 1);
            throws.push(curRes);
        }
        console.log(throws);
        return throws;
    }

    function playerGo () {
        let goRes = go(repeates.value);
        showBones('player', goRes);
        throwBtn.removeEventListener('click', playerGo);
        goRes.forEach((el) => playerScore += el)
        playerScoreEl.textContent = `Player score: ${playerScore}`;
    }

    function robotGo () {
        let goRes = go(repeates.value);
        showBones('robot', goRes);
        goRes.forEach((el) => robotScore += el)
        robotScoreEl.textContent = `Robot score: ${robotScore}`;
    }

    function showBones (dir, goRes) {
        if(dir === 'player') {
            goRes.forEach((el) => {
                let boneEl = document.createElement('div');
                boneEl.className = 'bone';
                boneEl.textContent = el;
                playerBones.appendChild(boneEl);
            })
        }
        else if (dir === 'robot') {
            goRes.forEach((el) => {
                let boneEl = document.createElement('div');
                boneEl.className = 'bone';
                boneEl.textContent = el;
                robotBones.appendChild(boneEl);
            })
        }
    }

    function compareRes(robotScore, playerScore) {
        console.log('comparing');
        console.log(`robot score is ${robotScore}`);
        console.log(`player score is ${playerScore}`);
        if (robotScore > playerScore) {
            console.log('you lose');
            resultTxt.textContent = 'Result: lose'
        }
        else if (robotScore === playerScore) {
            console.log('draw')
            resultTxt.textContent = 'Result: draw'

        }
        else if (playerScore > robotScore) {
            console.log('you won')
            resultTxt.textContent = 'Result: win'
        }
        else {
            console.log('wtf, everything went wrong')
        }
    }

    function finish () {
        robotGo();
        compareRes(robotScore, playerScore);
        finishBtn.removeEventListener('click', finish);
        restartBtn.style.display = 'block';
    }

    function restart () {
        throwBtn.addEventListener('click', playerGo);
        finishBtn.addEventListener('click', finish);
        playerScore = 0;
        robotScore = 0;
        playerBones.innerHTML = '';
        robotBones.innerHTML = '';
        playerScoreEl.textContent = 'Player score:';
        robotScoreEl.textContent = 'Robot score:';
        resultTxt.textContent = 'Result:'
    }


    throwBtn.addEventListener('click', playerGo);

    finishBtn.addEventListener('click', finish);

    restartBtn.addEventListener('click', restart)


}

BlackJack();
Bones();