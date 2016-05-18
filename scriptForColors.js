document.addEventListener( "DOMContentLoaded", innit );

function innit () {
	var purple,
	yellow,
	blue,
	buttons,
	mainDiv,
	header;
	
	purple = document.getElementById('purple');
	yellow = document.getElementById('yellow');
	blue = document.getElementById('blue');
	mainDiv = document.getElementById('main-div');
	header = document.getElementById('header');
	buttons = mainDiv.getElementsByTagName('button');
	
	purple.addEventListener( "click", changeColor.bind(this, purple, buttons, mainDiv, header) );
	yellow.addEventListener( "click", changeColor.bind(this, yellow, buttons, mainDiv, header) );
	blue.addEventListener( "click", changeColor.bind(this, blue, buttons, mainDiv, header) );
}

function changeColor ( color, buttons, mainDiv, header ) {
	var ulColors,
	liColors,
	divColors,
	colorId;

	colorId = color.id;
	ulColors = document.getElementById('colors');
	liColors = ulColors.querySelectorAll ('.li-colors');
	for ( var i = 0; i <= liColors.length - 1; i++ ) {
		divColors = liColors[i].querySelector('.div-colors');
		if ( color.id !== divColors.id ) {
			divColors.style.width = 20 + "px";
			divColors.style.height = 20 + "px";	
			divColors.style.borderWidth = 1 + "px";
		} else {
			color.style.width = 25 + "px";
			color.style.height = 25 + "px";
			color.style.borderWidth = 2 + "px";
		}
	}
	switch(colorId) {
		case "purple":
			buttons[0].style.backgroundColor = "#BF81D2";
			buttons[1].style.backgroundColor = "#BF81D2";
			header.style.backgroundColor = "#BF81D2";
			mainDiv.style.backgroundColor = "#DFB2EC";
			break;
		case "yellow":
			buttons[0].style.backgroundColor = "#F7FE2E";
			buttons[1].style.backgroundColor = "#F7FE2E";
			header.style.backgroundColor = "#F7FE2E";
			mainDiv.style.backgroundColor = "#F2F5A9";
			break;
		case "blue":
			buttons[0].style.backgroundColor = "#5858FA";
			buttons[1].style.backgroundColor = "#5858FA";
			header.style.backgroundColor = "#5858FA";
			mainDiv.style.backgroundColor = "#A9A9F5";
			break;
	}
}