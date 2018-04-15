import Align from '../enums/align';

export const center = (align: Align) => {
  if (align === Align.CenterHorizontal) {
    return `
      left: 50%;
      transform: translateX(-50%);
    `;
  } else if (align === Align.CenterVertical) {
    return `
      top: 50%;
      transform: translateY(-50%);
    `;
  } else if (align === Align.CenterBoth) {
    return `
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    `;
  }

  return '';
};

export default { center };
