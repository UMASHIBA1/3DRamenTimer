import MinuteSecondType from "../../types/MinuteSecondType";
import LocationType from "../../types/LocationType";

const _calcPositionY = (
  thisMinuteOrSecond: MinuteSecondType,
  nowMinuteOrSecond: MinuteSecondType
) => {
  const distanceYDiff = 26.6;
  const minuteOrSecondDiff = thisMinuteOrSecond - nowMinuteOrSecond;
  console.group();
  console.log("this", thisMinuteOrSecond);
  console.log("diff", minuteOrSecondDiff);
  // 現在時刻30以上
  if (nowMinuteOrSecond > 30) {
    // 下側
    if (minuteOrSecondDiff < -29) {
      // 前側
      if (minuteOrSecondDiff < -44) {
        console.log("対象");
        return -(minuteOrSecondDiff + 59) * distanceYDiff;
      }
      // 奥側
      else {
        return (minuteOrSecondDiff + 29) * distanceYDiff;
      }
      // 上側
    } else {
      // 前側
      if (minuteOrSecondDiff > -14) {
        return -minuteOrSecondDiff * distanceYDiff;
      }
      // 奥側
      else {
        return (minuteOrSecondDiff + 29) * distanceYDiff;
      }
    }
  } else {
  }

  // if (minuteOrSecondDiff < -15) {
  //   return (30 + minuteOrSecondDiff) * distanceYDiff;
  // } else if (minuteOrSecondDiff > 15) {
  //   return (minuteOrSecondDiff - 30) * distanceYDiff;
  // }
  return -minuteOrSecondDiff * distanceYDiff;
};

const calcTextLocation = (
  thisMinuteOrSecond: MinuteSecondType,
  nowMinuteOrSecond: MinuteSecondType
): LocationType => {
  const defaultPositionZ = 800;
  const minuteOrSecondDiff = thisMinuteOrSecond - nowMinuteOrSecond;
  const positionY = _calcPositionY(thisMinuteOrSecond, nowMinuteOrSecond);
  const positionZ = defaultPositionZ - Math.abs(16 * minuteOrSecondDiff);
  console.log("y", positionY);
  console.log("z", positionZ);
  console.groupEnd();

  return {
    positionY,
    positionZ,
    rotationX: ((Math.PI * 2) / 60) * minuteOrSecondDiff
  };
};

export default calcTextLocation;
