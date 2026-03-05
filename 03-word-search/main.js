let container = document.querySelector('#canvas-container');

let characters = [];
let cols = 60;
let rows = 40;
let cellW, cellH;

function setup() {
    let canvas = createCanvas(container.offsetWidth, container.offsetHeight);
    canvas.parent(container);

    textFont('Share Tech Mono');
    textAlign(CENTER, CENTER);

    cellW = width / cols;
    cellH = height / rows;

    // 2. Initialize Data
    for (let i = 0; i < cols * rows; i++) {
        let col = i % cols;
        let row = Math.floor(i / cols);

        let characterObject = {
            char: String.fromCharCode(floor(random(65, 91))),
            x: col * cellW + cellW / 2,
            y: row * cellH + cellH / 2,
            found: false
        };

        characters.push(characterObject);
    }

    // Listen for input changes, call updateSearch() when input changes
    document.getElementById('search-input').addEventListener('input', updateSearch);
}

function draw() {
    background(255);

    // 3. Draw the Grid
    characters.forEach(function (item) {
        if (item.found) {
            fill(0);
            textStyle(BOLD);
            textSize(14);
        } else {
            fill(200);
            textStyle(NORMAL);
            textSize(12);
        }

        text(item.char, item.x, item.y);
    });
}

function updateSearch() {
    // 4. Implement sequential search

    // First: Reset all characters (set found = false)
    characters.forEach(function (item) {
        item.found = false;
    });

    // Get input value
    let inputVal = this.value.toUpperCase();
    // Split input value into array of characters
    let searchChars = inputVal.split('');
    let lastFoundIndex = -1;

    // Loop through searchChars
    searchChars.forEach(function (letter) {

        // Find the matching object index in 'characters' array
        // Condition: char matches AND index > lastFoundIndex
        let index = characters.findIndex(function (item) {
            return item.char === letter && characters.indexOf(item) > lastFoundIndex;
        });

        // If found:
        // Set update found attribute and update lastFoundIndex
        if (index !== -1) {
            characters[index].found = true;
            lastFoundIndex = index;
        }
    });

    redraw();
}