let cellsArray = [];
let buttons = {
    play: document.getElementById('play'),
    stopp: document.getElementById('stop'),
    next: document.getElementById('next')
};
let game = document.getElementById('game');

let colorPicker = document.getElementById('colorPicker');
let color = colorPicker.value;
let intervalId;

let levelActive = false;

function resize(div) {
    div.style.width = `${(window.innerWidth - 400) / 50 - 2.008}px`;
    div.style.height = `${(window.innerWidth - 400) / 50 - 2.008}px`;
}

function loadLvl(lvl) {
    levelActive = true;
    level1 = [
        {row: 23, col: 12},

        {row: 24, col: 13},
        {row: 25, col: 13},

        {row: 24, col: 11},
        {row: 25, col: 11},

        {row: 25, col: 12},

        {row: 26, col: 12},
    ];
    cellsArray.forEach(function(cell) {
        let div = document.querySelector('.row' + cell.row + '.col' + cell.col);
        if (level1.find(c => c.row === cell.row && c.col === cell.col)) {
            cell.alife = true;
            div.style.backgroundColor = color;
        } else {
            div.style.backgroundColor = '';
            cell.alife = false;
        }
    });
}

function nextMove() {
    let newCellsArray = JSON.parse(JSON.stringify(cellsArray));

    cellsArray.forEach(function(cell) {
        let aliveNeighbors = 0;

        for (let j = -1; j <= 1; j++) {
            for (let k = -1; k <= 1; k++) {
                if (j === 0 && k === 0) continue;
                let neighborRow = cell.row + j;
                let neighborCol = cell.col + k;
                let neighbor = cellsArray.find(c => c.row === neighborRow && c.col === neighborCol);

                if (neighbor && neighbor.alife) aliveNeighbors++;
            }
        }

        let div = document.querySelector('.row' + cell.row + '.col' + cell.col);
        if (cell.alife) {
            if (aliveNeighbors < 2 || aliveNeighbors > 3) {
                newCellsArray.find(c => c.row === cell.row && c.col === cell.col).alife = false;
                div.style.backgroundColor = '';
            }
        } else {
            if (aliveNeighbors === 3) {
                color = colorPicker.value;
                newCellsArray.find(c => c.row === cell.row && c.col === cell.col).alife = true;
                div.style.backgroundColor = color;
            }
        }
    });

    cellsArray = newCellsArray;
}

for (let i = 0; i < 50; i++) {
    let row = document.createElement('div');
    for (let j = 0; j < 25; j++) {
        let div = document.createElement('div');
        div.classList.add('square', 'row' + i, 'col' + j);
        resize(div);
        cellsArray.push({row: i, col: j, alife: false});
        div.addEventListener('click', function() {
            if (div.style.backgroundColor === '') {
                color = colorPicker.value;
                div.style.backgroundColor = color;
                let cellIndex = cellsArray.findIndex(c => c.row === i && c.col === j);
                cellsArray[cellIndex].alife = true;
            } else {
                color = colorPicker.value;
                div.style.backgroundColor = '';
                let cellIndex = cellsArray.findIndex(c => c.row === i && c.col === j);
                cellsArray[cellIndex].alife = false;
            }
        });
        
        row.appendChild(div);
    }
    game.appendChild(row);
}

colorPicker.addEventListener('change', function() {
    document.querySelectorAll('.square').forEach(function(div) {
        for (let i = 0; i < cellsArray.length; i++) {
            if (cellsArray[i].alife) {
                if (div.classList.contains('row' + cellsArray[i].row) && div.classList.contains('col' + cellsArray[i].col)) {
                    div.style.backgroundColor = colorPicker.value;
                }
            }
        }
    });
});

buttons.next.addEventListener('click', function() {
    nextMove();
});

buttons.play.addEventListener('click', function() {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(nextMove, 100);
});

buttons.stopp.addEventListener('click', function() {
    clearInterval(intervalId);
});

window.addEventListener('resize', function() {
    document.querySelectorAll('.square').forEach(function(div) {
        resize(div);
    });
});

document.addEventListener('keydown', function(event) {
    if (!isNaN(event.key)) {
        loadLvl(event.key);
    }
});