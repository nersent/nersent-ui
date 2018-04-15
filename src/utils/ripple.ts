import Ripples from '../components/Ripples';

import { executeEvent } from './events';

export const handleRipple = ({
  type, pageX, pageY, touches,
}, ripplesComponent: Ripples, props) => {
  const { ripple, customRippleBehavior } = props;

  if (ripple && !customRippleBehavior) {
    if (type === 'touchend') {
      ripplesComponent.removeRipples();
    } else if (type === 'touchstart') {
      const touch = touches[touches.length - 1];
      ripplesComponent.makeRipple(touch.pageX, touch.pageY, true);
    } else if (type === 'mouseleave') {
      ripplesComponent.removeRipples();
    } else if (type === 'mousedown') {
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
  onMouseLeave: e => defaultRippleEvent(e, getRipples, props),
});
