let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
// general settings
let middleX = canvas.width / 2;
let middleY = canvas.height / 2;
let radius = canvas.width / 2 - canvas.width / 10;

// beginning and ending of our qrc. Sets by rad * pi
let startAngleIndex = 0.7;
let endAngleIndex = 2.3;

// zones settings
let zoneLineWidth = canvas.width / 30;
let counterClockWise = false;

// tick settings
let tickWidth = canvas.width / 100;
let tickColor = "#746845";
let tickOffsetFromArc = canvas.width / 40;

// Center circle settings
let centerCircleRadius = canvas.width / 20;
let centerCircleColor = "#f2ead9";
let centerCircleBorderWidth = canvas.width / 100;

// Arrow settings


let arrowValueIndexCorrect = 0.7 + db['raiting'] / 250;
let arrowColor = "#333333";
let arrowWidth = canvas.width / 50;

// Digits settings
let digits = [0, 100, 200, 300, 400];
let digitsColor = "#000";
let digitsFont = "bold 20px Tahoma";
let digitsOffsetFromArc = canvas.width / 12;

let zonesCount = digits.length - 1;
let step = (endAngleIndex - startAngleIndex) / zonesCount;



// methods for drawing canvas elem
let DrawZones = function () {
	let greenZonesCount = Math.ceil(zonesCount / 4);
	let yellowZonesCount = Math.ceil((zonesCount - greenZonesCount) / 4);
	let redZonesCount = zonesCount - greenZonesCount - yellowZonesCount;

	let startAngle = (startAngleIndex - 0.02) * Math.PI;
	let endGreenAngle = (startAngleIndex + greenZonesCount * step) * Math.PI;
	let endYellowAngle = (startAngleIndex + (greenZonesCount + yellowZonesCount) * step) * Math.PI;
	let endRedAngle = (endAngleIndex - 0.4) * Math.PI;
	let endblueAngle = (endAngleIndex + 0.02) * Math.PI;

	let sectionOptions = [{
			startAngle: startAngle,
			endAngle: endGreenAngle,
			color: "red"
		},
		{
			startAngle: endGreenAngle,
			endAngle: endYellowAngle,
			color: "yellow"
		},
		{
			startAngle: endYellowAngle,
			endAngle: endRedAngle,
			color: "#009900"
		},
		{
			startAngle: endRedAngle,
			endAngle: endblueAngle,
			color: "blue"
		}
	];

	this.DrawZone = function (options) {
		ctx.beginPath();
		ctx.arc(middleX, middleY, radius, options.startAngle, options.endAngle, counterClockWise);
		ctx.lineWidth = zoneLineWidth;
		ctx.strokeStyle = options.color;
		ctx.lineCap = "butt";
		ctx.stroke();
	};

	sectionOptions.forEach(function (options) {
		DrawZone(options);
	});
};
// method for tricks on speedometer
let DrawTicks = function () {

	this.DrawTick = function (angle) {
		let fromX = middleX + (radius - tickOffsetFromArc) * Math.cos(angle);
		let fromY = middleY + (radius - tickOffsetFromArc) * Math.sin(angle);
		let toX = middleX + (radius + tickOffsetFromArc) * Math.cos(angle);
		let toY = middleY + (radius + tickOffsetFromArc) * Math.sin(angle);

		ctx.beginPath();
		ctx.moveTo(fromX, fromY);
		ctx.lineTo(toX, toY);
		ctx.lineWidth = tickWidth;
		ctx.lineCap = "round";
		ctx.strokeStyle = tickColor;
		ctx.stroke();
	};

	for (let i = startAngleIndex; i <= endAngleIndex; i += step) {
		let angle = i * Math.PI;
		this.DrawTick(angle);
	}
};

// method for nambers on our speedometer
let DrawDigits = function () {
	let angleIndex = startAngleIndex;

	digits.forEach(function (digit) {
		let angle = angleIndex * Math.PI;
		angleIndex += step;
		let x = middleX + (radius - digitsOffsetFromArc) * Math.cos(angle);
		let y = middleY + (radius - digitsOffsetFromArc) * Math.sin(angle);

		ctx.font = digitsFont;
		ctx.fillStyle = digitsColor;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(digit, x, y);
	});
};

//method for drawing arrow on speedometer
let DrawArrow = function (arrowValueIndex) {
	let arrowAngle = arrowValueIndex * Math.PI;
	let toX = middleX + (radius) * Math.cos(arrowAngle);
	let toY = middleY + (radius) * Math.sin(arrowAngle);

	ctx.beginPath();

	ctx.moveTo(middleX, middleY);
	ctx.lineTo(toX, toY);
	ctx.strokeStyle = arrowColor;
	ctx.lineWidth = arrowWidth;

	ctx.stroke();

};

let DrawCenterCircle = function () {
	ctx.beginPath();
	ctx.arc(middleX, middleY, centerCircleRadius, 0, 2 * Math.PI, false);
	ctx.fillStyle = centerCircleColor;
	ctx.fill();
	ctx.lineWidth = centerCircleBorderWidth;
	ctx.strokeStyle = arrowColor;
	ctx.stroke();
};

//animation of speedometr value
function speedometr_animation() {
	let stop = db["raiting"];
	let start = 0;
	// document.getElementById("speed-value").innerHTML = stop;
	let raiting_value = setInterval(function () {
		document.getElementById("speed-value").innerHTML = start;
		start = raiting_up(start, stop);
		if (start === -1)
			clearInterval(raiting_value);

	}, 15);

	function raiting_up(value, stop) {
		up_arrow(value);
		if (value < stop)
			return value + 1;
		else
			return -1;
	};
};

function up_arrow(start) {
	raiting = start;
};
speedometr_animation();

//animation of speedometr
let raiting = 0;
let raitingCounter = 0;

function getRaiting() {
	raiting += 1;
	raitingCounter += 1;
	raiting = 0.7 + raiting / 250;
	if (raitingCounter - 1 === db['raiting'])
		return -1;
	else
		return raiting;
};

function startDrowing(Index) {
	DrawTicks();
	DrawZones();
	DrawDigits();
	DrawArrow(Index);
	DrawCenterCircle();
};

let drawA = setInterval(function () {
	let arrowIndex_value = getRaiting();

	if (arrowIndex_value !== -1) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		startDrowing(arrowIndex_value);
	} else {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		clearInterval(drawA);
		startDrowing(arrowValueIndexCorrect)
	}
}, 15);