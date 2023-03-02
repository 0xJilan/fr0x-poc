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

const getMarginFee = (
  expiration,
  borrowedRatio,
  borrowBaseRate,
  borrowPerSecondRate,
  maxProfit
) => {
  let borrowRate = borrowBaseRate + borrowPerSecondRate * expiration;
  let borrowFee = (borrowedRatio * borrowRate) / 100;

  return maxProfit * borrowFee * (expiration / 3600);
};

const getExecutionFee = (maxProfit, executionFee) => maxProfit * executionFee; // 0.1% fee
export { getPositionValue, getMaxProfit, getMarginFee, getExecutionFee };
