//rgb for the picked color
var pickedR = 0; 
var pickedG = 0; 
var pickedB = 0; 


//offsets to find similar colors to the picked color
var easyOffset = generateRange(-20, 5).concat(generateRange(20, 5));
var mediumOffset = generateRange(-10, 5).concat(generateRange(10, 5));
var hardOffset = generateRange(-5, 2).concat(generateRange(5, 2));


//set starting level
var level = easyOffset; 


//array of colors for the answer squares
var colors = []


//query selectors for the game component
var questionSquare = document.querySelector("#questionContainer .square"); 
var answerSquares = document.querySelectorAll("#answerContainer .square");
var gameContainer = document.querySelector(".gameContainer"); 
var startButton = document.querySelector(".startButton")
var playButton = document.querySelector(".playButton")
var gameOverContainer = document.querySelector("#gameOverContainer"); 
var body = document.querySelector("body"); 


//generate a random color
var pickedColor = randomColor();


// //message to say "congrats" or "sorry"
// var messageDisplay = document.querySelector("#message"); 

//query selectors for the display and message components 
var timerDisplay = document.querySelector("#timer"); 
var scoreDisplay = document.querySelector("#score"); 
var roundDisplay = document.querySelector("#round"); 
var lifeDisplay = document.querySelector("#life");
var squareMessage = document.querySelector(".squareMessage")
var scoreMessage = document.querySelector("#scoreMessage")
var totalScore = document.querySelector("#totalScore")


//set starting game metric
var time = 10; 
var score = 0; 
var round = 1; 
var life = 3; 
var countDown = 0;


//set display and message
timerDisplay.textContent = time.toString(); 
scoreDisplay.textContent = score.toString(); 
roundDisplay.textContent = round.toString(); 
lifeDisplay.textContent = life.toString();


//hide the game components 
gameContainer.style.display = "none";
gameOverContainer.style.display = "none"; 


//play again button
playButton.addEventListener("click", function() { 
	playButton.style.display = "none";
	startNew();
})


//start game button
startButton.addEventListener("click", function() {
	startButton.style.display = "none"; 
	startNew(); 
})



//start a new game
function startNew(){
	clearInterval(countDown); 
	colors = []
	time = 10; 
	score = 0; 
	round = 1; 
	life = 3;
	gameContainer.style.display = "initial";
	gameOverContainer.style.display = "none"; 
	timerDisplay.textContent = time.toString(); 
	scoreDisplay.textContent = score.toString(); 
	roundDisplay.textContent = round.toString(); 
	lifeDisplay.textContent = life.toString();
	for(var i = 0; i < answerSquares.length; i++){
		answerSquares[i].classList.add("pointer"); 
		answerSquares[i].classList.remove("squareFade");

	}
 
	
	pickedColor = randomColor();
	questionSquare.style.background = pickedColor;
	colors.push(pickedColor); 

	for(var i = 0; i < answerSquares.length -1; i++){
			colors.push(similarColor()); 
		}

	shuffle(colors); 

	countDown = setInterval(timer, 1000);

	for(var i = 0; i < answerSquares.length; i++){
	answerSquares[i].style.background = colors[i];
	answerSquares[i].classList.add("pointer"); 
	answerSquares[i].firstElementChild.style.display = "none";
	answerSquares[i].firstElementChild.textContent = "Wrong";

}
}


//game function for each round
for(var i = 0; i < answerSquares.length; i++){
	answerSquares[i].addEventListener("click", function() {

		var clickedColor = this.style.background;

		if(clickedColor === pickedColor){
			this.firstElementChild.textContent = "Correct"; 
			this.classList.add("squareFade");
			this.firstElementChild.style.display = "initial";
			for(var i = 0; i < answerSquares.length; i++){
				answerSquares[i].classList.add("squareFade");
				console.log("squarefad");  
			}
			scoreMessage.style.display = "initial";  
			score = score + 10;
			scoreDisplay.textContent = score.toString();
			setTimeout(reset, 500); 
		}
		else {
			this.classList.add("squareFade"); 
			this.firstElementChild.style.display = "initial"; 
			this.classList.remove("pointer"); 
			life = life -1; 
			lifeDisplay.textContent = life.toString();
			if(life <= 0){
				gameOver(); 
			}
		}
	})
} 











//reset function
function reset() {
	clearInterval(countDown); 
	round++; 
	colors = []
	if (round >= 5) {
		level = mediumOffset; 
	}
	if (round >= 10) {
		level = hardOffset; 
	}
	
	roundDisplay.textContent = round.toString();
	scoreMessage.style.display = "none"; 

	pickedColor = randomColor();
	questionSquare.style.background = pickedColor;
	colors.push(pickedColor); 

	for(var i = 0; i < answerSquares.length -1; i++){
			colors.push(similarColor()); 
	}

	shuffle(colors); 

	for(var i = 0; i < answerSquares.length; i++){
			answerSquares[i].style.background = colors[i];
			answerSquares[i].classList.add("pointer"); 
			answerSquares[i].classList.remove("squareFade");
			answerSquares[i].firstElementChild.style.display = "none";
			answerSquares[i].firstElementChild.textContent = "Wrong";
	}
	time = 10; 
	timerDisplay.textContent = time.toString();
	countDown = setInterval(timer, 1000);
}


function gameOver(){
	clearInterval(countDown);  
	gameContainer.style.display = "none"; 
	gameOverContainer.style.display = "flex"; 
	playButton.style.display = "block"; 
	totalScore.textContent = score; 
}



// shuffle function to shuffle the color array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


//timer function
function timer() {
	time = time - 1;
	if (time === 0) {
		timerDisplay.textContent = time.toString();
		life = life -1;
		lifeDisplay.textContent = life.toString();
		if(life === 0){
				gameOver();}
		else {
		reset();}
	}
	else {
		timerDisplay.textContent = time.toString(); 
	}
}



//generate a random color
function randomColor() {
	//pick red
	pickedR = Math.floor(Math.random() * 256);
	//pick green
	pickedG = Math.floor(Math.random() * 256);
	//pick blue
	pickedB = Math.floor(Math.random() * 256);
	return "rgb(" + pickedR + ", " + pickedG + ", " + pickedB + ")";  
}


//generate a positive and negative range based on a number
function generateRange(num, x){
	var arr = []; 
	for(var i = num - x; i <= num + x; i++){
		arr.push(i); 
	}
	return arr; 
}


//generate smiliar colors based on a given number
function similarColor() {
	var r = pickedR +  level[Math.floor(Math.random() * level.length)]; 
	var g = pickedG +  level[Math.floor(Math.random() * level.length)];
	var b = pickedB +  level[Math.floor(Math.random() * level.length)];
	return "rgb(" + r + ", " + g + ", " + b + ")"
}

   