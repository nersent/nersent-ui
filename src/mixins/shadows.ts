const boxShadow = (value: string) => `
    box-shadow: ${value};
    -moz-box-shadow: ${value};
    -webkit-box-shadow: ${value};
  `;

const shadow = (elevation: number) => {
  if (elevation === 1) {
    return boxShadow("0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)");
  } else if (elevation === 2) {
    return boxShadow("0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)");
  } else if (elevation === 3) {
    return boxShadow("0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)");
  } else if (elevation === 4) {
    return boxShadow("0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)");
  } else if (elevation === 5) {
    return boxShadow("0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)");
  }
  return "";
};

export default {
  boxShadow,
  shadow,
};