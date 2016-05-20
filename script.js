/*
var my_JSON_object;
var url = "/data.json"; 
var send_my_JSON_object;
var http_request = new XMLHttpRequest();
http_request.open("GET", url, true);

http_request.send(null);

http_request.onreadystatechange = function () {
    var done = 4, ok = 200;
    if (http_request.readyState === done && http_request.status === ok) {
        my_JSON_object = JSON.parse(http_request.responseText);
        console.log(my_JSON_object);
    }
};

var sample = {
		"3" : {
		"text": "my first task3",
		"completed": "false"
	}
}
http_request.open("POST", url, sample, true);
http_request.send(null);
http_request.open("GET", url, true);
http_request.send(null);*/

/*var mydata = data;
console.log(mydata);
mydata["2"]["sss"] = "asd";
console.log(mydata);*/
var id = 1;
var myArray = [];
 
document.addEventListener( "DOMContentLoaded", innit );

function innit () {
	var data = {
		
	}	
	var submite = document.getElementById( 'add-button' ),
	select = document.getElementById( 'day-selector' );
	
	submite.addEventListener( "click", check.bind( this, data ) );
	select.addEventListener( "change", sortTextByDay.bind( this, data ) );
	//startingNote( data );
}

function sortTextByDay ( data ) {
	var day,
	ulElement,
	listText,
	btn,
	checkBox,
	paragraph;
	
	ulElement = document.getElementById("list-text");
	listText = ulElement.querySelectorAll('li')
	day = document.getElementById('day-selector').value;
	for ( var i = 0; i <= listText.length - 1; i++ ) {
		listText[i].remove();
	}
	if ( Object.keys(data).length !== 0 ) {
		if ( day === "All" ) {
			for ( var i = 0; i <= Object.keys(data).length -1; i++ ) {
				listText = addTextToNote( data, parseInt(Object.keys(data)[i]) );
				if ( data[parseInt(Object.keys(data)[i])].completed === "true" ) {
					btn = listText.querySelector('button');
					btn.className = "delete-button";
					listText.querySelector('p').className = "done";
					btn.addEventListener("click", deleteText.bind(this, listText, data) );
					checkBox = listText.querySelector('.checkBox');
					checkBox.checked = "true";
					changeColorToButtonsAfterAdd( listText, btn );
					
				}
			}
		} else{
			for ( var i = 0; i <= Object.keys(data).length -1; i++ ) {
				if ( data[parseInt(Object.keys(data)[i])].weekday === day ) {
					listText = addTextToNote( data, parseInt(Object.keys(data)[i]) );
					if ( data[parseInt(Object.keys(data)[i])].completed === "true" ) {
						btn = listText.querySelector('button');
						btn.className = "delete-button";
						listText.querySelector('p').className = "done";
						btn.addEventListener("click", deleteText.bind(this, listText, data) );
						checkBox = listText.querySelector('.checkBox');
						checkBox.checked = "true";
						changeColorToButtonsAfterAdd( listText, btn );
					}
				}
			}
		}
	}
}

function deleteText ( listElement, data, evt ) {
	evt.preventDefault();
	listElement.remove();
	delete data[listElement.id];
	if ( Object.keys(data).length === 0 )
			id = 1;
	for ( var i = 0; i <= myArray.length - 1; i++ ) {
			if ( myArray[i] === listElement.id )
					myArray.splice( i, 1 );
	}
}

function createFormButtons() {
	var formTemplate;
	
	formTemplate = "<form class='check-delete'>";
	formTemplate += "<input type='checkbox' class='checkBox'>";
	formTemplate += "<button class='delete-button dispalay' type='delete'>X</button>";
	formTemplate += "</form>";
	
	return formTemplate;
}

function createDivParagraph ( data , id ) {
	var divParagraphTemplate;
	
	divParagraphTemplate = "<div class='div-paragraph'>";
	divParagraphTemplate += "<p class=''>"+data[id].text+"</p>";
	divParagraphTemplate += "</div>";
	
	return divParagraphTemplate;
}

function addTextToNote ( data ,id ) {
	var listText = document.getElementById("list-text"),
	liElement = document.createElement('LI'),
	deleteAllBtn = document.getElementById("delete-all"),
	myData = data[id.toString()],
	divFormText,
	checkBox,
	btn,
	newLiElement,
	paragrph;
	
	divFormText = "<div class='div-for-text'>";
	divFormText += createDivParagraph( data, id );
	divFormText += createFormButtons();
	divFormText += "</div>";
	
	liElement.id = id;
	liElement.innerHTML = divFormText;
	
	listText.appendChild( liElement );
	newLiElement = document.getElementById(id);

	checkBox = newLiElement.querySelector('.checkBox');
	btn = newLiElement.querySelector('button');
	paragrph = newLiElement.querySelector('p');
	checkBox.addEventListener('change', function () {
		if (checkBox.checked) {
			newLiElement.querySelector('button').className = "delete-button";
			changeColorToButtonsAfterAdd( newLiElement, btn );
			paragrph.className = "done";
			btn.addEventListener("click", deleteText.bind(this, newLiElement, data) );
			myData.completed = "true";
			myArray.push( newLiElement.id );
		} else {
			btn.className += " dispalay";
			paragrph.className = "";
			myData.completed = "false";
			for ( var i = 0; i <= myArray.length - 1; i++ ) {
				if ( myArray[i] === newLiElement.id )
					myArray.splice( i, 1 );
			}
		}
		deleteAllBtn.addEventListener("click", function () {
			for ( var i = 0; i <= myArray.length - 1; i++ ) {
					newLiElement = document.getElementById(myArray[i]);
					newLiElement.remove();
					delete data[newLiElement.id];
			}
			myArray = [];
			if ( Object.keys(data).length === 0 )
				id = 1;
 		});
	});
	return newLiElement;
}

function check ( data, e ) {
	e.preventDefault();
	var text,
	day;
	
	day = document.getElementById('day-selector').value;
	text = document.getElementById('input-text').value;
	if ( text !== "" & day !== "All" )
		save ( text, "false", day, data )
	else if ( text === "" & day === "All" )
		alert('Please enter text and correct day');
	else if ( text === "" )
		alert('Please enter correct text');
	else if ( day === "All" )
		alert('Please enter correct day');
} 

function save ( msg, checked, day, data ) {
	var tempData = {
		"text": msg,
		"completed": checked,
		"weekday": day
   }
	
	data[id.toString()] = tempData;
	addTextToNote(data, id);
	id = id + 1;
	document.getElementById('input-text').value = "";
	
}

function startingNote( data ) {
	for ( var i = 1; i <= Object.keys(data).length; i++ ) {
		addTextToNote(data, id);
		id = id + 1;
	} 
}

