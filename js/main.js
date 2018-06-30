var can1;
var can2;

var ctx1;
var ctx2;

var canWidth;
var canHeight;

var lastTime;//上一帧的执行时间
var deltaTime;//两帧间隔的时间差

var bgPic = new Image();

var ane;
var fruit;

var mom;
var baby;

var mx;//定义关于鼠标的变量
var my;

var babyTail = [];
var babyEye = [];
var babyBody = [];

var momTail = [];
var momEye = [];
var momBodyOra = [];
var momBodyBlue = [];

var data;

var wave;//白色的圈
var halo;

var dust;
var dustPic = [];

document.body.onload = game;
function game(){
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop();
}

function init(){
	//获得canvas context
	can1 = document.getElementById("canvas1");//fishes,dust,UI,circle
	ctx1 = can1.getContext('2d');//获得2d场景
	can2 = document.getElementById("canvas2");//background,ane,fruits
	ctx2 = can2.getContext('2d');

	can1.addEventListener('mousemove', onMouseMove, false);

	bgPic.src = "./src/background.jpg";

	canWidth = can1.width;
	canHeight = can1.height;

	ane = new aneObj();
	ane.init();//初始化

	fruit = new fruitObj();
	fruit.init();

	mom = new momObj();
	mom.init();

	baby = new babyObj();
	baby.init();

	mx = canWidth * 0.5;
	my = canHeight * 0.5;

	for(var i = 0; i < 8; i++){
		babyTail[i] = new Image();
		babyTail[i].src = "./src/babyTail" + i + ".png";
	}

	for(var i = 0; i < 2; i++){
		babyEye[i] = new Image();
		babyEye[i].src = "./src/babyEye" + i + ".png";
	}
	for(var i = 0; i < 20; i++){
		babyBody[i] = new Image();
		babyBody[i].src = "./src/babyFade" + i + ".png";
	}

	for(var i = 0; i < 8; i++){
		momTail[i] = new Image();
		momTail[i].src = "./src/bigTail" + i + ".png";
	}
	for(var i = 0; i < 2; i++){
		momEye[i] = new Image();
		momEye[i].src = "./src/bigEye" + i + ".png";
	}
	data = new dataObj();
	for(var i = 0; i < 8; i++){
		momBodyOra[i] = new Image();
		momBodyBlue[i] = new Image();
		momBodyOra[i].src = "./src/bigSwim" + i + ".png";
		momBodyBlue[i].src = "./src/bigSwimBlue" + i + ".png";
	}
	ctx1.font = "30px Verdana";
	ctx1.textAlign = "center";

	wave = new waveObj();
	wave.init();

	halo = new haloObj();
	halo.init();

	for(var i = 0; i < 7; i++){
		dustPic[i] = new Image();
		dustPic[i].src = "./src/dust" + i + ".png";
	}

	dust = new dustObj();
	dust.init();


}
function gameloop(){
	window.requestAnimFrame(gameloop);//setInterval,setTimeout,frame per second
	//requestAnimFrame是一个相较setInterval和setTimeout比较科学的api，setInterval。
	//requestAnimFrame是当前绘制完成之后，会根据你机器的性能来确定间隔多长时间来绘制下一帧。
	//setInterval,setTimeout是给定一个时间。
	//requestAnimFrame需要在不同的浏览器中进行配试。（commonFunctions）
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;
	if(deltaTime > 40){
		deltaTime = 40;
	}

	drawBackground();
	ane.draw();
	fruitMonitor();
	fruit.draw();

	ctx1.clearRect(0, 0, canWidth, canHeight);
	mom.draw();
	baby.draw();
	momFruitsCollision();
	momBabyCollision();

	data.draw();
	wave.draw();
	halo.draw();
	dust.draw();
}
function onMouseMove(e){
	if(!data.gameOver){
		if(e.offSetX || e.layerX){//获取鼠标坐标
			mx = e.offSetX == undefined ? e.layerX : e.offSetX;
			my = e.offSetY == undefined ? e.layerY : e.offSetY;
		}
	}
}