var Ripple = class Ripple {
    static createRipple(element, css, options = {x: 0, y: 0, scale: 15, time: 0.4, scaleY: null}) {
        var rippleElement = document.createElement("span");
        rippleElement.className = 'ripple-effect';
        element.appendChild(rippleElement);
        rippleElement.css({left: options.x + 'px', top: options.y + 'px'});
        rippleElement.css(css);
        rippleElement.options = options;
        rippleElement.element = element;
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
            height: animateSize,
            ease: Power4.easeOut
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
function createRippleCenter(item, scale = 15, time = 0.7) {
    return {x: item.clientWidth / 2, y: item.clientHeight / 2, scale: scale, time: time}
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
