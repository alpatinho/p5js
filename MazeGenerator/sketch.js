var larguraBloco;
var numLinhas;
var numColunas;
var grid = [];
var current;

function setup() {
	var canvas = createCanvas(400, 400);
	larguraBloco = 40;
	numLinhas = floor(width/larguraBloco);
	numColunas = floor(height/larguraBloco);
	frameRate(20);

	// Instancia um bloco em cada posicao do grid
	for(var i = 0; i < numColunas; i++) {
		for(var j = 0; j < numLinhas; j++) {
			var bloco = new Bloco(j,i);
			grid.push(bloco);
		}
	}

	current = grid[0];

}

function draw() {
	background(90);
	for(var i = 0; i < grid.length; i++) {
			grid[i].printaBloco();
		}


	current.visitado = true;
	var next = current.getNeighbors();
	if(next) {
		next.visited = true;
		current = next;
	}
}

function index(i, j) {
	if(i < 0 || j < 0 || i > numColunas - 1 || j > numLinhas - 1) {
		return -1;
	}
	return i + j * numColunas;
}

// Objeto bloco
function Bloco(x, y) {
	this.x = x;
	this.y = y;
	this.paredes = [true,true,true,true];
	this.visistado = false;

	this.getNeighbors = function() {
		var neighbors = [];
		var top    = grid[index(x, y-1)];
		var right  = grid[index(x+1, y)];
		var bottom = grid[index(x, y+1)];
		var left   = grid[index(x-1, y)];

		if(top && !top.visited) {
			neighbors.push(top);
		}
		if(right && !right.visited) {
			neighbors.push(right);
		}
		if(bottom && !bottom.visited) {
			neighbors.push(bottom);
		}
		if(left && !left.visited) {
			neighbors.push(left);
		}

		if(neighbors.length > 0) {
			var r = floor(random(0,neighbors.length));
			return neighbors[r];
		} else {
			return undefined;
		}

	}

	this.printaBloco = function() {
		var aux = larguraBloco;
		var i = this.x*aux;
		var j = this.y*aux;
		// printa as paredes de um bloco
		stroke(255);
		//noFill();
		//rect(i,j,aux,aux);

		if(this.paredes[0]) {
			line(		i			,			j		,	i + aux	,		j 		);
		}
		if(this.paredes[1]) {
			line(		i 		,	j + aux	,	i				,		j			);
		}
		if(this.paredes[2]) {
			line(i + aux	,	   j  	,	i				,		j   	);
		}
		if(this.paredes[3]) {
			line(i + aux	,	j + aux	,	i				,	j + aux	);
		}

		if(this.visitado) {
			fill(0,0,255,100);
			rect(i,j,aux,aux);
		}

	}
}
