var Ripple = class Ripple {
    /*
    * creates ripple element with given parameters
    * @param1 {DOMElement} element
    * @param2 {Object} css - the css to apply for ripple element
    * @param3 {Object} options - the options for ripple
    * @param4 {DOMElement} rootElement - fake root element (optional)
    * @return {DOMElement}
    */
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
    /*
    * animates ripple
    * @param1 {DOMElement} rippleElement
    */
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

/*
* configures ripple that is starting from center for given element
* @param1 {DOMElement} item
* @param2 {Number} scale (optional)
* @param3 {Number} time (optional)
*/
function createRippleCenter(item, scale = 15, time = 0.4) {
    return {x: item.clientWidth / 2, y: item.clientHeight / 2, scale: scale, time: time}
}

/*
* configures ripple that is starting from mouse point for given element
* @param1 {DOMElement} item
* @param2 {Number} scale (optional)
* @param3 {Number} time (optional)
*/
function createRippleMouse(item, e, time = 1) {
    var relX = e.pageX - item.getBoundingClientRect().left;
    var relY = e.pageY - item.getBoundingClientRect().top;
    return {x: relX, y: relY, scale: item.clientWidth, time: time, scaleY: item.clientHeight}
}

/*
* changes css of given element
* this function is setter and getter
* @param1 {Object | String} data
* @param2 {String} value (optional)
* @return {Object} - style for element
*/
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
