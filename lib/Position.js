const getPositionValue = (isLong, entryPrice, stopLossPrice, collateral) => {
  const delta = isLong
    ? entryPrice - stopLossPrice
    : stopLossPrice - entryPrice;
  return (entryPrice * collateral) / delta;
};

export { getPositionValue };
