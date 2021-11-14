const theCanvas = document.getElementById("theCanvas");
const context = theCanvas.getContext("2d");
let gridOfCells = [];
const initialPattern = [
	{y:4, x:0, alive: true},
	{y:5, x:0, alive: true},
	{y:4, x:1, alive: true},
	{y:5, x:1, alive: true},
	{y:4, x:10, alive: true},
	{y:5, x:10, alive: true},
	{y:6, x:10, alive: true},
	{y:3, x:11, alive: true},
	{y:7, x:11, alive: true},
	{y:2, x:12, alive: true},
	{y:8, x:12, alive: true},
	{y:2, x:13, alive: true},
	{y:8, x:13, alive: true},
	{y:5, x:14, alive: true},
	{y:3, x:15, alive: true},
	{y:7, x:15, alive: true},
	{y:4, x:16, alive: true},
	{y:5, x:16, alive: true},
	{y:6, x:16, alive: true},
	{y:5, x:17, alive: true},
	{y:2, x:20, alive: true},
	{y:3, x:20, alive: true},
	{y:4, x:20, alive: true},
	{y:2, x:21, alive: true},
	{y:3, x:21, alive: true},
	{y:4, x:21, alive: true},
	{y:1, x:22, alive: true},
	{y:5, x:22, alive: true},
	{y:0, x:24, alive: true},
	{y:1, x:24, alive: true},
	{y:5, x:24, alive: true},
	{y:6, x:24, alive: true},
	{y:2, x:34, alive: true},
	{y:2, x:35, alive: true},
	{y:3, x:34, alive: true},
	{y:3, x:35, alive: true}
]
let step = 0;
gridOfCells = initializeCells();
initializePattern();
gridOfCells.forEach(drawRectangle);
game()

function game() {

	step += 1;
	context.font = "20px Arial";
	context.fillText("Game of Life Step: " + step, 10, theCanvas.height - 30);
	gridOfCells = calculateNextGeneration();
	context.clearRect(0, 0, theCanvas.width, theCanvas.height);
	gridOfCells.forEach(drawRectangle);
	window.requestAnimationFrame(game);
}

function drawRectangle(item, index, arr) {
	if (item.alive) {
		context.beginPath();
		context.strokeStyle = "black";
		context.rect(item.x * 10, item.y * 10, 10, 10);
		context.closePath();
		context.fill();
	}
}

function calculateNextGeneration() {
	let nextGrid = [];
	nextGrid = initializeCells();
	let neighbourCount = 0;
	length = gridOfCells.length;
	for (let i = 0; i < length; i++)
	{
		neighbourCount = 0;
		if ((gridOfCells[i].y > 0) && (gridOfCells[i].x > 0) && gridOfCells[(gridOfCells[i].y - 1) * 60 + (gridOfCells[i].x - 1)].alive)
			neighbourCount += 1;
		if ((gridOfCells[i].y > 0) && gridOfCells[(gridOfCells[i].y - 1) * 60 + (gridOfCells[i].x)].alive)
			neighbourCount += 1;
		if ((gridOfCells[i].y > 0) && (gridOfCells[i].x < 59) && gridOfCells[(gridOfCells[i].y - 1) * 60 + (gridOfCells[i].x + 1)].alive)
			neighbourCount += 1;
		if ((gridOfCells[i].x > 0) && gridOfCells[(gridOfCells[i].y) * 60 + (gridOfCells[i].x - 1)].alive)
			neighbourCount += 1;
		if ((gridOfCells[i].x <59) && gridOfCells[(gridOfCells[i].y) * 60 + (gridOfCells[i].x + 1)].alive)
			neighbourCount += 1;
		if ((gridOfCells[i].y < 59) && (gridOfCells[i].x > 0) && gridOfCells[(gridOfCells[i].y + 1) * 60 + (gridOfCells[i].x - 1)].alive)
			neighbourCount += 1;
		if ((gridOfCells[i].y < 59) && gridOfCells[(gridOfCells[i].y + 1) * 60 + (gridOfCells[i].x)].alive)
			neighbourCount += 1;
		if ((gridOfCells[i].y < 59) && (gridOfCells[i].x < 59) && gridOfCells[(gridOfCells[i].y + 1) * 60 + (gridOfCells[i].x + 1)].alive)
			neighbourCount += 1;


		// revive dead cell

		if (gridOfCells[i].alive) {
			if ((neighbourCount < 2) || (neighbourCount > 3))
				nextGrid[i].alive = false;
			else 
				nextGrid[i].alive = true;
		}
		if ((neighbourCount === 3) && (!gridOfCells[i].alive))
			nextGrid[i].alive = true;
		console.log(nextGrid[i], " ", neighbourCount);
	}
	return nextGrid;

}

function initializeCells() {
	const grid = [];
	for (let i = 0; i < 60; i++)
		for (let j = 0; j < 60; j++)
			grid.push({y: i, x: j, alive: false});
	return grid;
}

function initializePattern() {
	initialPattern.forEach(initializeCell)
}

function initializeCell(item, index, arr) {
	gridOfCells[item.y * 60 + item.x].alive = true;
}
