const playerScoreEl = document.getElementsByClassName('BJ-scoreP')[0];
const robotScoreEl = document.getElementsByClassName('BJ-scoreR')[0];

const addCardBtn = document.getElementsByClassName('BJ-actions-addCard')[0];
const finishBtn = document.getElementsByClassName('BJ-actions-finish')[0];




function BlackJAck() {
    let playerScore = 0;
    let robotScore = 0;

    addCardBtn.addEventListener('click', () => [
        playerScore += Math.floor(Math.random() * 13)
    ])

}