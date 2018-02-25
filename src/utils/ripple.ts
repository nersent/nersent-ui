import Ripples from "../components/Ripples";

import { executeEvent } from "./events";

export const handleRipple = (
  { type, pageX, pageY },
  ripplesComponent: Ripples,
  props,
) => {
  const { ripple, customRippleBehavior } = props;

  if (ripple && !customRippleBehavior) {
    switch (type) {
      case "mouseleave":
        ripplesComponent.removeRipples();
        break;
      case "mousedown":
        ripplesComponent.makeRipple(pageX, pageY);
        break;
    }
  }
};

const defaultRippleEvent = (e, getRipples: () => Ripples, props) => {
  handleRipple(e, getRipples(), props);
  executeEvent(e, props);
};

export const getRippleEvents = (props, getRipples: () => Ripples) => ({
  onMouseDown: (e) => defaultRippleEvent(e, getRipples, props),
  onMouseLeave: (e) => defaultRippleEvent(e, getRipples, props),
});
