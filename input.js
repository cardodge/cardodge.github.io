var leftUp = 87;
var leftLeft = 65;
var leftDown = 83;
var leftRight = 68;

var rightUp = 73;
var rightLeft = 74;
var rightDown = 75;
var rightRight = 76;

document.onkeydown = function(e){
	if(e.keyCode == 32){//space
		paused = !paused;
		if(!paused){frame();}
	}

	if(e.keyCode == leftUp){//w
		player[0].direction = "up";
	}
	if(e.keyCode == leftLeft){//a
		player[0].dx = -playerSpeed;
		player[0].direction = "left";
	}
	if(e.keyCode == leftDown){//s
		player[0].direction = "down";
	}
	if(e.keyCode == leftRight){//d
		player[0].dx = playerSpeed;
		player[0].direction = "right";
	}

	if(e.keyCode == rightUp){//i
		player[1].direction = "up";
	}
	if(e.keyCode == rightLeft){//j
		player[1].dx = -playerSpeed;
		player[1].direction = "left";
	}
	if(e.keyCode == rightDown){//k
		player[1].direction = "down";
	}
	if(e.keyCode == rightRight){//l
		player[1].dx = playerSpeed;
		player[1].direction = "right";
	}
}

document.onkeyup = function(e){
	if(e.keyCode == leftUp){//w
		if(player[0].direction == "up"){
			player[0].direction = false;
		}
	}
	if(e.keyCode == leftLeft){//a
		if(player[0].direction == "left"){
			player[0].direction = false;
		}
	}
	if(e.keyCode == leftDown){//s
		if(player[0].direction == "down"){
			player[0].direction = false;
		}
	}
	if(e.keyCode == leftRight){//d
		if(player[0].direction == "right"){
			player[0].direction = false;
		}
	}

	if(e.keyCode == rightUp){//i
		if(player[1].direction == "up"){
			player[1].direction = false;
		}
	}
	if(e.keyCode == rightLeft){//j
		if(player[1].direction == "left"){
			player[1].direction = false;
		}
	}
	if(e.keyCode == rightDown){//k
		if(player[1].direction == "down"){
			player[1].direction = false;
		}
	}
	if(e.keyCode == rightRight){//l
		if(player[1].direction == "right"){
			player[1].direction = false;
		}
	}
}

function input(variable){
	window[variable] = Number(document.getElementById(variable).value);

	if(variable == "baseSpeed"){
		speed = baseSpeed;
	}
}

function inputText(variable){
	window[variable] = Number(document.getElementById(variable).value.toUpperCase().charCodeAt(0))
}