var larguraBloco;
var numLinhas;
var numColunas;
var grid;

function setup() {
	var canvas = createCanvas(400, 400);
	larguraBloco = 40;
	numLinhas = floor(width/larguraBloco);
	numColunas = floor(height/larguraBloco);
	grid = new Array(numColunas);

	// Para cada coluna do grid, cria um array de linhas
	for(var i = 0; i < numColunas; i++) {
		grid[i] = new Array(numLinhas);
	}

	for(var i = 0; i < numColunas; i++) {
		for(var j = 0; j < numLinhas; j++) {
			var bloco = new Bloco(i,j);
			grid[i][j] = bloco;
			//console.log(grid[i][j]);
		}
	}

}

function draw() {
	background(40);
	for(var i = 0; i < numColunas; i++) {
		for(var j = 0; j < numLinhas; j++) {
			grid[i][j].printaBloco();
		}
	}
}

// Objeto bloco
function Bloco(x, y) {
	this.x = x;
	this.y = y;
	this.parede = [true,true,true,true];

	this.printaBloco = function() {
		var aux = larguraBloco;
		var i = this.x*aux;
		var j = this.y*aux;
		// printa as paredes de um bloco
		stroke(255);
		noFill();
		if(this.parede[0]) {
			line(i,j,i + aux,j);
		}
		if(this.parede[1]) {
			line(i,j + aux,i,j);
		}
		if(this.parede[2]) {
			line(i + aux,j,i,j);
		}
		if(this.parede[3]) {
			line(i + aux,j + aux,i,j + aux);
		}
	}
}
