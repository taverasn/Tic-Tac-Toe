/*----- constants -----*/
// Model
const COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const LOOKUP = {
    '1': 'X',
    '-1': 'O',
    'null': '',
};

/*----- app's state (variables) -----*/
// Model

let turn, winner, gameboard;

/*----- cached element references -----*/
// View

const $gameboardEl = $('#gameboard');
const $squareEls = $('.square');
const $buttonEl = $('#reset-btn');
const $messageEl = $('#message');

/*----- event listeners -----*/
// Controller

$gameboardEl.on('click', handleMove);
$buttonEl.on('click', handleInit);

/*----- functions -----*/
// Controller
// Start the game once the browser loads

handleInit();

function handleInit() {
    gameboard = new Array(9).fill().map(() => null);
    turn = 1;
    winner = false;
    render();
}

function checkWinner() {
    for(let i = 0; i < COMBOS.length; i++) {
        if(Math.abs(
            gameboard[COMBOS[i][0]] + 
            gameboard[COMBOS[i][1]] + 
            gameboard[COMBOS[i][2]]) === 3) {
            return gameboard[COMBOS[i][0]]
        }
    } if(gameboard.includes(null)) return false;
    return 'T'
}

function handleMove(event) {
   const position = event.target.dataset.index;
   if(winner || gameboard[position] !== null) return; // stop running this function
   gameboard[position] = turn;
   // check to see if we have a winner
   winner = checkWinner();
   turn *= -1;
   render();
}

function render() {
    // render is going to look at the gameboard array
    gameboard.forEach(function(value, index) {
        $($squareEls[index]).text(LOOKUP[value]);
    });
    // render will also update our message based on the turn or of we won
    if(!winner) {
        $messageEl.text(`It's Player ${LOOKUP[turn]}'s Turn`);
    } else if (winner === 'T') {
        $messageEl.text('Tie Game');
    } else {
        $messageEl.text(`Congratulations ${LOOKUP[winner]} Wins`);
    }
}