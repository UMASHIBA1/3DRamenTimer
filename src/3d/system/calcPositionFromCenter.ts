export const calcPositionXFromCenter = (clientX: number) => {
  const centerWidth = window.innerWidth / 2;
  return clientX - centerWidth;
};

export const calcPositionYFromCenter = (clientY: number) => {
  const centerHeight = window.innerHeight / 2;
  return clientY - centerHeight;
};
