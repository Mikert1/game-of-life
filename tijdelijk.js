let levelInfo = [];
async function fetchData() {
    const response = await fetch('levels.json');
    if (response.ok) {
        const level = await response.json();
        levelInfo = level;
    } else {
        console.error('Error fetching data:', response.status);
    }
}
async function placing() {
    await fetchData();
    let side = document.getElementById('side');
    levelInfo.forEach((info) => {
        let card = document.createElement('div');
        let cardInCard = document.createElement('div');
        card.classList.add('card');
        let levelNumber = document.createElement('p');
        levelNumber.textContent = "Level " + info.level;
        let difficulty = document.createElement('p');
        difficulty.textContent = info.difficulty;
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