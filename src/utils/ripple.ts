import Ripples from "../components/Ripples";

import { executeEvent } from "./events";

export const handleRipple = (
  { type, pageX, pageY, touches },
  ripplesComponent: Ripples,
  props
) => {
  const { ripple, customRippleBehavior } = props;

  if (ripple && !customRippleBehavior) {
    switch (type) {
      case "touchend":
        ripplesComponent.removeRipples();
        break;
      case "touchstart":
        const touch = touches[touches.length - 1];
        ripplesComponent.makeRipple(touch.pageX, touch.pageY, true);
        break;
      case "mouseleave":
        ripplesComponent.removeRipples();
        break;
      case "mousedown":
        ripplesComponent.makeRipple(pageX, pageY);
    }
  }
};

const defaultRippleEvent = (e, getRipples: () => Ripples, props) => {
  handleRipple(e, getRipples(), props);
  executeEvent(e, props);
};

export const getRippleEvents = (props, getRipples: () => Ripples) => ({
  onTouchStart: e => defaultRippleEvent(e, getRipples, props),
  onTouchEnd: e => defaultRippleEvent(e, getRipples, props),
  onMouseDown: e => defaultRippleEvent(e, getRipples, props),
  onMouseLeave: e => defaultRippleEvent(e, getRipples, props)
});
