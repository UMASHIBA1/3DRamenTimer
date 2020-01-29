import MinuteSecondType from "../../types/MinuteSecondType";
import LocationType from "../../types/LocationType";

const circleDiameter = 300;

const _calcIndexFromNowMinuteOrSecond = (
  thisMinuteOrSecond: MinuteSecondType,
  nowMinuteOrSecond: MinuteSecondType
) => {
  // もしnowよりthisがでかい=>一回0を通過してる
  if (thisMinuteOrSecond > nowMinuteOrSecond) {
    // 0の時のindex
    const zeroIndex = nowMinuteOrSecond;
    // 59以降のcount
    const after59Count = 60 - thisMinuteOrSecond;
    return zeroIndex + after59Count;
  } else {
    return nowMinuteOrSecond - thisMinuteOrSecond;
  }
};

// index30がY0になればよい
const _calcPositionY = (indexFromNowMinuteOrSecond: number) => {
  const distanceYDiff = circleDiameter / 15;
  if (0 <= indexFromNowMinuteOrSecond && indexFromNowMinuteOrSecond < 15) {
    return distanceYDiff * indexFromNowMinuteOrSecond;
  } else if (
    15 <= indexFromNowMinuteOrSecond &&
    indexFromNowMinuteOrSecond < 30
  ) {
    return distanceYDiff * Math.abs(indexFromNowMinuteOrSecond - 30);
  } else if (
    30 <= indexFromNowMinuteOrSecond &&
    indexFromNowMinuteOrSecond < 45
  ) {
    return -distanceYDiff * (indexFromNowMinuteOrSecond - 30);
  } else {
    return distanceYDiff * (indexFromNowMinuteOrSecond - 60);
  }
};

// 30の時のzが一番小さいようにする
const _calcPositionZ = (indexFromNowMinuteOrSecond: number) => {
  const centerPositionZ = 500;
  const zDiff = circleDiameter / 15;

  if (0 <= indexFromNowMinuteOrSecond && indexFromNowMinuteOrSecond < 15) {
    return centerPositionZ + zDiff * Math.abs(indexFromNowMinuteOrSecond - 15);
  } else if (
    15 <= indexFromNowMinuteOrSecond &&
    indexFromNowMinuteOrSecond < 30
  ) {
    return centerPositionZ - zDiff * (indexFromNowMinuteOrSecond - 15);
  } else if (
    30 <= indexFromNowMinuteOrSecond &&
    indexFromNowMinuteOrSecond < 45
  ) {
    return centerPositionZ - zDiff * Math.abs(indexFromNowMinuteOrSecond - 45);
  } else {
    return centerPositionZ + zDiff * Math.abs(indexFromNowMinuteOrSecond - 45);
  }
};

const calcTextLocation = (
  thisMinuteOrSecond: MinuteSecondType,
  nowMinuteOrSecond: MinuteSecondType
): LocationType => {
  const minuteOrSecondDiff = thisMinuteOrSecond - nowMinuteOrSecond;
  const indexFromNowMinuteOrSecond = _calcIndexFromNowMinuteOrSecond(
    thisMinuteOrSecond,
    nowMinuteOrSecond
  );
  const positionY = _calcPositionY(indexFromNowMinuteOrSecond);
  const positionZ = _calcPositionZ(indexFromNowMinuteOrSecond);
  console.group();
  console.log("this", thisMinuteOrSecond);
  console.log("index", indexFromNowMinuteOrSecond);
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
