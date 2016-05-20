document.addEventListener( "DOMContentLoaded", init );

function init () {
	var purple,
	yellow,
	blue,
	select,
	//submite,
	buttons,
	ulColors,
	liColors,
	mainDiv,
	header;
	
	//submite = document.getElementById( 'add-button' );
	select = document.getElementById( 'day-selector' );
	
	ulColors = document.getElementById('colors');
	liColors = ulColors.querySelectorAll ('.li-colors');
	
	purple = document.getElementById('purple');
	yellow = document.getElementById('yellow');
	blue = document.getElementById('blue');
	
	mainDiv = document.getElementById('main-div');
	header = document.getElementById('header');
	buttons = mainDiv.getElementsByTagName('button');
	
	purple.addEventListener( "click", changeColor.bind( this, purple, buttons, mainDiv, header, ulColors, liColors ) );
	yellow.addEventListener( "click", changeColor.bind( this, yellow, buttons, mainDiv, header, ulColors, liColors ) );
	blue.addEventListener( "click", changeColor.bind( this, blue, buttons, mainDiv, header, ulColors, liColors ) );
	select.addEventListener( "change", changeColorToButtonsAfterSelect.bind( this, liColors, buttons ) );
	//submite.addEventListener( "click", changeColorToButtonsAfterSelect.bind( this, liColors, buttons ) );
}

function changeColor ( color, buttons, mainDiv, header, ulColors, liColors ) {
	var divColors,
	colorId,
	mainHeader;

	mainHeader = document.getElementById('main-headder');
	colorId = color.id;
	for ( var i = 0; i <= liColors.length - 1; i++ ) {
		divColors = liColors[i].querySelector('.div-colors');
		if ( color.id !== divColors.id ) {
			divColors.className = "div-colors";
		} else {
			color.className = "div-colors active";
		}
	}
	switch(colorId) {
		case "purple":
			for ( var i = 0; i <= buttons.length - 1; i++ ) {
				buttons[i].style.backgroundColor = "#BF81D2";
			}
			header.style.backgroundColor = "#BF81D2";
			mainHeader.style.textShadow = "3px 3px 10px #FFFFFF"; 
			mainDiv.style.backgroundColor = "#DFB2EC";
			break;
		case "yellow":
			for ( var i = 0; i <= buttons.length - 1; i++ ) {
				buttons[i].style.backgroundColor = "#F7FE2E";
			}
			header.style.backgroundColor = "#F7FE2E";
			mainHeader.style.textShadow = "3px 3px 10px #FE9A2E"; 
			mainDiv.style.backgroundColor = "#F2F5A9";
			break;
		case "blue":
			for ( var i = 0; i <= buttons.length - 1; i++ ) {
				buttons[i].style.backgroundColor = "#5858FA";
			}
			header.style.backgroundColor = "#5858FA";
			mainHeader.style.textShadow = "3px 3px 10px #00FFFF"; 
			mainDiv.style.backgroundColor = "#A9A9F5";
			break;
	}
}

function changeColorToButtonsAfterSelect ( liColors, buttons ) {
	var activColor,
	divColors,
	color,
	colorId;
	
	for ( var i = 0; i <= liColors.length - 1; i++ ) {
		divColors = liColors[i].querySelector('.div-colors');
		if ( divColors.className === "div-colors active" )
			activColor = divColors;
	}
	colorId = activColor.id
	switch(colorId) {
		case "purple":
			color = "#BF81D2";
			break;
		case "yellow":
			color = "#F7FE2E";
			break;
		case "blue":
			color = "#5858FA";
			break;
	}
	for ( var i = 0; i <= buttons.length - 1; i++ ) {
		buttons[i].style.backgroundColor = color;
	}
}

function changeColorToButtonsAfterAdd ( liElement, buttons ) {
	var divColors,
	activColor,
	ulColors,
	liColors,
	color,
	colorId;
	
	ulColors = document.getElementById('colors');
	liColors = ulColors.querySelectorAll ('.li-colors');
	
	for ( var i = 0; i <= liColors.length - 1; i++ ) {
		divColors = liColors[i].querySelector('.div-colors');
		if ( divColors.className === "div-colors active" )
			activColor = divColors;
	}
	
	colorId = activColor.id;
	switch(colorId) {
		case "purple":
			color = "#BF81D2";
			break;
		case "yellow":
			color = "#F7FE2E";
			break;
		case "blue":
			color = "#5858FA";
			break;
	}
	buttons.style.backgroundColor = color;
}