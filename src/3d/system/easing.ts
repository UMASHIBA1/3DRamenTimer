export default (
  nowLocation: number,
  targetLocation: number,
  easingSpeed: number = 0.09
) => {
  return (targetLocation - nowLocation) * easingSpeed;
};
