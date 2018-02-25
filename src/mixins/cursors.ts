export const pointer = () => {
  return `
    user-select: none;
    cursor: pointer;
  `;
};

export const defaultCursor = () => {
  return `
    user-select: none;
    cursor: default;
  `;
};

export default {
  pointer,
  defaultCursor,
};
