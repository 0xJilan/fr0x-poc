import { getPositionValue, getMaxProfit } from "@/lib/Position";

const getSecondsInTime = (seconds) => {
  let d = Math.floor(seconds / (3600 * 24));
  let h = Math.floor((seconds % (3600 * 24)) / 3600);
  let m = Math.floor((seconds % 3600) / 60);
  let days = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  let hours = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  let minutes = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
  return days + hours + minutes;
};

const toUSD = (value) => {
  const options = { style: "currency", currency: "USD" };
  const formatted = new Intl.NumberFormat("en-US", options);
  return formatted.format(value);
};
const getRandomValue = (min, max) => {
  let spread = max - min;
  let randomValueInSpread =
    max <= 1 ? Math.random() * spread : Math.floor(Math.random() * spread);
  return randomValueInSpread + min;
};

const getRandomCollateral = () => {
  let randomNumber = getRandomValue(0, 1);
  return randomNumber <= 0.5
    ? getRandomValue(10, 300)
    : randomNumber <= 0.66
    ? getRandomValue(1000, 50000)
    : getRandomValue(100000, 1000000);
};

const getExitPrice = (
  status,
  isLong,
  isWinning,
  entryPrice,
  takeProfitPrice,
  stopLossPrice
) => {
  if (isWinning) {
    return status === "LIQUIDATED"
      ? takeProfitPrice
      : isLong
      ? getRandomValue(entryPrice, takeProfitPrice)
      : getRandomValue(takeProfitPrice, entryPrice);
  }
  return status === "LIQUIDATED"
    ? stopLossPrice
    : isLong
    ? getRandomValue(stopLossPrice, entryPrice)
    : getRandomValue(entryPrice, stopLossPrice);
};

const getRandomTrade = () => {
  let status = getRandomValue(1, 0) >= 0.5 ? "LIQUIDATED" : "MATURED";
  let expiration = getRandomValue(600, 1209600);
  let isLong = getRandomValue(1, 0) >= 0.5 ? true : false;
  let entryPrice = getRandomValue(900, 3300);
  let stopLossPrice = isLong
    ? getRandomValue(890, entryPrice)
    : getRandomValue(entryPrice, 3310);
  let takeProfitPrice = isLong
    ? getRandomValue(entryPrice, 4000)
    : getRandomValue(300, entryPrice);

  let collateral = getRandomCollateral();
  let value = getPositionValue(isLong, entryPrice, stopLossPrice, collateral);
  let maxProfit = getMaxProfit(isLong, value, entryPrice, takeProfitPrice);
  let isWinning = getRandomValue(1, 0) >= 0.5 ? true : false;
  let duration =
    status === "MATURED" ? expiration : getRandomValue(300, expiration);
  let exitPrice = getExitPrice(
    status,
    isLong,
    isWinning,
    entryPrice,
    takeProfitPrice,
    stopLossPrice
  );

  return {
    status,
    expiration,
    asset: "ETH",
    isLong,
    entryPrice,
    stopLossPrice,
    takeProfitPrice,
    collateral,
    value,
    maxProfit,
    isWinning,
    duration,
    exitPrice,
  };
};

const getSimulation = (runs, amountInPool) => {
  console.log(runs, amountInPool);
};

export { getSecondsInTime, toUSD, getRandomTrade, getSimulation };
