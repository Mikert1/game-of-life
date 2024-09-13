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

        const fullUrl = new URL("img/" + info.img, window.location.href).href;
        console.log(fullUrl);
        card.style.backgroundImage = `url(${fullUrl})`;
        card.style.backgroundSize = "cover";
        card.style.backgroundPosition = "center";
        if (!info.unlocked) {
            card.classList.add('locked');
            card.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 30 30" class="lock">
            <path d="M 15 2 C 11.145666 2 8 5.1456661 8 9 L 8 11 L 6 11 C 4.895 11 4 11.895 4 13 L 4 25 C 4 26.105 4.895 27 6 27 L 24 27 C 25.105 27 26 26.105 26 25 L 26 13 C 26 11.895 25.105 11 24 11 L 22 11 L 22 9 C 22 5.2715823 19.036581 2.2685653 15.355469 2.0722656 A 1.0001 1.0001 0 0 0 15 2 z M 15 4 C 17.773666 4 20 6.2263339 20 9 L 20 11 L 10 11 L 10 9 C 10 6.2263339 12.226334 4 15 4 z"/>
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