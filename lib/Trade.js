const seedrandom = require("seedrandom");

import {
  getPositionValue,
  getMaxProfit,
  getProfitWithoutFee,
  getNewFroxOpenCloseFee,
  getNewFroxBorrowFee,
} from "@/lib/Position";

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
  const randomN = seedrandom("Please add Some entropy to this number", {
    entropy: true,
  });
  let spread = max - min;
  let randomValueInSpread =
    max <= 1 ? randomN() * spread : Math.floor(randomN() * spread);
  return randomValueInSpread + min;
};

const getRandomCollateral = (maxValue) => {
  let randomNumber = seedrandom(
    "Please add Another king of entropy to this number",
    { entropy: true }
  );
  return randomNumber() <= 0.5
    ? getRandomValue(10, maxValue / 1000)
    : randomNumber <= 0.66
    ? getRandomValue(maxValue / 1000, maxValue / 20)
    : getRandomValue(maxValue / 10, maxValue);
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

const getRandomTrade = (winRate = 0.5, maxValue = 1000000) => {
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

  let collateral = getRandomCollateral(maxValue);
  let value = getPositionValue(isLong, entryPrice, stopLossPrice, collateral);
  let maxProfit = getMaxProfit(isLong, value, entryPrice, takeProfitPrice);
  let isWinning = getRandomValue(1, 0) <= winRate ? true : false;
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

const splitFee = (amountToSplit, percentSplit) => {
  let splitted = amountToSplit * percentSplit;
  let rest = amountToSplit - splitted;
  return { splitted, rest };
};
const getSimulation = (
  runs,
  amountInPool,
  borrowedRatio,
  winRate,
  shareBorrowRate,
  maxBetSize
) => {
  let poolBalance = amountInPool;
  let BorrowFeesEarned = 0;
  let OpenCloseFeeEarned = 0;
  let lackOfLiquidityEvent = 0;
  let executedTrades = 0;
  let winningTrades = 0;

  for (let index = 0; index < runs; index++) {
    let randomTrade = getRandomTrade(winRate);
    const {
      maxProfit,
      expiration,
      value,
      isWinning,
      isLong,
      entryPrice,
      exitPrice,
    } = randomTrade;

    if (maxProfit <= poolBalance * maxBetSize) {
      isWinning ? (winningTrades = winningTrades + 1) : winningTrades;
      const openCloseFee = getNewFroxOpenCloseFee(maxProfit);
      OpenCloseFeeEarned = OpenCloseFeeEarned + Number(openCloseFee);
      const borrowCost = getNewFroxBorrowFee(borrowedRatio, expiration, value);
      const borrowCostSplitted = splitFee(Number(borrowCost), shareBorrowRate);
      poolBalance = poolBalance + Number(borrowCostSplitted.splitted);
      BorrowFeesEarned = BorrowFeesEarned + Number(borrowCostSplitted.rest);
      const profit = getProfitWithoutFee(isLong, value, entryPrice, exitPrice);
      poolBalance =
        profit < 0 ? poolBalance + Math.abs(profit) : poolBalance - profit;
      executedTrades = executedTrades + 1;
    } else {
      lackOfLiquidityEvent = lackOfLiquidityEvent + 1;
    }
  }
  const trueWinningRate =
    (winningTrades * 100) / (winningTrades + (executedTrades - winningTrades));

  const executedTradesPercent =
    (executedTrades * 100) / (executedTrades + lackOfLiquidityEvent);

  const poolEvolutionRate = ((poolBalance - amountInPool) / amountInPool) * 100;

  const poolBalanceWithBorrowFee = poolBalance + BorrowFeesEarned;
  const poolEvolutionRateIncludingBorrowFee =
    ((poolBalanceWithBorrowFee - amountInPool) / amountInPool) * 100;

  return {
    poolBalance,
    poolEvolutionRate,
    trueWinningRate,
    poolBalanceWithBorrowFee,
    poolEvolutionRateIncludingBorrowFee,
    BorrowFeesEarned,
    OpenCloseFeeEarned,
    executedTrades,
    executedTradesPercent,
  };
};

export { getSecondsInTime, toUSD, getRandomTrade, getSimulation };
