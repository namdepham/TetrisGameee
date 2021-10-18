const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const row = 11;
const col = 11;
const SQ = 40;
const COLOR = "WHITE";
//ve cac o, truyen gia tri hoang do, tung do, mau
function drawSquare(x,y,COLOR){
	ctx.fillStyle = COLOR;
	ctx.fillRect(x*SQ,y*SQ,SQ,SQ);
	ctx.strokeStyle = "grey";
	ctx.strokeRect(x*SQ,y*SQ,SQ,SQ);
}
//tao mang 2 chieu ve bang
let game = [];
for(r = 0 ;r<row;r++){
	game[r] = [];
	for(c = 0;c<col;c++){
	game[r][c] = COLOR;
	}
}
console.log(game);

function drawGame(){
	for(r = 0 ;r<row;r++){
		for(c = 0;c<col;c++){
			drawSquare(r,c,game[r][c]);
		}
	}
}
drawGame();

class Piece{
	constructor(tetromino, color){
		this.tetromino = tetromino;
		this.color = color;

		this.tetrominoN = 0
		this.activeTetromino = this.tetromino[this.tetrominoN];

		this.x = 3;
		this.y =-2; 
	}
	fill(color){
		for(let r = 0; r<this.activeTetromino.length; r++){
			for( let c =0;c<this.activeTetromino.length;c++){
				if(this.activeTetromino[r][c]){
					drawSquare(this.x+c, this.y+r, color);
				}
			}
		}
	}
	draw(){
		this.fill(this.color)
	}
	unDraw(){
		this.fill(COLOR)
	}
	moveDown(){
		if(!this.collision(0,1,this.activeTetromino)){
		this.unDraw();
		this.y++;
		this.draw()
		}else{
			this.lock();
			p = randomPieces();
		}
	}
	moveLeft(){
		if(!this.collision(-1,0, this.activeTetromino)){
		this.unDraw();
		this.x--;
		this.draw()
		}
	}
	moveRight(){
		if(!this.collision(1,0,this.activeTetromino)){
		this.unDraw();
		this.x++;
		this.draw()
		}
	}

	lock(){
		for(let r = 0 ; r<this.activeTetromino.length; r++){
			for(let c = 0;c<this.activeTetromino.length; c++){
				if(!this.activeTetromino[r][c]){
					continue;
				}
				if(this.y + r <0){
					alert("Game over!");
					gameOver = true;
					break;
				}
				game[this.y+r][this.x+c] =this.color;
			}

		}
	}
	rotate(){
		let nextPattern = this.tetromino[(this.tetrominoN+1) % this.tetromino.length]
		let move = 0;
		if(this.collision(0,0,nextPattern)){
			if(this.x>col/2){
				move =-1;
			} else {
				move = 1;
			}
		}
		if(!this.collision(0,0,nextPattern)){
				this.unDraw();
				this.x += move;
				this.tetrominoN = (this.tetrominoN+1) % this.tetromino.length;
				this.activeTetromino = this.tetromino[this.tetrominoN];
				this.draw();
		}
	}


	collision(x,y,piece){
		for(let r = 0; r< piece.length;r++){
			for(let c = 0 ; c<piece.length;c++){
				if(!piece[r][c]){
					continue;
				}
				let newX = this.x + c + x;
				let newY = this.y + r + y;
				if(newX <0 || newX >= col ||newY >= row ){
					return true;

				}
				if(newY <0){
					continue;
				}
				if(game[newY][newX] != COLOR){
					return true;
				}
			}
		}
		return false;
	}
}
const PIECES = [
	[I,"red"],
	[J,"blue"],
	[L,"yelloư"],
	[O,"hotpink"],
	[S,"orange"],
	[T,"purple"],

];
function  randomPieces() {
	let r = Math.floor(Math.random()*PIECES.length);
	return new Piece(PIECES[r][0],PIECES[r][1]);

};
let p = randomPieces();
console.log(p);

document.addEventListener('keydown', function(e){
		if(e.keyCode == 37){
			p.moveLeft();
		}else if(e.keyCode == 39){
			p.moveRight();
		}else if(e.keyCode == 38){
			p.rotate();
		}else if(e.keyCode == 40){
			p.moveDown();
		}
})

let gameOver = false;

let interval;
function drop(){
	interval = setInterval(function(){
		if(!gameOver){
			p.moveDown();
		}else{
			clearInterval(interval)
		}
	},500);
}
drop();
