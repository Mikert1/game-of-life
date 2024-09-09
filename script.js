let game = document.getElementById('game');
let colorPicker = document.getElementById('colorPicker');
let color = colorPicker.value;
let next = document.getElementById('next');
let cellsArray = [
    {row: 0, col: 0, alife: false}
];
let play = document.getElementById('play');

function nextMove() {
    let newCellsArray = JSON.parse(JSON.stringify(cellsArray)); // Make a copy to avoid modifying the original while looping

    cellsArray.forEach(function(cell) {
        let aliveNeighbors = 0;

        for (let j = -1; j <= 1; j++) {
            for (let k = -1; k <= 1; k++) {
                if (j === 0 && k === 0) continue; // Skip the cell itself
                let neighborRow = cell.row + j;
                let neighborCol = cell.col + k;
                let neighbor = cellsArray.find(c => c.row === neighborRow && c.col === neighborCol);

                if (neighbor && neighbor.alife) aliveNeighbors++;
            }
        }

        // Apply the rules of Conway's Game of Life:
        let div = document.querySelector('.row' + cell.row + '.col' + cell.col);
        if (cell.alife) {
            if (aliveNeighbors < 2 || aliveNeighbors > 3) {
                newCellsArray.find(c => c.row === cell.row && c.col === cell.col).alife = false; // Cell dies
                div.style.backgroundColor = ''; // Reset the background color
            }
        } else {
            if (aliveNeighbors === 3) {
                newCellsArray.find(c => c.row === cell.row && c.col === cell.col).alife = true; // Cell becomes alive
                div.style.backgroundColor = color; // Set the background color
            }
        }
    });

    cellsArray = newCellsArray; // Update the original array with the new state
}

for (let i = 0; i < 30; i++) {
    let row = document.createElement('div');
    for (let j = 0; j < 15; j++) {
        let div = document.createElement('div');
        div.classList.add('square', 'row' + i, 'col' + j);
        cellsArray.push({row: i, col: j, alife: false});
        div.addEventListener('click', function() {
            div.style.backgroundColor = color;
            let cellIndex = cellsArray.findIndex(c => c.row === i && c.col === j);
            cellsArray[cellIndex].alife = true; // Update cell to be alive
        });
        
        row.appendChild(div);
    }
    game.appendChild(row);
}

colorPicker.addEventListener('change', function() {
    document.querySelectorAll('.square').forEach(function(div) {
        if (div.style.backgroundColor !== '') {
            div.style.backgroundColor = color;
        }
    });
});

next.addEventListener('click', function() {
    nextMove();
});