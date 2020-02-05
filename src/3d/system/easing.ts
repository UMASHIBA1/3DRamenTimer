export default (nowLocation: number, targetLocation: number) => {
  console.group();
  console.log("targetLocation: ", targetLocation);
  console.log("nowLocation: ", nowLocation);
  console.groupEnd();
  return (targetLocation - nowLocation) * 0.09;
};
