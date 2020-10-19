/*
// WASM Part
const go = new Go(); // Defined in wasm_exec.js
const WASM_URL = '../../common/test1.wasm';

var wasm;

if ('instantiateStreaming' in WebAssembly) {
	WebAssembly.instantiateStreaming(fetch(WASM_URL), go.importObject).then(function (obj) {
		wasm = obj.instance;
		go.run(wasm);
	})
} else {
	fetch(WASM_URL).then(resp =>
		resp.arrayBuffer()
	).then(bytes =>
		WebAssembly.instantiate(bytes, go.importObject).then(function (obj) {
			wasm = obj.instance;
			go.run(wasm);
		})
	)
}
*/

var canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");
/**
 * 屏幕鼠标坐标
 * @type {Object}
 */
var mouse = {
    x: undefined,
    y: undefined
}
/**
 * @param  {鼠标移动事件，回调函数，赋值给鼠标坐标}
 * @return {[type]}
 */
window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    // console.log(mouse);
});
/**
 * @param  {重新设置窗口大小，使canvas宽高自适应屏幕}
 * @return {[type]}
 */
window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //初始化canvas
    init();
})
//绘制圆的最大半径
var maxRadius = 40;
// var minRadius = 2;

//圆的颜色数组
var colorArray = [
    '#58D68D',
    '#E67F22',
    '#3598DB',
    '#E84C3D',
    '#9A59B5',
    '#27AE61',
    '#D25400',
    '#BEC3C7',
    '#297FB8'
]
/**
 * @param {x圆中心的x坐标}
 * @param {y圆中心的y坐标}
 * @param {dx圆运动的x偏移量}
 * @param {dy圆运动的y偏移量}
 * @param {radius圆的半径}
 * minRadius圆的最小半径
 * bg圆的背景颜色
 * draw绘制函数
 * update圆运动偏移
 */
function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.bg = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function () {
        ctx.beginPath();
        ctx.strokeStyle = "#777";
        ctx.fillStyle = this.bg;
        ctx.arc(this.x, this.y, this.radius, Math.PI / 180 * 0, Math.PI / 180 * 360, false);
        // ctx.stroke();
        ctx.fill();
    }
    this.update = function () {
        //圆触碰边界时反弹，偏移值为负
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        //刷新绘制时圆的偏移运动
        this.x += this.dx;
        this.y += this.dy;
        //鼠标半径50像素范围内的圆，它们的半径逐步增加到最大值
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
            //其他的所有圆半径减小到最小值
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }
        //根据更新的值进行绘制
        this.draw();

    }
}
//圆的对象数组
var circleArray = [];
/**
 * 初始化函数，制造800个随机坐标、偏移速度和半径的圆，加入到对象数组
 * @return {[type]}
 */
function init() {
    circleArray = []
    for (var i = 0; i < 40; i++) {
        var x = Math.random() * window.innerWidth;
        var y = Math.random() * window.innerHeight;
        var dx = (Math.random() - 0.5) * 2;
        var dy = (Math.random() - 0.5) * 2;
        var radius = Math.random() * 3 + 1;
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}
init();
/**
 * 动画函数
 * @return {[type]}
 */
function animate() {
    //更新前清楚画布
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    requestAnimationFrame(animate);
    //每个圆都调用update()方法
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }

}
animate();