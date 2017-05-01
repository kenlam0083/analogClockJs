
/*
An analogClock js plug that written by native javascript (jQuery is not required but also campatiable). 
Writtern by kenlam0083
Base on MIT License
*/

function AnalogClockOption(width, foreColor, bgColor) {
	this.foreColor = foreColor ? foreColor : "#000";
	this.bgColor = bgColor ? bgColor : "#eee";
	this.width = width ? width : 400;
}

function AnalogClock(id, option) {

	var dateTimeFormat = function (time) {
		var str = "";
		str += time.getYear() + (time.getYear() > 1900 ? 0 : 1900) + "-";
		str += time.getMonth() + 1 + "-";
		str += time.getDate() + "<br/> ";
		str += time.getHours() + ":";
		str += time.getMinutes() + ":";
		str += time.getSeconds();
		return str;
	}

	if (!option)
		option = {};//avoid undefined exception
	this.foreColor = option.foreColor ? option.foreColor : "#000";//text color
	this.bgColor = option.bgColor ? option.bgColor : "#eee";
	this.width = option.width ? option.width : 400;

	this.container = document.getElementById(id);
	if (!this.container)
		return;
	this.container.style.fontcolor = this.foreColor;

	//the static part

	//the outer panel of the clock, including the background
	this.panel = document.createElement("div");//border-radius:50%;background-color:#eee;border:solid 1px #ccc;width:400px;height:400px;position:relative;
	this.panel.style.borderRadius = "50%";
	this.panel.style.backgroundColor = this.bgColor;
	this.panel.style.border = "solid 1px #ccc";
	this.panel.style.width = this.width + "px";
	this.panel.style.height = this.width + "px";
	this.panel.style.position = "relative";
	this.container.appendChild(this.panel);

	//the digital clock on the panel
	var label = document.createElement("h4");//width:80%;line-height:40px;text-align:center;margin-top:250px;color:#333;
	label.style.width = "100%";
	label.style.textAlign = "center";
	label.style.fontWeight = "normal";
	label.style.fontSize = this.width / 15 + "px";
	label.style.marginTop = this.width * 0.6 + "px";
	label.style.color = this.foreColor;
	label.innerHTML = dateTimeFormat(new Date());
	if (this.width >= 100)//hide if the width is not enough to show the digital clock
		this.panel.appendChild(label);

	//the container of hour numbers on the panel
	var ul = document.createElement("ul");//padding:0;margin:0;list-style:none;position:absolute;left:180px;            
	ul.style.height = "100%";

	ul.style.padding = "0";
	ul.style.margin = "0";
	ul.style.listStyle = "none";
	ul.style.position = "absolute";
	ul.style.width = 40 + "px";
	ul.style.top = 0;
	ul.style.left = this.width / 2 - 20 + "px";
	ul.style.color = this.foreColor;
	this.panel.appendChild(ul);

	//the list of hour numbers on the panel
	for (var i = 0; i <= 5; i++) {
		if (!localStorage)//if html5 not supported
			break;

		var list = document.createElement("li");//padding:0;margin:0; position: absolute; text-align:center;width:40px;height:400px;font-size:40px; 
		list.style.padding = "0";
		list.style.margin = "0";
		list.style.position = "absolute";
		list.style.textAlign = "center";
		list.style.width = "40px";
		list.style.height = this.width + "px";
		list.style.fontSize = this.width / 10 + "px";
		ul.appendChild(list);

		list.style.transform = "rotate(" + 360 / 12 * (i + 1) + "deg)";

		//a pair of numbers, such as  1 and 7, 3 and 9, etc.
		var numTop = document.createElement("div");//width:100%;position:absolute;text-align:center;
		numTop.style.width = "100%";
		numTop.style.position = "absolute";
		numTop.style.textAlign = "center";
		numTop.innerHTML = i + 1;
		if (this.width < 100)
			numTop.innerHTML = "●";
		list.appendChild(numTop);

		numTop.style.transform = "rotate(" + -360 / 12 * (i + 1) + "deg)";//recover the rotation

		var numBottom = document.createElement("div");//width:100%;position:absolute;text-align:center;
		numBottom.style.width = "100%";
		numBottom.style.position = "absolute";
		numBottom.style.textAlign = "center";
		numBottom.style.bottom = "0";
		numBottom.innerHTML = i + 7;
		if (this.width < 100)
			numBottom.innerHTML = "●";
		list.appendChild(numBottom);

		numBottom.style.transform = "rotate(" + -360 / 12 * (i + 1) + "deg)";//recover the rotation
	}

	//hour hand
	var hour = document.createElement("div");//width:8px;height:8px;left:196px;top:96px;border-top:solid 100px #ff6a00; border-bottom-width:100px;  
	var hourWidth = this.width * 0.02;
	var hourTop = this.width * 0.25 - (hourWidth * 0.5);
	var hourleft = this.width * 0.5 - hourWidth * 0.5;
	hour.style.width = hourWidth + "px";
	hour.style.height = hourWidth + "px";
	hour.style.position = "absolute";
	hour.style.border = "solid 0px transparent";
	hour.style.left = hourleft + "px";
	hour.style.top = hourTop + "px";
	hour.style.borderTop = "solid " + (this.width * 0.5 - hourTop) + "px #f60";
	hour.style.borderBottomWidth = (this.width * 0.5 - hourTop) + "px";
	if (localStorage) //only visible in HTML5 supported browser
		this.panel.appendChild(hour);

	//minute hand
	var min = document.createElement("div");//width:4px;height:4px;left:198px;top:48px;border-top:solid 150px #0094ff; border-bottom-width:150px;  
	var minWidth = this.width * 0.01;
	var minTop = this.width * 0.1 - (minWidth * 0.5);
	var minleft = this.width * 0.5 - minWidth * 0.5;
	min.style.width = minWidth + "px";
	min.style.height = minWidth + "px";
	min.style.position = "absolute";
	min.style.border = "solid 0px transparent";
	min.style.left = minleft + "px";
	min.style.top = minTop + "px";
	min.style.borderTop = "solid " + (this.width * 0.5 - minTop) + "px #09f";
	min.style.borderBottomWidth = (this.width * 0.5 - minTop) + "px";
	if (localStorage)
		this.panel.appendChild(min);

	//second hand
	var sec = document.createElement("div");//width:1px;height:1px;position:absolute;border:solid 0px transparent;left:199px;top:19px;border-top:solid 180px #333; border-bottom-width:180px;  
	var secWidth = 1;
	var secTop = this.width * 0.05;
	sec.style.width = secWidth + "px";
	sec.style.height = secWidth + "px";
	sec.style.position = "absolute";
	sec.style.border = "solid 0px transparent";
	sec.style.left = (this.width * 0.5 - secWidth) + "px";
	sec.style.top = secTop + "px";
	sec.style.borderTop = "solid " + (this.width * 0.5 - secTop) + "px " + this.foreColor;
	sec.style.borderBottomWidth = (this.width * 0.5 - secTop) + "px";
	if (localStorage)
		this.panel.appendChild(sec);

	//the center point
	var point = document.createElement("div");//content:"";background-color:#333;width:10px;height:10px;position:absolute;left:195px;top:195px;border-radius:50%; 
	var pointWidth = this.width * 0.05;
	point.style.width = pointWidth + "px";
	point.style.height = pointWidth + "px";
	point.style.position = "absolute";
	point.style.backgroundColor = this.foreColor;
	point.style.left = this.width * 0.5 - (pointWidth * 0.5) + "px";
	point.style.top = this.width * 0.5 - (pointWidth * 0.5) + "px";
	point.style.borderRadius = "50%";
	if (localStorage)
		this.panel.appendChild(point);


	//start the clock (the animation part)
	this.loop = setInterval(function () {
		var now = new Date();
		label.innerHTML = dateTimeFormat(now);

		var roS = 1.0 * 360 / 60 * now.getSeconds();
		var roM = 1.0 * 360 / 60 * now.getMinutes();
		var roH = 1.0 * 360 / 12 * (now.getHours() % 12) + 1.0 * 360 / 12 * (now.getMinutes() / 60);

		sec.style.transform = 'rotate(' + roS + 'deg)';
		min.style.transform = 'rotate(' + roM + 'deg)';
		hour.style.transform = 'rotate(' + roH + 'deg)';
	}, 1000);
}
