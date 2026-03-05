let sizes = [];
let cols = 10;
let rows = 10;
let numCircles = cols * rows;

// Stores index for find function
let foundIndex = -1;

function setup() {
    let container = document.getElementById('canvas-container');
    let canvas = createCanvas(container.offsetWidth, container.offsetHeight);
    canvas.parent('canvas-container');
    textAlign(CENTER, CENTER);
    noStroke();

    resetData();

    // DOM Listeners
    document.getElementById('btn-find').addEventListener('click', findValue);
    document.getElementById('btn-sort-up').addEventListener('click', sortUp);
    document.getElementById('btn-sort-down').addEventListener('click', sortDown);
    document.getElementById('btn-reset').addEventListener('click', resetData);
}

function draw() {
    background(255);

    let cellW = width / cols;
    let cellH = height / rows;

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            // FIX: correct index formula from assignment hint
            let index = i + (j * cols);
            let size = sizes[index];

            let x = i * cellW + cellW / 2;
            let y = j * cellH + cellH / 2;

            // FIX: highlight found circle in red, others in blue
            if (index === foundIndex) {
                fill("red");
            } else {
                fill("blue");
            }

            circle(x, y, size);

            if (size > 25) {
                fill(255); // white text so it's readable on the circle
                text(size, x, y);
            }
        }
    }
}

function resetData() {
    sizes = [];

    for (let i = 0; i < numCircles; i++) {
        sizes.push(Math.floor(random(10, 100)));
    }

    // Reset found index
    foundIndex = -1;

    calculateStats();
}

function findValue() {
    let valueToSearch = parseInt(document.querySelector("#find-input").value);

    // FIX: return true (not return = true), and closed the findIndex call properly
    foundIndex = sizes.findIndex(function (size) {
        if (size == valueToSearch) {
            return true;
        }
    });

    // If value not found, alert
    if (foundIndex == -1) {
        alert("Value not found!");
    }
}

function sortUp() {
    // sort ascending
    sizes.sort(function (sizeA, sizeB) {
        if (sizeA < sizeB) {
            return -1;
        } else {
            return 1;
        }
    });
    console.log("sorted array");
    foundIndex = -1;
    calculateStats();
}

function sortDown() {
    // sort descending
    sizes.sort(function (sizeA, sizeB) {
        if (sizeA > sizeB) {
            return -1;
        } else {
            return 1;
        }
    });
    console.log("sorted array");
    foundIndex = -1;
    calculateStats();
}

function calculateStats() {
    // Use reduce to calculate total mass
    let total = sizes.reduce(function (sum, size) {
        return sum + size;
    }, 0);

    console.log("Total:", total);

    // Calculate average
    let average = total / sizes.length;

    // Update the DOM
    document.getElementById("total-mass").innerHTML = total;
    document.getElementById("avg-size").innerHTML = average.toFixed(2);
 }