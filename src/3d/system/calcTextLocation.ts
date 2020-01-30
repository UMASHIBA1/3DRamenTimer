import MinuteSecondType from "../../types/MinuteSecondType";
import LocationType from "../../types/LocationType";

const circleDiameter = 500;

// sin,cosあたり使って円周上の座標を出す
const _calcIndexFromNowMinuteOrSecond = (
  thisMinuteOrSecond: MinuteSecondType,
  nowMinuteOrSecond: number
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
  const radian = (indexFromNowMinuteOrSecond / 30) * Math.PI;
  return (Math.sin(radian) * circleDiameter) / 2;
};

// 30の時のzが一番小さいようにする
const _calcPositionZ = (indexFromNowMinuteOrSecond: number) => {
  const centerPositionZ = 500;
  const radian = (indexFromNowMinuteOrSecond / 30) * Math.PI;
  return centerPositionZ + (Math.cos(radian) * circleDiameter) / 2;
};

const calcTextLocation = (
  thisMinuteOrSecond: MinuteSecondType,
  nowMinuteOrSecond: number
): LocationType => {
  const minuteOrSecondDiff = thisMinuteOrSecond - nowMinuteOrSecond;
  const indexFromNowMinuteOrSecond = _calcIndexFromNowMinuteOrSecond(
    thisMinuteOrSecond,
    nowMinuteOrSecond
  );
  const positionY = _calcPositionY(indexFromNowMinuteOrSecond);
  const positionZ = _calcPositionZ(indexFromNowMinuteOrSecond);

  return {
    positionY,
    positionZ,
    rotationX: ((Math.PI * 2) / 60) * minuteOrSecondDiff
  };
};

export default calcTextLocation;
