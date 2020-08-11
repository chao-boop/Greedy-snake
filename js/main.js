//bug:1.吃掉食物增加长度的时候新的div会先出现在初始位置 
//    2.蛇头拐弯时头先动问题 先按其中一个移动事件在按不向斥方向再按与第一个反方向可以触发反向移动事件的bug 比如触发顺序为上右下可以实现反向移动
// 建议：全局对象污染严重 数据重复问题   未结合面向对象的思想
// 可以模块化开发 或者函数式b编程
var main = document.getElementsByClassName('main');
var bugs = document.getElementById('bugs');
var first = document.getElementById('first');
var last = document.getElementById('last');
var dburrom = document.getElementById('button');
var up = document.getElementById('up');
var down = document.getElementById('down');
var dleft = document.getElementById('left');
var dright = document.getElementById('right');
var food = document.getElementById('food');
var dstop = document.getElementById('dstop');
var dto = document.getElementById('to');
var one = document.getElementById('one');
var oneone = document.getElementById('oneone');
var stopout = document.getElementById('stopout');
var two = document.getElementById('two');
var over = document.getElementById('over');
var non = document.getElementById('non');
var number = document.getElementById('number');
var numbe = document.getElementById('numbe');
var b = null; //定时器
var num = 0; //得分
var x = 0; //随机横坐标
var y = 0; //随机纵坐标
var c = bugs.children;
var fang = '';
var fduan = false;
var imge = ['../资源/西瓜.png', '../资源/香蕉.png', '../资源/苹果.png']
over.onclick = function() { //刷新事件
    location.reload(); //刷新界面

}
dstop.onclick = function() { //暂停事件
    fduan = false; //锁机制 为false时 移动事件不能触发
    clearInterval(b); //关闭当前定时器
    if (two.style.display != 'block') {
        stopout.style.display = 'block'; //暂停按钮显示
    }
}
stopout.onclick = function() { //点击界面图标继续

    dto.click();
}
dto.onclick = function() { //继续事件
    if (two.style.display != 'block') {
        fduan = true;
    }
    stopout.style.display = 'none';
    switch (fang) {
        case 'left':
            dleft.click();
            break;
        case 'right':
            dright.click();
            break;
        case 'top':
            up.click();
            break;
        case 'buttom':
            down.click();
            break;
    }
}

function ranom() { //随机产生坐标
    x = Math.floor(Math.random() * main[0].clientWidth) - 2;
    y = Math.floor(Math.random() * main[0].clientHeight) - 2;
    food.style.left = x + 'px';
    food.style.top = y + 'px';
    var i = Math.floor(Math.random() * 3);
    food.style.backgroundImage = 'url(' + imge[i] + ')';
}

function eat() { //判断食物被吃
    if (bugs.offsetLeft + first.offsetLeft <= food.offsetLeft + food.clientWidth && bugs.offsetLeft + first.offsetLeft >= food.offsetLeft && food.offsetTop + food.clientHeight >= bugs.offsetTop + first.offsetTop && bugs.offsetTop + first.offsetTop >= food.offsetTop) {
        ranom();
        var oDiv = document.createElement('div');
        bugs.insertBefore(oDiv, last);
        num++;
        number.innerText = num;
    }
    if (food.offsetLeft + food.clientWidth >= bugs.offsetLeft + first.offsetLeft + first.clientWidth && bugs.offsetLeft + first.offsetLeft + first.clientWidth >= food.offsetLeft && food.offsetTop + food.clientHeight >= bugs.offsetTop + first.offsetTop && bugs.offsetTop + first.offsetTop >= food.offsetTop) {
        ranom();
        var oDiv = document.createElement('div');
        bugs.insertBefore(oDiv, last);
        num++;
        number.innerText = num;
    }
    if (food.offsetLeft + food.clientWidth >= bugs.offsetLeft + first.offsetLeft + first.clientWidth && bugs.offsetLeft + first.offsetLeft + first.clientWidth >= food.offsetLeft && food.offsetTop + food.clientHeight >= bugs.offsetTop + first.offsetTop + first.clientHeight && bugs.offsetTop + first.offsetTop + first.clientHeight >= food.offsetTop) {
        ranom();
        var oDiv = document.createElement('div');
        bugs.insertBefore(oDiv, last);
        num++;
        number.innerText = num;
    }
    if (food.offsetLeft + food.clientWidth >= bugs.offsetLeft + first.offsetLeft && bugs.offsetLeft + first.offsetLeft >= food.offsetLeft && food.offsetTop + food.clientHeight >= bugs.offsetTop + first.offsetTop + first.clientHeight && bugs.offsetTop + first.offsetTop + first.clientHeight >= food.offsetTop) {
        ranom();
        var oDiv = document.createElement('div');
        bugs.insertBefore(oDiv, last);
        num++;
        number.innerText = num;
    }
}
oneone.onclick = function() { //点击开始按钮 虫子自动向右边移动
    fduan = true;
    one.style.display = 'none';

    non.style.display = 'block';
    ranom();
    clearInterval(b);
    dright.click();
}
dleft.onclick = function() { //向左移动
    if (fduan == true) {
        if (fang != 'right') {

            fang = 'left';
            clearInterval(b);
            first.style.transform = 'rotate(90deg)';
            b = setInterval(function() {
                eat();
                if (first.offsetLeft <= bugs.offsetLeft * -1) {
                    fduan = false;
                    numbe.innerText += num;
                    two.style.display = 'block';
                    clearInterval(b);
                    return false;
                }
                for (var i = c.length - 1; i > 0; i--) {
                    c[i].style.left = c[i - 1].offsetLeft + 'px';
                    c[i].style.top = c[i - 1].offsetTop + 'px';
                }
                first.style.left = first.offsetLeft - first.clientWidth + 'px';
            }, 250)
        }
    }
}
dright.onclick = function() { //向右移动
    if (fduan == true) {
        if (fang != 'left') {

            fang = 'right';
            clearInterval(b);
            first.style.transform = 'rotate(-90deg)';
            b = setInterval(function() {
                eat();
                if (bugs.offsetLeft + first.offsetLeft + first.clientWidth >= main[0].clientWidth) {
                    fduan = false;
                    numbe.innerText += num;
                    two.style.display = 'block';
                    clearInterval(b);
                    return false;
                }
                for (var i = c.length - 1; i > 0; i--) {
                    c[i].style.left = c[i - 1].offsetLeft + 'px';
                    c[i].style.top = c[i - 1].offsetTop + 'px';
                }
                first.style.left = first.offsetLeft + first.clientWidth + 'px';
            }, 250)
        }
    }
}
up.onclick = function() { //向上移动

    if (fduan == true) {
        if (fang != 'buttom') {

            fang = 'top';
            clearInterval(b);
            first.style.transform = 'rotate(180deg)';
            b = setInterval(function() {
                eat();
                if (first.offsetTop <= bugs.offsetTop * -1) {
                    fduan = false;
                    numbe.innerText += num;
                    two.style.display = 'block';
                    clearInterval(b);
                    return false;
                }
                for (var i = c.length - 1; i > 0; i--) {
                    c[i].style.left = c[i - 1].offsetLeft + 'px';
                    c[i].style.top = c[i - 1].offsetTop + 'px';
                }
                first.style.top = first.offsetTop - first.clientHeight + 'px';
            }, 250)
        }

    }
}
down.onclick = function() { //向下移动

    if (fduan == true) {
        if (fang != 'top') {

            fang = 'buttom';
            clearInterval(b);
            first.style.transform = 'rotate(0deg)';
            b = setInterval(function() {
                eat();
                if (bugs.offsetTop + first.offsetTop + first.clientHeight >= main[0].clientHeight) {
                    fduan = false;
                    numbe.innerText += num;
                    two.style.display = 'block';
                    clearInterval(b);
                    return false;
                }
                for (var i = c.length - 1; i > 0; i--) {
                    c[i].style.left = c[i - 1].offsetLeft + 'px';
                    c[i].style.top = c[i - 1].offsetTop + 'px';
                }
                first.style.top = first.offsetTop + first.clientHeight + 'px';
            }, 250)
        }
    }
}

window.onkeydown = function(e) {
    e.preventDefault();

    // console.log(e.code)
    switch (e.code) {
        case 'KeyA':
            dleft.click();

            break;
        case 'KeyD':
            dright.click();

            break;
        case 'KeyW':
            up.click();


            break;
        case 'KeyS':
            down.click();
            break;
        case 'ArrowLeft':
            dleft.click();

            break;
        case 'ArrowRight':
            dright.click();

            break;
        case 'ArrowUp':
            up.click();


            break;
        case 'ArrowDown':
            down.click();
            break;
        case 'Space':
            if (fduan == true) {
                dstop.click();

            } else { dto.click(); }
            break;
        case 'Enter':
            oneone.click();
            break;

    }
}