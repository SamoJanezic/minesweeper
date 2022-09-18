let gameInstance = {
	width: 0,
	height: 0,
	numberOfBombs: 0
}

function setInstance(width, height, bombs) {
	gameInstance.width = width;
	gameInstance.height = height;
	gameInstance.numberOfBombs = bombs;
	gameInit();
}

function createGrid(cols, rows) {
	let grid = [];
	for (let i = 0; i < cols; i++) {
		grid.push([]);
		for (let j = 0; j < rows; j++) {
			grid[i].push(0);
			//coordinates.push([i,j]);
		}
	}
	console.log(grid)
	return grid;
}

function createButton(x, y, name){
	//let button = '<button onclick=showIndex(' + x + ',' + y + ') class="btn" id=' + x + ',' + y + '>' + x + ',' + y + '</button>';
	let button = `<button onclick=showIndex(${x},${y}) class="btn" id=${x},${y}>${name}</button>`;
	return button;
}

function showIndex(col, row, name) {
	console.log('col'+col, 'row'+row), name;
	return [col, row];
}

function getBombLocations(obj) {
	let bombsToPlace = obj.numberOfBombs;
	let allLocations = [];
	let bombLocations = [];

	for (let i = 0; i < obj.height; i++) {
		for (let j = 0; j < obj.width; j++) {
			allLocations.push([i,j]);
		}
	}

	while (bombsToPlace > 0) {
		let rand = Math.floor(Math.random()*allLocations.length);
		var bomb = allLocations[rand];
		bombLocations.push(bomb);
		allLocations.splice(rand, 1);
		bombsToPlace--;
	}
	return bombLocations;
}

function setBombs(locations, grid) {
	locations.forEach(el => {
		let posX = el[0];
		let posY = el[1];
		grid[posX][posY] = 'b';
		incrementFields(grid, posX, posY);
	});
}

function incrementFields(gr, x, y) {
	for (let i = -1; i < 2; i++){
		for(let j = -1; j < 2; j++) {
			if (gr[x+i] === undefined || gr[x + i][y + j] === undefined || gr[x + i][y +j] === 'b') {
				continue;
			}
			gr[x + i][y +j]++;
		}
	}
}

function createGameField(grid){
	for(let i = 0; i< grid.length; i++) {
		for (let j = 0; j< grid[i].length; j++) {
			grid[i][j] = createButton(i, j, grid[i][j]);
		}
	}
}

function gameInit() {
	let gameGrid = createGrid(gameInstance.height, gameInstance.width);
	setBombs(getBombLocations(gameInstance), gameGrid);
	createGameField(gameGrid);
	document.getElementById('grid').innerHTML = gameGrid.join('<br>');
}



