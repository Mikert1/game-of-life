let game = document.getElementById('game');

for (let i = 0; i < 30; i++) {
    let row = document.createElement('div');
    for (let j = 0; j < 15; j++) {
        let div = document.createElement('div');
        div.className = 'square';
        div.addEventListener('click', function() {
            color = document.getElementById('colorPicker').value;
            div.style.backgroundColor = color;
        });
        row.appendChild(div);
    }
    game.appendChild(row);
}