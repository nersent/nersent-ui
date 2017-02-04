var Ripple = class Ripple {
    static createRipple(element, css, options = {x: 0, y: 0, scale: 15, time: 0.4, scaleY: null}, rootElement = "") {
        var rippleElement = document.createElement("span");
        rippleElement.className = 'ripple-effect';
        element.appendChild(rippleElement);
        rippleElement.css({left: options.x + 'px', top: options.y + 'px'});
        rippleElement.css(css);
        rippleElement.options = options;
        if (rootElement != "") {
            rippleElement.element = rootElement;
        }
        else {
            rippleElement.element = element;
        }
        return rippleElement;
    }
    static makeRipple(rippleElement) {
        if (scaleY == null){
            scaleY = scale
        }
        var xPos = rippleElement.options.x,
            yPos = rippleElement.options.y,
            scale = rippleElement.options.scale,
            time = rippleElement.options.time,
            scaleY = rippleElement.options.scaleY,
            size = 0;

        if (scaleY == null) {
            scaleY = scale;
        }

        var animateSize = parseInt(Math.max(scale, scaleY) * Math.PI);

        TweenMax.to(rippleElement, time, {
            width: animateSize,
            height: animateSize
        });
        function removeRipple() {
            TweenMax.to(rippleElement, 0.4, {
                opacity: 0,
                onComplete: function() {
                    if (rippleElement.parentNode != null)
                        rippleElement.parentNode.removeChild(rippleElement);
                }
            });
        }

        rippleElement.element.addEventListener('mouseout', removeRipple);
        rippleElement.element.addEventListener('mouseup', removeRipple);
    }
};
function createRippleCenter(item, scale = 15, time = 0.4) {
    return {x: item.clientWidth / 2, y: item.clientHeight / 2, scale: scale, time: time}
}
function mousePositionElement(e) {
	var mousePosDoc = mousePositionDocument(e);
	var target = mouseTarget(e);
	var targetPos = findPos(target);
	var posx = mousePosDoc.x - targetPos.left;
	var posy = mousePosDoc.y - targetPos.top;
	return {
		x : posx,
		y : posy
	};
}
function mouseTarget(e) {
	var targ;
	if (!e) var e = window.event;
	if (e.target) targ = e.target;
	else if (e.srcElement) targ = e.srcElement;
	if (targ.nodeType == 3)
		targ = targ.parentNode;
	return targ;
}
function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	}
	return {
		left : curleft,
		top : curtop
	};
}
function mousePositionDocument(e) {
	var posx = 0;
	var posy = 0;
	if (!e) {
		var e = window.event;
	}
	if (e.pageX || e.pageY) {
		posx = e.pageX;
		posy = e.pageY;
	}
	else if (e.clientX || e.clientY) {
		posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	return {
		x : posx,
		y : posy
	};
}
function createRippleMouse(item, e, time = 1) {
    var pos = mousePositionElement(e);
    var relX = pos.x;
    var relY = pos.y;
    return {x: relX, y: relY, scale: item.clientWidth, time: time, scaleY: item.clientHeight}
}
Element.prototype.css = function (data, value = null) {
    if (typeof(data) === 'object') {
        Object.assign(this.style, data);
    } else {
        if (value != null) {
            this.style[data] = value;
        }
        else {
            return this.style[data];
        }
    }
}
