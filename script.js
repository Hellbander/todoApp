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

document.addEventListener( "DOMContentLoaded", innit );

function innit () {
	var submite = document.getElementById( 'add-button' );
	var data = {
		"1" : {
			"text": "Hello! Please add something:",
			"completed": "false"
		}
	}
	submite.addEventListener( "click", check.bind( this, data) );
	startingNote( data );
}

function deleteText ( listElement, evt ) {
	evt.preventDefault();
	listElement.remove();
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
	divFormText;
	
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
		var checkBox = liElement.querySelector('.checkBox');
		var btn = liElement.querySelector('button');
		var paragrph = liElement.querySelector('p');
		checkBox.addEventListener('change', function () {
			if (checkBox.checked) {
				liElement.querySelector('button').className = "delete-button";
				paragrph.className = "done";
				btn.addEventListener("click", deleteText.bind(this, liElement));
				data[id.toString()].completed = "true";
			} else {
				btn.className += " dispalay";
				paragrph.className = "";
				data[id.toString()].completed = "false";
			}
		});
	}
}

function check ( data, e ) {
	e.preventDefault();
	var text = document.getElementById('input-text').value;
	if (text !== "")
		save (text, "false")	
} 

function save ( msg, checked ) {
	var tempData = {
		"text": msg,
		"completed": checked
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
