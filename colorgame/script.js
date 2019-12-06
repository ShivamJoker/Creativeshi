var numSqares = 6;
var colors = generateColors(numSqares);
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById('colorDisplay');
var msg = document.getElementById("msg");
var display = document.getElementById("display");
var wrong = new Audio("fail.ogg");
var right = new Audio("success.wav");
var newGame = document.getElementById("newGame");
var easyBtn = document.getElementById("easy");
var hardBtn = document.getElementById("hard");

easyBtn.addEventListener("click", function(){
	hardBtn.classList.remove("selected");
	easyBtn.classList.add("selected");
	numSqares = 3;
	colors = generateColors(numSqares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for (var i = 0; i < squares.length; i++) {
	if (colors[i]) {
	squares[i].style.backgroundColor = colors[i]
	} else{
		squares[i].style.display = "none";
	}
}});

hardBtn.addEventListener("click", function(){
	hardBtn.classList.add("selected");
	easyBtn.classList.remove("selected");
	numSqares = 6;
	colors = generateColors(numSqares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for (var i = 0; i < squares.length; i++) {
	squares[i].style.backgroundColor = colors[i]
	squares[i].style.display = "block";
	}
});


newGame.addEventListener("click", function() {
	colors = generateColors(numSqares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for (var i = 0; i < squares.length; i++) {
	squares[i].style.backgroundColor = colors[i]
}});

colorDisplay.textContent = pickedColor;

for (var i = 0; i < squares.length; i++) {
	squares[i].style.backgroundColor = colors[i]
	squares[i].addEventListener("click", function() {
	var clickedColor = this.style.backgroundColor;
	if (clickedColor == pickedColor) {
		msg.textContent = "You are right";
		newGame.textContent = "Play Again";
		display.style.backgroundColor = "#2ecc71";
		changeAll(pickedColor);
		right.play();
	}else{
		this.style.backgroundColor = "#ecf0f1";
		msg.textContent = "Its not right";
		display.style.backgroundColor = "#e74c3c";
		wrong.play();
	}
	});
};
function changeAll(color) {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}
function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}
function generateColors(num) {
	var arr = [];
	for (var i = 0; i < num; i++) {
	arr.push(randomColor())
	}
	return arr;
}

function randomColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb("+ r + ", "+ g + ", " + b + ")";
}