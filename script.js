let game = document.getElementById('game');
let colorPicker = document.getElementById('colorPicker');

for (let i = 0; i < 30; i++) {
    let row = document.createElement('div');
    for (let j = 0; j < 15; j++) {
        let div = document.createElement('div');
        div.className = 'square';
        div.addEventListener('click', function() {
            color = colorPicker.value;
            div.style.backgroundColor = color;
        });
        row.appendChild(div);
    }
    game.appendChild(row);
}

colorPicker.addEventListener('change', function() {
    color = colorPicker.value;
    document.querySelectorAll('.square').forEach(function(div) {
        if (div.style.backgroundColor !== '') {
            div.style.backgroundColor = color;
        }
    });
});