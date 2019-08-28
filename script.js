var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.setAttribute("width", window.innerWidth/2);
canvas.setAttribute("height", window.innerHeight);

var lane = [canvas.width/8,canvas.width/8*3,canvas.width/8*5,canvas.width/8*7];
var spawnTimer = 0;

var size = lane[0]/3;
var playerSpeed = lane[0]/4;
var player = [{x:lane[0],y:canvas.height-size*2,dx:0,direction:false},{x:lane[3],y:canvas.height-size*2,dx:0,direction:false}];

var squares = [];

var score = 0;
var baseSpeed = 5;
var speed = baseSpeed;
var acceleration = 0.1;
var speedLimit = 15;
var spawnSpeed = 5;
var directionSpawnRate = 0.1;
var paused = false;

var colors = ["black","white"];
var rgb = 0;
var red; var green; var blue;

function frame(){
	document.getElementById("baseSpeed").value = Math.round(speed*10)/10;
	document.getElementById("acceleration").value = Math.round(acceleration*10)/10;
	document.getElementById("speedLimit").value = Math.round(speedLimit*10)/10;
	//color();
	collision();
	move();
	spawn();
	draw();
	if(!paused){requestAnimationFrame(frame)};
}

/*function color(){
	rgb+=1;
	rgb%=(256*6);
	red = rgb;  if(red>767){red=255-(red-767)}; if(255<red){red=255}; if(red<0){red=0};
	green = rgb - 256; if(green>767){green=255-(green-767)}; if(255<green){green=255}; if(green<0){green=0};
	blue = rgb - 256*2; if(blue>767){blue=255-(blue-767)}; if(255<blue){blue=255}; if(blue<0){blue=0};

	colors[0] = "rgb(" + red + ", " + green + ", " + blue + ")";
	colors[1] = "rgb(" + (255 - red) + ", " + (255 - green) + ", " + (255 - blue) + ")";
}*/

function collision(){
	for(var i = 0; i < squares.length; i++){
		for(var z = 0; z < player.length; z++){
			if(Math.hypot(player[z].x-squares[i].x,player[z].y-squares[i].y)<size*2){
				if(squares[i].direction && player[z].direction == squares[i].direction){
					squares.splice(i,1);
					if(i!==0){i--;}
				}
				else{
					player[0].x = lane[0]; player[1].x = lane[3];
					squares = [];
					score = 0;
					speed = baseSpeed;
					paused = true;
					break;
				}
			}
		}
	}
}

function move(){
	for(var i = 0; i < player.length; i++){
		if(lane[0+i*2]<=player[i].x+player[i].dx && player[i].x+player[i].dx<=lane[1+i*2]){
			player[i].x += player[i].dx;
		}
	}

	for(var i = 0; i < squares.length; i++){
		squares[i].y += speed;

		if(squares[i].y>canvas.height+size){
			squares.splice(i,1);
			i--;
		}
	}
}

function spawn(){
	spawnTimer++;

	if(spawnTimer == Math.round((60/(speed/spawnSpeed))/2)){
		var random = Math.random();
		if(random<directionSpawnRate){
			if(random<directionSpawnRate/2){
				squares.push({x:lane[0],y:-size,direction:"up"});
				squares.push({x:lane[1],y:-size,direction:"up"});
			}
			else{
				squares.push({x:lane[0],y:-size,direction:"down"});
				squares.push({x:lane[1],y:-size,direction:"down"});
			}
		}
		else{
			if(random+directionSpawnRate<(1-directionSpawnRate)/2){
				squares.push({x:lane[0],y:-size,direction:false});
			}
			else{
				squares.push({x:lane[1],y:-size,direction:false});
			}
		}
	}
	if(spawnTimer >= Math.round(60/(speed/spawnSpeed))){
		var random = Math.random();
		if(random<directionSpawnRate){
			if(random<directionSpawnRate/2){
				squares.push({x:lane[2],y:-size,direction:"up"});
				squares.push({x:lane[3],y:-size,direction:"up"});
			}
			else{
				squares.push({x:lane[2],y:-size,direction:"down"});
				squares.push({x:lane[3],y:-size,direction:"down"});
			}
		}
		else{
			if(random+directionSpawnRate<(1-directionSpawnRate)/2){
				squares.push({x:lane[2],y:-size,direction:false});
			}
			else{
				squares.push({x:lane[3],y:-size,direction:false});
			}
		}
		score++;
		document.getElementById("score").innerHTML = score;
		if(speed<speedLimit){speed += acceleration};
		if(speed>speedLimit){speed = speedLimit};
		spawnTimer = 0;
	}
}

function draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height);

	ctx.strokeStyle = colors[0];
	ctx.fillStyle = colors[0];
	//document.getElementsByTagName("body")[0].style.backgroundColor = colors[0];
	//document.getElementsByTagName("canvas")[0].style.backgroundColor = colors[1];

	ctx.lineWidth = 10;
	ctx.beginPath();
	ctx.moveTo(canvas.width/2,0);
	ctx.lineTo(canvas.width/2,canvas.height);
	ctx.closePath();
	ctx.stroke();

	ctx.lineWidth = 5;
	ctx.beginPath();
	ctx.moveTo(canvas.width/4,0);
	ctx.lineTo(canvas.width/4,canvas.height);
	ctx.closePath();
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(canvas.width/4*3,0);
	ctx.lineTo(canvas.width/4*3,canvas.height);
	ctx.closePath();
	ctx.stroke();

	ctx.strokeStyle = colors[1];
	ctx.lineWidth = 1;

	for(var i = 0; i < player.length; i++){
		ctx.beginPath();
		ctx.arc(player[i].x,player[i].y,size,0,Math.PI*2);
		ctx.closePath();
		ctx.fill();

		ctx.beginPath();
		ctx.rect(player[i].x-size*4/5, player[i].y-size*4/5, size*8/5,size*8/5);
		ctx.closePath();
		ctx.stroke();

		ctx.fillStyle = colors[1];

		if(player[i].direction == "up"){
			ctx.beginPath();
			ctx.moveTo(player[i].x-size*4/5,player[i].y+size*4/5);
			ctx.lineTo(player[i].x+size*4/5,player[i].y+size*4/5);
			ctx.lineTo(player[i].x,player[i].y);
			ctx.closePath();
			ctx.fill();
		}
		if(player[i].direction == "down"){
			ctx.beginPath();
			ctx.moveTo(player[i].x-size*4/5,player[i].y-size*4/5);
			ctx.lineTo(player[i].x+size*4/5,player[i].y-size*4/5);
			ctx.lineTo(player[i].x,player[i].y);
			ctx.closePath();
			ctx.fill();
		}
		if(player[i].direction == "left"){
			ctx.beginPath();
			ctx.moveTo(player[i].x+size*4/5,player[i].y-size*4/5);
			ctx.lineTo(player[i].x+size*4/5,player[i].y+size*4/5);
			ctx.lineTo(player[i].x,player[i].y);
			ctx.closePath();
			ctx.fill();
		}
		if(player[i].direction == "right"){
			ctx.beginPath();
			ctx.moveTo(player[i].x-size*4/5,player[i].y-size*4/5);
			ctx.lineTo(player[i].x-size*4/5,player[i].y+size*4/5);
			ctx.lineTo(player[i].x,player[i].y);
			ctx.closePath();
			ctx.fill();
		}

		ctx.fillStyle = colors[0];
	}

	for(var i = 0; i < squares.length; i++){
		ctx.beginPath();
		ctx.rect(squares[i].x-size, squares[i].y-size, size*2, size*2);
		ctx.closePath();
		ctx.fill();

		ctx.beginPath();
		ctx.rect(squares[i].x-size*4/5, squares[i].y-size*4/5, size*8/5,size*8/5);
		ctx.closePath();
		ctx.stroke();

		ctx.fillStyle = colors[1];

		if(squares[i].direction == "up"){
			ctx.beginPath();
			ctx.moveTo(squares[i].x-size*4/5,squares[i].y+size*4/5);
			ctx.lineTo(squares[i].x+size*4/5,squares[i].y+size*4/5);
			ctx.lineTo(squares[i].x,squares[i].y);
			ctx.closePath();
			ctx.fill();
		}
		if(squares[i].direction == "down"){
			ctx.beginPath();
			ctx.moveTo(squares[i].x-size*4/5,squares[i].y-size*4/5);
			ctx.lineTo(squares[i].x+size*4/5,squares[i].y-size*4/5);
			ctx.lineTo(squares[i].x,squares[i].y);
			ctx.closePath();
			ctx.fill();
		}

		ctx.fillStyle = colors[0];
	}
}

frame();