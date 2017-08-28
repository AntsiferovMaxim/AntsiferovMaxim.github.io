window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(callback, element){
            window.setTimeout(callback, 1000 / 60);
        };
})();

var c = document.getElementById("c");
var ctx = c.getContext("2d");

var ww = document.documentElement.clientWidth;
var wh = document.documentElement.clientHeight;
var ow = 1920;
var oh = 4670;
var w = ww, h = (ww / ow) * oh;
c.width = w;
c.height = h;

var caramel_img = null;
var caramel = document.createElement("img");
caramel.onload = function() {
	caramel_img = this;
};
caramel.src = "caramel.png";

function drawPoint(x, y, r) {
	ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}

function drawShadow(p) {

	ctx.globalCompositeOperation="destination-over";
	ctx.translate(10,0);

	//ctx.filter = 'drop-shadow(10px 0 20px rgba(0,0,0,0.5)';//"blur(10px)";

	ctx.fillStyle = "rgba(0,0,0,0.5)";

	var ratio = w / ow;

	var cpostop = cpos.top / ratio;

	var len = p * bezier_r[bezier_r.length-1].l;

	var bbl = 0, bbr = 0;

	var r45 = 4300;
	var r10 = 100;

	if (cpostop < -500) {
		cpostop = -cpostop;

		if (cpostop > r45) cpostop = r45;
		if (cpostop > r10) cpostop -= r10;

		var cur_b_p = 0;
		var nextPoint = bezier_r[cur_b_p];

		while (bezier_r[cur_b_p + 2] && bezier_r[cur_b_p + 2].points[5] < cpostop) cur_b_p++;

		nextPoint = bezier_r[cur_b_p];
		bbr = cur_b_p;

		var cur_b_pl = 0;
		var nextPointl = bezier_l[cur_b_pl];

		while (bezier_l[cur_b_pl + 2] && bezier_l[cur_b_pl + 2].points[5] < cpostop) cur_b_pl++;

		nextPointl = bezier_l[cur_b_pl];
		bbl = cur_b_pl;

		if (bbr && bbl) {

			ctx.beginPath();
			ctx.moveTo(nextPointl.points[4], nextPointl.points[5]);
			ctx.lineTo(nextPoint.points[4], nextPoint.points[5]);
		} else {
			ctx.beginPath();
			ctx.moveTo(lmx, lmy);
			ctx.lineTo(rmx, rmy);
		}

		cur_b_p++;
		var nextPoint = bezier_r[cur_b_p];
		while (nextPoint.l < len) {
			ctx.bezierCurveTo(nextPoint.points[0],nextPoint.points[1],nextPoint.points[2],nextPoint.points[3],nextPoint.points[4],nextPoint.points[5]);
			
			cur_b_p++;
			nextPoint = bezier_r[cur_b_p];
			
			if (!nextPoint) {
				break;
			}
		}

	} else {
		
		cpostop = 0;

		ctx.beginPath();
		ctx.moveTo(lmx, lmy);
		ctx.lineTo(rmx, rmy);

		
		var cur_b_p = 0;
		var nextPoint = bezier_r[cur_b_p];
		while (nextPoint.l < len) {
			ctx.bezierCurveTo(nextPoint.points[0],nextPoint.points[1],nextPoint.points[2],nextPoint.points[3],nextPoint.points[4],nextPoint.points[5]);
			
			cur_b_p++;
			nextPoint = bezier_r[cur_b_p];
			
			if (!nextPoint) {
				break;
			}
		}

	}

	var cur_len = 0;
	if (cur_b_p > 0) cur_len = bezier_r[cur_b_p-1].l;

	var next_point_i = Math.floor(cur_len / 3) + 1;
	var next_point = points[next_point_i];

	while (next_point.l < len) {
		ctx.lineTo(next_point.xr, next_point.yr);
		cur_len = next_point.l;
		next_point_i++;
		next_point = points[next_point_i];
	}

	var cx = 0, cy = 0, r = 0;

	var cir;
	var bbb;

	if (next_point.l == len) {
		ctx.lineTo(next_point.xr, next_point.yr);
		bbb = new Vec(next_point.xr, next_point.yr);
		//ctx.lineTo(next_point.xl, next_point.yl);

		cir = new Vec(next_point.xl - next_point.xr, next_point.yl - next_point.yr);

		var cir1 = clone(cir).rotate(-90).mult(0.6);

		ctx.bezierCurveTo(bbb.x + cir1.x, bbb.y + cir1.y, bbb.x + cir1.x  + cir.x, bbb.y + cir1.y + cir.y, bbb.x + cir.x, bbb.y + cir.y);
		//ctx.lineTo(bbb.x + cir1.x, bbb.y + cir1.y);
		//ctx.lineTo(bbb.x + cir.x, bbb.y + cir.y);

		cx = next_point.cx;
		cy = next_point.cy;
		r = next_point.r;
	} else {
		var pp = (len - points[next_point_i-1].l) / (points[next_point_i].l - points[next_point_i-1].l);
		
		var begin = new Vec(points[next_point_i-1].xr, points[next_point_i-1].yr);
		var delta = new Vec(points[next_point_i].xr, points[next_point_i].yr);
		delta.sub(begin).mult(pp);
		begin.add(delta);
		ctx.lineTo(begin.x, begin.y);

		var bb = new Vec(begin.x, begin.y);
		bbb = new Vec(begin.x, begin.y);

		cir = new Vec(begin.x, begin.y);

		begin = new Vec(points[next_point_i-1].xl, points[next_point_i-1].yl);
		delta = new Vec(points[next_point_i].xl, points[next_point_i].yl);
		delta.sub(begin).mult(pp);
		begin.add(delta);
		//ctx.lineTo(begin.x, begin.y);

		cir = new Vec(begin.x, begin.y).sub(cir);

		var cir1 = clone(cir).rotate(-90).mult(0.6);

		ctx.bezierCurveTo(bbb.x + cir1.x, bbb.y + cir1.y, bbb.x + cir1.x  + cir.x, bbb.y + cir1.y + cir.y, bbb.x + cir.x, bbb.y + cir.y);

		var ee = new Vec(begin.x, begin.y).sub(bb).mult(0.5);
		bb.add(ee);

		next_point_i--;
		ctx.lineTo(points[next_point_i].xl, points[next_point_i].yl);

		cx = bb.x;
		cy = bb.y;
		r = next_point.r;
	}

	next_point_i--;
	while (next_point_i > 0) {
		ctx.lineTo(points[next_point_i].xl, points[next_point_i].yl);
		if (points[next_point_i].yl < cpostop) break;
		next_point_i--;
	}

	ctx.fill();
	ctx.strokeStyle = "rgba(0,0,0,0.2)";
	ctx.lineWidth = 20;
	ctx.stroke();

}

var cpos = {top:c.getBoundingClientRect().top};

var old_p = 0;

var old_postop = 0;


function draw(p) {
	old_p = p;

	ww = document.documentElement.clientWidth;
	wh = document.documentElement.clientHeight;
	w = ww;
	var ratio = w / ow;
	h = oh * ratio;

	c.width = w;
	c.height = h;

	ctx.globalCompositeOperation="source-over";
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0,0,w,h);
	ctx.scale(ratio, ratio);

	ctx.fillStyle = "#000";

	old_postop = cpos.top;
	var cpostop = cpos.top / ratio;

	var len = p * bezier_r[bezier_r.length-1].l;

	var bbl = 0, bbr = 0;

	var r45 = 4300;
	var r10 = 100;

	if (cpostop < 0) {
		cpostop = -cpostop;

		if (cpostop > r45) cpostop = r45;
		if (cpostop > r10) cpostop -= r10;

		var cur_b_p = 0;
		var nextPoint = bezier_r[cur_b_p];

		while (bezier_r[cur_b_p + 2] && bezier_r[cur_b_p + 2].points[5] < cpostop) cur_b_p++;

		nextPoint = bezier_r[cur_b_p];
		bbr = cur_b_p;

		var cur_b_pl = 0;
		var nextPointl = bezier_l[cur_b_pl];

		while (bezier_l[cur_b_pl + 2] && bezier_l[cur_b_pl + 2].points[5] < cpostop) cur_b_pl++;

		nextPointl = bezier_l[cur_b_pl];
		bbl = cur_b_pl;

		if (bbr && bbl) {

			ctx.beginPath();
			ctx.moveTo(nextPointl.points[4], nextPointl.points[5]);
			ctx.lineTo(nextPoint.points[4], nextPoint.points[5]);
		} else {
			ctx.beginPath();
			ctx.moveTo(lmx, lmy);
			ctx.lineTo(rmx, rmy);
		}

		cur_b_p++;
		var nextPoint = bezier_r[cur_b_p];
		while (nextPoint.l < len) {
			ctx.bezierCurveTo(nextPoint.points[0],nextPoint.points[1],nextPoint.points[2],nextPoint.points[3],nextPoint.points[4],nextPoint.points[5]);
			
			cur_b_p++;
			nextPoint = bezier_r[cur_b_p];
			
			if (!nextPoint) {
				break;
			}
		}

	} else {
		
		cpostop = 0;

		ctx.beginPath();
		ctx.moveTo(lmx, lmy);
		ctx.lineTo(rmx, rmy);

		
		var cur_b_p = 0;
		var nextPoint = bezier_r[cur_b_p];
		while (nextPoint.l < len) {
			ctx.bezierCurveTo(nextPoint.points[0],nextPoint.points[1],nextPoint.points[2],nextPoint.points[3],nextPoint.points[4],nextPoint.points[5]);
			
			cur_b_p++;
			nextPoint = bezier_r[cur_b_p];
			
			if (!nextPoint) {
				break;
			}
		}

	}

	var cur_len = 0;
	if (cur_b_p > 0) cur_len = bezier_r[cur_b_p-1].l;

	var next_point_i = Math.floor(cur_len / 3) + 1;
	var next_point = points[next_point_i];

	while (next_point.l < len) {
		ctx.lineTo(next_point.xr, next_point.yr);
		cur_len = next_point.l;
		next_point_i++;
		next_point = points[next_point_i];
	}

	var cx = 0, cy = 0, r = 0;

	if (next_point.l == len) {
		ctx.lineTo(next_point.xr, next_point.yr);
		ctx.lineTo(next_point.xl, next_point.yl);

		cx = next_point.cx;
		cy = next_point.cy;
		r = next_point.r;
	} else {
		var pp = (len - points[next_point_i-1].l) / (points[next_point_i].l - points[next_point_i-1].l);
		
		var begin = new Vec(points[next_point_i-1].xr, points[next_point_i-1].yr);
		var delta = new Vec(points[next_point_i].xr, points[next_point_i].yr);
		delta.sub(begin).mult(pp);
		begin.add(delta);
		ctx.lineTo(begin.x, begin.y);

		var bb = new Vec(begin.x, begin.y);

		begin = new Vec(points[next_point_i-1].xl, points[next_point_i-1].yl);
		delta = new Vec(points[next_point_i].xl, points[next_point_i].yl);
		delta.sub(begin).mult(pp);
		begin.add(delta);
		ctx.lineTo(begin.x, begin.y);

		var ee = new Vec(begin.x, begin.y).sub(bb).mult(0.5);
		bb.add(ee);

		next_point_i--;
		ctx.lineTo(points[next_point_i].xl, points[next_point_i].yl);

		cx = bb.x;
		cy = bb.y;
		r = next_point.r;
	}

	next_point_i--;
	while (next_point_i > 0) {
		ctx.lineTo(points[next_point_i].xl, points[next_point_i].yl);
		if (points[next_point_i].yl < cpostop) break;
		next_point_i--;
	}

	ctx.fill();
	drawPoint(cx,cy,r);

	ctx.globalCompositeOperation="source-in";
	
		
		
			/*var xx = 550;
			var yy = cpostop;
			var ww1 = ww / ratio - 550;
			var wh1 = wh / ratio + r10;
			ctx.drawImage(caramel_img,xx,yy,ww1,wh1,xx,yy,ww1,wh1);*/
			ctx.drawImage(caramel_img,0,0);
		

	drawShadow(p);
}

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(callback, element){
            window.setTimeout(callback, 1000 / 30);
        };
})();

var next_p = 0;
var cur_p = 0;
var last_t = new Date().getTime();

var sum_dt = 0;
var n_dt = 0;
var last_fps = new Date().getTime();

function tick() {
	var t = new Date().getTime();
	var dt = t - last_t;

	sum_dt += dt;
	n_dt++;

	if (t - last_fps > 5000) {
		//console.log(sum_dt/n_dt);
		sum_dt = 0;
		n_dt = 0;
		last_fps = t;
	}

	if (caramel_img) {
		var delta = next_p - cur_p;
		cur_p = cur_p + dt * delta / 200;
		var delta1 = next_p - cur_p;
		if (delta1 * delta < 0) cur_p = next_p;
		if (cpos.top != old_postop || Math.abs(cur_p - old_p) > 0.0001) draw(cur_p);
	}
	last_t = t;
}

function animate() {
    tick();
    requestAnimFrame(animate);
}

animate();

function onscrollFunc() {
	ww = document.documentElement.clientWidth;
	wh = document.documentElement.clientHeight;

	//var scrolled = window.pageYOffset || document.documentElement.scrollTop;
	cpos = {top:c.getBoundingClientRect().top};
	var ct = cpos.top;
	if (ct < 0) next_p = (wh * 0.6 - ct) / h;
	else if (ct < wh) next_p = ((wh - ct) * 0.6) / h;

	if (next_p > 1) next_p = 1;
	else if (next_p < 0) next_p = 0;

	var j = Math.round(next_p * 4670);
	if (j > 0 && j < 4670) {
		next_p = lenByY[j] / lenByY[4669];
	}
}

window.onscroll = onscrollFunc;
onscrollFunc();

window.onresize = function(){
	cpos = {top:c.getBoundingClientRect().top};
	draw(cur_p);
};
