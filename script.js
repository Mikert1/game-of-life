let cellsArray = [];
let buttons = {
    play: document.getElementById('play'),
    stopp: document.getElementById('stop'),
    next: document.getElementById('next'),
    speedRange: document.getElementById('speedRange')
};

let displays = {
    moves: document.getElementById('moves'),
    highscore: document.getElementById('highscore'),
    whatisHappening: document.getElementById('whatisHappening')
};
let game = document.getElementById('game');

let colorPicker = document.getElementById('colorPicker');
let color = colorPicker.value;
let intervalId;

let currentLevel = NaN;
let moves = 0;

let speed = speedRange.value;
let levelData = [];

function writeData() {
    localStorage.setItem('levelData13', JSON.stringify(levelData));
}

async function loadData() {
    let data = JSON.parse(localStorage.getItem('levelData13'));
    if (data) {
        console.log('Data loaded from local storage');
        levelData = data;
    } else {
        await fetch('levels.json')
            .then(response => response.json())
            .then(data => {
                console.log('Data loaded from levels.json');
                levelData = data;
            })
            .catch(error => console.error('Error loading levels:', error));
        writeData();
    }
}

async function placing() {
    await loadData()
    let side = document.getElementById('side');

    console.log(levelData);
    levelData.forEach((info) => {
        let card = document.createElement('div');
        let cardInCard = document.createElement('div');
        card.classList.add('card');

        const fullUrl = new URL("img/" + info.img, window.location.href).href;
        card.style.backgroundImage = `url(${fullUrl})`;
        card.style.backgroundSize = "cover";
        card.style.backgroundPosition = "center";
        card.classList.add('id' + info.level);

        if (!info.unlocked) {
            card.classList.add('locked');
            card.style.opacity = '0.5';
            card.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" class="lock" height="50" viewBox="0 0 30 30">
        <path d="M 15 2 C 11.145666 2 8 5.1456661 8 9 L 8 11 L 6 11 C 4.895 11 4 11.895 4 13 L 4 25 C 4 26.105 4.895 27 6 27 L 24 27 C 25.105 27 26 26.105 26 25 L 26 13 C 26 11.895 25.105 11 24 11 L 22 11 L 22 9 C 22 5.2715823 19.036581 2.2685653 15.355469 2.0722656 A 1.0001 1.0001 0 0 0 15 2 z M 15 4 C 17.773666 4 20 6.2263339 20 9 L 20 11 L 10 11 L 10 9 C 10 6.2263339 12.226334 4 15 4 z" />
    </svg>`;
        }

        let levelNumber = document.createElement('p');
        levelNumber.textContent = "Level " + info.level;

        let difficulty = document.createElement('div');
        for (let i = 0; i < info.difficulty; i++) {
            difficulty.innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
            </svg>`;
        }

        let name = document.createElement('p');
        name.textContent = info.name;

        cardInCard.appendChild(levelNumber);
        cardInCard.appendChild(difficulty);
        card.appendChild(cardInCard);
        card.appendChild(name);

        side.appendChild(card);
    });
}

placing();

function resize(div) {
    div.style.width = `${(window.innerWidth - 400) / 50 - 2.008}px`;
    div.style.height = `${(window.innerWidth - 400) / 50 - 2.008}px`;
}

function afterLvl() {
    console.log('Level completed');
    somethingChanged = false;
    displays.whatisHappening.innerText = 'Level completed';
    for (let i = 0; i < levelData.length; i++) {
        if (levelData[i].level == currentLevel) {
            console.log('Level ' + currentLevel + ' completed in ' + moves + ' moves');
            levelData[i].unlocked = true;
            if (levelData[i].highscore > moves || isNaN(levelData[i].highscore)) {
                levelData[i].highscore = moves;
                displays.highscore.innerText = 'Highscore: ' + moves;
            }
            writeData();
            moves = 0;
            currentLevel = NaN;
            return;
        }
    }
}

function loadLvl(lvl) {
    displays.whatisHappening.innerText = 'Level ' + lvl;
    moves = 0;
    currentLevel = lvl;
    for (let i = 0; i < levelData.length; i++) {
        if (levelData[i].level == lvl) {
            displays.highscore.innerText = 'Highscore: ' + levelData[i].highscore;
        }
    }
    somethingChanged = false;
    if (lvl === '1') {
        level = [
            {row: 23, col: 12},

            {row: 24, col: 13},
            {row: 25, col: 13},

            {row: 24, col: 11},
            {row: 25, col: 11},

            {row: 25, col: 12},

            {row: 26, col: 12},
        ];
    } else if (lvl === '2') {
    } else if (lvl === '3') {
    } else if (lvl === '4') {
    } else if (lvl === '5') {
    } else if (lvl === '6') {
    } else if (lvl === '7') {
    } else if (lvl === '8') {
    } else if (lvl === '9') {
    } else if (lvl === '0') {
    }
    cellsArray.forEach(function(cell) {
        let div = document.querySelector('.row' + cell.row + '.col' + cell.col);
        if (level.find(c => c.row === cell.row && c.col === cell.col)) {
            cell.alife = true;
            div.style.backgroundColor = color;
        } else {
            div.style.backgroundColor = '';
            cell.alife = false;
        }
    });
    speed = speedRange.value;
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(nextMove, (100 - speed) * 10);
}

function cheackForCompletion() {
    let somethingChanged = false;
    if (!isNaN(currentLevel)) {
        cellsArray.forEach(function(cell) {
            if (cell.alife == true) {
                somethingChanged = true;
                return;
            }
        });
        if (!somethingChanged) {
            afterLvl();
        }
    }
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
    displays.moves.innerText = "Turns taken:" + moves;
    cheackForCompletion();
}

for (let i = 0; i < 50; i++) {
    let row = document.createElement('div');
    for (let j = 0; j < 25; j++) {
        let div = document.createElement('div');
        div.classList.add('square', 'row' + i, 'col' + j);
        resize(div);
        cellsArray.push({row: i, col: j, alife: false});
        div.addEventListener('click', function() {
            moves++;
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
    intervalId = setInterval(nextMove, (100 - speed) * 10);
});

speedRange.addEventListener('change', function() {
    speed = speedRange.value;
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = setInterval(nextMove, (100 - speed) * 10);
    }
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