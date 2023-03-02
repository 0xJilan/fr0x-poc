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
export { getPositionValue, getMaxProfit };
