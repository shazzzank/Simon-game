colors = ['red', 'blue', 'green', 'yellow']
pattern = [];
userPattern = [];
started = false;
level = 0;


$('.btn').on('click', userClick);
$(document).on('keypress', keypress);

function randomColorArray() {
	number = Math.floor(Math.random() * 4);
    color = colors[number];
    pattern.push(color);
    return color;
}

function levelUp() {
    level++;
    $('h1').text('Level ' + level);
    console.log('current level is ' + level)
}

function playSound(name) {
    audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function flashCard(name) {
    $("#" + name).addClass("pressed");
    setTimeout(function() {
        $("#" + name).removeClass("pressed");
    }, 100);
}

function userClick() {
    userColor = this.id;
    userPattern.push(userColor);

    //flash card
    flashCard(userColor);
    console.log('flashed the user card for ' + userColor);
    //play sound
    playSound(userColor);
    console.log('played the user sound for ' + userColor);

    checkAnswer(userPattern.length - 1);
}

function checkAnswer(currentlevel) {
    if (userPattern[currentlevel] === pattern[currentlevel]) {
    	console.log('current pattern: ' + pattern + ', user pattern : ' + userPattern)
        if (userPattern.length === pattern.length) {
            setTimeout(automate, 1000);
        }
    } else {	$('h1').text('Game Over')
    			console.log('failure comparing user array with random sequence');
    			console.log('current pattern: ' + pattern + ', user pattern : ' + userPattern)
		}
}

function keypress() {
    if (!started) {
    	$('h1').text('Level ' + level);
        automate();
        started = true;
    }

}

function automate() {
    userPattern = [];

    levelUp();

    //flash card
    color = randomColorArray();
    flashCard(color);
    console.log('flashed the random card for ' + color)

    //play sound
    playSound(color);
    console.log('played the random sound for ' + color)

}