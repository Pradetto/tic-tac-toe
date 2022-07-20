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

    let playerOneSelections = [];
    let playerTwoSelections = [];

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
        child.classList.add('selected')
        child.textContent = game.activePlayer.marker
        child.style.pointerEvents = 'none'


        game.remainingSpots -= 1


        if (game.activePlayer === game.playerOne){
            playerOneSelections.push(index)
            game.checkWinner(playerOneSelections)
        } else {
            playerTwoSelections.push(index)
            game.checkWinner(playerTwoSelections)
        }
        if (game.winnerDeclared === false && game.remainingSpots > 0){
            game.alertNextPlayer();
            game.nextPlayer();
        } else if (game.winnerDeclared === true) {
            return
        }

        if (game.remainingSpots === 0){
            game.declareTie()
            return
        };


    };

    boardChildren.forEach((child,index) => {
        child.addEventListener('click', ()=> boardFunction(child,index));
    });

    const restartButton = document.querySelector('.resetGame');

    restartButton.addEventListener('click', ()=> {
        location.reload();
        return false;
        // gameBoard.board = [];
        // for (let i = 0; i < 9;i++){
        //     gameBoard.board.push(i);
        //     console.log(gameBoard.board)
    // };
    });

    let deactivateBoard = () =>{
        boardChildren.forEach((child) => {
            child.style.pointerEvents = 'none'
        })
    }

    return {
        deactivateBoard
    }

})();

// displayController Module
const game = (() => {
    // declare players
    const playerOne = createPlayer('Player 1','X')
    const playerTwo = createPlayer('Player 2', 'O')

    // starting point
    let activePlayer = playerOne
    let winnerDeclared = false;
    let remainingSpots = 9;
    
    // selectors
    let subtext = document.querySelector('.subtext'); // display winner/tie
    let playerName = document.querySelector('.player-name'); // purpose: alert player turn

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
    function checkWinner(selections){
        winningAxes.forEach((item,index) => {
            if(item.every(element => selections.includes(element))){
                game.winnerDeclared = true
                console.log('winner found')
                subtext.innerHTML = `<b>${this.activePlayer.name} wins!</b>`;
                console.log('True')
                gameBoard.deactivateBoard();
            }
        })
    }


        // winningAxes.forEach((item, index) => { // [0, 1, 2, 3, 4, 5, 6, 7]
        //     if (gameBoard.board[item[0]] === this.activePlayer.marker && gameBoard.board[item[1]] === this.activePlayer.marker && gameBoard.board[item[2]] === this.activePlayer.marker) {
        //         console.log('winner!');
        //         subtext.innerHTML = `<b>${this.activePlayer.name} wins!</b>`;
        //         this.winnerDeclared = true;
        //     } 
        // });



    // alert next player
    function alertNextPlayer(){
        this.activePlayer === playerOne ? playerName.textContent = 'Player Two' : playerName.textContent = 'Player One';
    }

    // next player
    function nextPlayer(){
        this.activePlayer === playerOne ? game.activePlayer = playerTwo : game.activePlayer = playerOne;
    }
    // declare tie
    function declareTie(){
        subtext.innerHTML = "<b>Tie game!</b>";
    }

    //return

    return {
        activePlayer,
        remainingSpots,
        playerOne,
        playerTwo,
        checkWinner,
        winnerDeclared,
        declareTie,
        alertNextPlayer,
        nextPlayer,
        declareTie
    }

})();

function reset () {
    gameBoard()
}