// Player Factory Function
const createPlayer = (name,marker) => {
    return {name,marker};
}

// gameBoard Module

const gameBoard = (() =>{
    let board = [];
    for (let i = 0; i < 9;i++){
        board.push(i);
    };

    let boardContainer = document.querySelector('.boardContainer');

    // creating board
    board.forEach((item) => {
        const square = document.createElement('div');
        square.className = 'square';
        boardContainer.append(square);
    });

    let boardChildren = boardContainer.childNodes;
    console.log(boardChildren)

    // adding event listener on each child
    let boardFunction = function (child,index){
        child.classList.add('hello')
        child.textContent = 'whom'
        child.style.pointerEvents = 'none'
        console.log('this is the index ' + index)
    };

    boardChildren.forEach((child,index) => {
        child.addEventListener('click', ()=> boardFunction(child,index));
    });


})();

// displayController Module
const game = (() => {
    // declare players
    const playerOne = createPlayer('Player 1','X')
    const playerTwo = createPlayer('Player 2', 'O')

    // starting point
    let activePlayer = playerOne
    let winnerDeclared = fasle;
    let remainingSpots = 9;
    
    // selectors


    // winning conditions
    const winningAxes = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    // check winner

    // alert next player

    // next player

    // declare tie

    //return



})();