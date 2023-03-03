const getPositionValue = (isLong, entryPrice, stopLossPrice, collateral) => {
  const delta = isLong
    ? entryPrice - stopLossPrice
    : stopLossPrice - entryPrice;
  return (entryPrice * collateral) / delta;
};
const getMaxProfit = (isLong, value, entryPrice, takeProfit, collateral) => {
  const delta = isLong ? takeProfit - entryPrice : entryPrice - takeProfit;
  const total = (value / entryPrice) * delta + collateral;
  return total;
};

const getBorrowBaseRate = (borrowFixed, expiration, borrowBaseFee) => {
  let ONE_DAY_IN_SECOND = 86400;
  return (
    borrowFixed -
    (expiration / ONE_DAY_IN_SECOND) * borrowBaseFee +
    borrowBaseFee
  );
};

const getMarginFee = (
  expiration,
  borrowedRatio,
  borrowBaseRate,
  borrowPerSecondRate,
  positionValue
) => {
  let borrowRate = borrowBaseRate + borrowPerSecondRate * expiration;
  let borrowFee = (borrowedRatio * borrowRate) / 100;

  return positionValue * borrowFee * (expiration / 3600);
};

const getExecutionFee = (maxProfit, executionFee) => maxProfit * executionFee; // 0.1% fee

const getGMXLeverage = (positionValue, collateral) => {
  return positionValue / collateral >= 50 ? 50 : positionValue / collateral;
};

const getGMXCollateral = (positionValue, collateral) => {
  return positionValue / getGMXLeverage(positionValue, collateral);
};

const getGMXOpenCloseFee = (positionValue) => positionValue * 0.002;

const getGMXBorrowFee = (borrowedRatio, expiration, positionValue) => {
  let HOUR_IN_SECONDS = 3600;
  let borrowDuration = expiration / HOUR_IN_SECONDS;
  let borrowFeePerHour = borrowedRatio * 0.0001;
  let borrowCostPerHour = positionValue * borrowFeePerHour;
  return Number(borrowCostPerHour * borrowDuration).toFixed(2);
};

const getNewFroxOpenCloseFee = (maxProfit) => maxProfit * 0.002;
const getNewFroxBorrowFee = (borrowedRatio, expiration, positionValue) => {
  let HOUR_IN_SECONDS = 3600;
  let borrowDuration = expiration / HOUR_IN_SECONDS;
  let borrowFeePerHour = borrowedRatio * 0.000075;
  let borrowCostPerHour = positionValue * borrowFeePerHour;
  return Number(borrowCostPerHour * borrowDuration).toFixed(2);
};
export {
  getPositionValue,
  getMaxProfit,
  getBorrowBaseRate,
  getMarginFee,
  getExecutionFee,
  getGMXCollateral,
  getGMXLeverage,
  getGMXOpenCloseFee,
  getGMXBorrowFee,
  getNewFroxOpenCloseFee,
  getNewFroxBorrowFee,
};
