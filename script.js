//**************************MODEL************************ */
let gridSize=10;
let generationCount=0;
let grid=initializeGrid();

function initializeGrid(){
    let newGrid=[];
    for (let i=0; i<gridSize; i++){
        newGrid[i]=Array(gridSize).fill(0);
    }
    return newGrid;
}

//**************************VIEW************************ */
function renderGrid() {
    const gridContainer = document.getElementById("grid-container");
    gridContainer.innerHTML = "";

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement("div");
            const neighbors = countNeighbors(i, j);

            cell.className = grid[i][j] ? "cell alive" : "cell dead";

            if (grid[i][j]) {
                cell.style.border = `${neighbors * 2}px solid #f00`; // Border for alive cells
            } else {
                cell.style.border = "1px solid #ccc"; // Border for dead cells
            }

            cell.addEventListener("click", () => toggleCell(i, j));
            gridContainer.appendChild(cell);
        }
    }

    document.getElementById("generation-count").innerText = `Generations: ${generationCount}`;
}

//**************************CONTROLLER************************ */
function toggleCell(row, col){
    grid[row][col]=1-grid[row][col];
    renderGrid();
}

function clearGrid(){
    grid=initializeGrid();
    generationCount=0;
    renderGrid();
}

function randomCells(){
    for (let i=0; i<gridSize; i++){
        for (let j=0; j<gridSize; j++){
            grid[i][j]=Math.random()>0.5 ? 1 :0;
        }
    }
    renderGrid();
}


function countNeighbors(row, col) {
    let count = 0;
    
    for (let i = Math.max(0, row - 1); i <= Math.min(gridSize - 1, row + 1); i++) {
        for (let j = Math.max(0, col - 1); j <= Math.min(gridSize - 1, col + 1); j++) {
            if (!(i === row && j === col)) {
                count += grid[i][j];
            }
        }
    }
    
    return count;
}
function decideFate(row, col){
    const neighbors=countNeighbors(row, col);

    if(grid[row][col]===1){
        if(neighbors===2 || neighbors===3){
            return 1;
        } else {
            if (neighbors===3){
                return 1
            } else {
                return 0;
            }
        }
    }
}

function calculateNextGeneration(){
    const newGrid=initializeGrid();

    for(let i=0; i<gridSize; i++){
        for (let j=0; j<gridSize; j++){
            newGrid[i][j]=decideFate(i, j);
        }
    }

    grid=newGrid

}

setInterval(()=>{
    calculateNextGeneration();
    renderGrid();
    generationCount++;
}, 500)