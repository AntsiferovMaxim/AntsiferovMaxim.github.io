function clone(obj){
    if (obj == null || typeof(obj) != 'object')
        return obj;
    var temp = new obj.constructor(); 
    for (var key in obj)
        temp[key] = clone(obj[key]);
    return temp;
}

function degrad(deg) {

	return deg*Math.PI/180;
}

function Vec(x, y) {
	this.x = x;
	this.y = y;

	this.len = function(){
		return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y, 2));
	}

	this.dot = function(v){
		return this.x*v.x + this.y*v.y;
	}

	this.normalize = function(){
		var l = this.len();
		this.x /= l;
		this.y /= l;
		return this;
	}

	this.add = function(v) {
		this.x += v.x;
		this.y += v.y;
		return this;
	}

	this.sub = function(v) {
		this.x -= v.x;
		this.y -= v.y;
		return this;
	}

	this.mult = function(n) {
		this.x *= n;
		this.y *= n;
		return this;
	}

	this.rotate = function(deg) {
		var x = this.x;
		var y = this.y;

		this.x = x * Math.cos(degrad(deg)) - y * Math.sin(degrad(deg));
    	this.y = x * Math.sin(degrad(deg)) + y * Math.cos(degrad(deg));

    	return this;
	}

	this.cos = function(v) {
		var b = this.len() * v.len();
		if (b) {
			var a = this.dot(v);
			return a/b;
		} else {
			return false;
		}
	}

	this.zero = function() {
		this.x = 0;
		this.y = 0;
		return this;
	}

	this.print = function(n) {
		console.log((n || "vec")+": x = "+this.x+"; y = "+this.y);
	}
}