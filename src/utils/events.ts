import { Props, SyntheticEvent } from "react";

export const executeEvent = (e: SyntheticEvent<any>, props: any) => {
  switch (e.type) {
    case "mousedown":
      executeEventCallback(e, props.onMouseDown);
      break;
    case "mouseup":
      executeEventCallback(e, props.onMouseUp);
      break;
    case "mouseenter":
      executeEventCallback(e, props.onMouseEnter);
      break;
    case "mouseleave":
      executeEventCallback(e, props.onMouseLeave);
      break;
    case "click":
      executeEventCallback(e, props.onClick);
      break;
    case "touchstart":
      executeEventCallback(e, props.onTouchStart);
      break;
    case "touchend":
      executeEventCallback(e, props.onTouchEnd);
      break;
  }
};

export const executeEventCallback = (e: SyntheticEvent<any>, callback: (e: SyntheticEvent<any>) => void) => {
  if (typeof callback === "function") {
    callback(e);
  }
};

export const getEvents = (props: any) => ({
  onMouseDown: (e) => executeEvent(e, props),
  onMouseUp: (e) => executeEvent(e, props),
  onMouseEnter: (e) => executeEvent(e, props),
  onMouseLeave: (e) => executeEvent(e, props),
  onClick: (e) => executeEvent(e, props),
  onTouchStart: (e) => executeEvent(e, props),
  onTouchEnd: (e) => executeEvent(e, props),
});
