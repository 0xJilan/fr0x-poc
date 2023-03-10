const getPositionValue = (isLong, entryPrice, stopLossPrice, collateral) => {
  const delta = isLong
    ? entryPrice - stopLossPrice
    : stopLossPrice - entryPrice;
  return (entryPrice * collateral) / delta;
};
const getMaxProfit = (isLong, value, entryPrice, takeProfit) => {
  const delta = isLong ? takeProfit - entryPrice : entryPrice - takeProfit;
  return (value / entryPrice) * delta;
};
const getProfit = (isLong, value, entryPrice, exitPrice, totalFees) => {
  const delta = isLong ? exitPrice - entryPrice : entryPrice - exitPrice;
  return (value / entryPrice) * delta - totalFees;
};
const getProfitWithoutFee = (isLong, value, entryPrice, exitPrice) => {
  const delta = isLong ? exitPrice - entryPrice : entryPrice - exitPrice;
  return (value / entryPrice) * delta;
};

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
  getProfit,
  getProfitWithoutFee,
  getGMXCollateral,
  getGMXLeverage,
  getGMXOpenCloseFee,
  getGMXBorrowFee,
  getNewFroxOpenCloseFee,
  getNewFroxBorrowFee,
};
