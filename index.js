let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.strokeStyle = "#000";

//画笔颜色和样式
let colorButton = document.getElementById("primary_color");
let colorDiv = document.getElementById("color_val");
let eraser = document.getElementById("eraser");
let clear = document.getElementById("clear");
let fontSize=document.getElementById("selectFontSize");

colorButton.addEventListener('click',() =>{
    colorDiv.innerHTML = colorButton.value;
    colorDiv.style.color = colorButton.value;
    ctx.strokeStyle = colorButton.value;
})

fontSize.addEventListener('click',() =>{
    ctx.lineWidth = fontSize.value;
})

eraser.addEventListener('click',() =>{
    ctx.strokeStyle = "rgba(255,255,255,1)";
    ctx.lineWidth = 30;
})

clear.addEventListener('click',() =>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})


canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

let painting = false;

ctx.lineWidth = 2;
ctx.lineCap = "round";
let last = [];
if ("ontouchstart" in window) {
    //移动端
    canvas.addEventListener('touchstart',(e) => {
        painting = true;
        last = [e.touches[0].clientX, e.touches[0].clientY - 50];
    })

    canvas.addEventListener('touchmove',(e) => {
        if (painting) {
            drawLine(
                last[0],
                last[1],
                e.touches[0].clientX,
                e.touches[0].clientY - 50
            );
            last = [e.touches[0].clientX, e.touches[0].clientY - 50];
        }
    })
    canvas.addEventListener('touchend',() => {
        painting = false;
    })

    document.body.addEventListener(
        "touchmove",
        function (e) {
            e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
        },
        { passive: false } //passive 参数不能省略，用来兼容ios和android
    );
} else {
    //pc端
    canvas.addEventListener('mousedown',(e) => {
        console.log(e);
        painting = true;
        last = [e.clientX, e.clientY - 50];
    })

    canvas.addEventListener('mousemove',(e) => {
        if (painting === true) {
            drawLine(last[0], last[1], e.clientX, e.clientY - 50);
            last = [e.clientX, e.clientY - 50];
        }
    })

    canvas.addEventListener('mouseup',() => {
        painting = false;
    })
}

//画线函数
function drawLine(x, y, x1, y1) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.stroke();
}

//下载图片
let download=document.getElementById('download');
download.addEventListener("click", ()=> {
    let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    let a=document.createElement('a');
    a.download="myPainting.png"
    a.href=image;
    a.click()
}, false);
