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
		"1" : {
			"text": "Hello! Please add something:",
			"completed": "false"
		}
	}	
	var submite = document.getElementById( 'add-button' ),
	select = document.getElementById( 'day-selector' );
	
	submite.addEventListener( "click", check.bind( this, data ) );
	select.addEventListener( "change", sortTextByDay.bind( this, data ) );
	startingNote( data );
}

function sortTextByDay () {
	var day,
	ulElement,
	listText;
	
	ulElement = document.getElementById("list-text");
	listText = ulElement.querySelectorAll('li')
	day = document.getElementById('day-selector').value;
	for ( var i = 0; i <= listText.length - 1; i++ ) {
		listText[i].remove();
	}
	
	if ( day === "All" ) {
		for ( var i = 1; i <= Object.keys(data).length; i++ ) {
			addTextToNote(data, i);
		}
	} else{
		for ( var i = 1; i <= Object.keys(data).length; i++ ) {
			if (data[i.toString()].weekday === day)
				addTextToNote(data, i);
		}
	}
}

function deleteText ( listElement, data, evt ) {
	evt.preventDefault();
	listElement.remove();
	delete data[listElement.id];
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
	divParagraphTemplate += "<p class=''>"+data[id.toString()].text+"</p>";
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
	paragrph;
	
	divFormText = "<div class='div-for-text'>";
	divFormText += createDivParagraph( data, id );
	if (id>1)
		divFormText += createFormButtons();
	divFormText += "</div>";
	
	liElement.id = id;
	liElement.innerHTML = divFormText;
	
	listText.appendChild(liElement);
	liElement = document.getElementById(id);
	if (id>1){
		checkBox = liElement.querySelector('.checkBox');
		btn = liElement.querySelector('button');
		paragrph = liElement.querySelector('p');
		checkBox.addEventListener('change', function () {
			if (checkBox.checked) {
				liElement.querySelector('button').className = "delete-button";
				paragrph.className = "done";
				btn.addEventListener("click", deleteText.bind(this, liElement, data) );
				myData.completed = "true";
				myArray.push( liElement.id );
			} else {
				btn.className += " dispalay";
				paragrph.className = "";
				myData.completed = "false";
				for ( var i = 0; i <= myArray.length - 1; i++ ) {
					if ( myArray[i] === liElement.id )
						myArray.splice( i, 1 );
				}
			}
			deleteAllBtn.addEventListener("click", function () {
				for ( var i = 0; i <= myArray.length - 1; i++ ) {
						liElement = document.getElementById(myArray[i]);
						liElement.remove();
						delete data[liElement.id];
				}
				myArray = [];
			});
		});
	}
}

function check ( data, e ) {
	e.preventDefault();
	var text,
	day;
	
	day = document.getElementById('day-selector').value;
	text = document.getElementById('input-text').value;
	if ( text !== "" & day !== "All" )
		save ( text, "false", day )
	else if ( text === "" & day === "All" )
		alert('Please enter text and correct day');
	else if ( text === "" )
		alert('Please enter correct text');
	else if ( day === "All" )
		alert('Please enter correct day');
} 

function save ( msg, checked, day ) {
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

