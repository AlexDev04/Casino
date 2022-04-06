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
        console.log(`Запущена игра ${gamesList[0]}`);
        games[gamesLinks.indexOf(el)].classList.add('active');
    })
})


function BlackJack() {

    const playerScoreEl = document.getElementsByClassName('BJ-scoreP')[0];
    const robotScoreEl = document.getElementsByClassName('BJ-scoreR')[0];

    const addCardBtn = document.getElementsByClassName('BJ-actions-add')[0];
    const finishBtn = document.getElementsByClassName('BJ-actions-finish')[0];

    console.log(addCardBtn);

    function card () {
        return Math.floor(Math.random() * 9 + 2)
    }


    let playerScore = 0;
    let robotScore = 0;

    addCardBtn.addEventListener('click', () => {
        playerScore += card();
        console.log(`your score is ${playerScore}`);
        if(playerScore > 21 ) {
            console.log('you loose');
            playerScore = 0;
            console.log(`player score nulled, ${playerScore}`);
        }
    })

    finishBtn.addEventListener('click', () => {
        console.log('robot is thinking');
        robotPlay();
        // compareResults();
    })

    function robotPlay() {
        while ( robotScore < 18 ) {
            robotScore += card();
            console.log(`robot score is ${robotScore}`);
        }
        if (robotScore > 21) {
            console.log('You won');
        }
        else if (robotScore < playerScore) {
            console.log('you won');
        }
        else if (robotScore == playerScore) {
            console.log('draw')
        }
        else if (robotScore > playerScore) {
            console.log('you loose');
        }
        playerScore = 0;
    }
}

BlackJack();