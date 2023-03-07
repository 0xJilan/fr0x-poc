import { Inter } from "next/font/google";
import styles from "@/styles/Position.module.css";
import {
  getGMXCollateral,
  getGMXLeverage,
  getProfit,
  getNewFroxOpenCloseFee,
  getNewFroxBorrowFee,
  getGMXOpenCloseFee,
  getGMXBorrowFee,
} from "@/lib/Position";
import { toUSD } from "@/lib/Trade";
const inter = Inter({ subsets: ["latin"] });

export default function DexPosition({ name, randomizedTrade, borrowedRatio }) {
  const {
    expiration,
    isLong,
    entryPrice,
    exitPrice,
    value,
    collateral,
    maxProfit,
    duration,
  } = randomizedTrade;
  const dexCollateral =
    name === "GMX" ? getGMXCollateral(value, collateral) : collateral;
  const leverage =
    name === "GMX" ? getGMXLeverage(value, collateral) : value / collateral;

  const openCloseFee =
    name === "GMX"
      ? getGMXOpenCloseFee(value)
      : getNewFroxOpenCloseFee(maxProfit);

  const borrowCost =
    name === "GMX"
      ? getGMXBorrowFee(borrowedRatio, duration, value)
      : getNewFroxBorrowFee(borrowedRatio, expiration, value);

  const totalFees = Number(openCloseFee) + Number(borrowCost);

  const profit = getProfit(isLong, value, entryPrice, exitPrice, totalFees);
  const isProfit = profit > 0 ? true : false;

  return (
    <>
      <div className={styles.card}>
        <h2 className={inter.className}>{name}</h2>
        <h6 className={inter.className}>Swap fee not included.</h6>
        <br />
        <p className={inter.className}>Collateral: {toUSD(dexCollateral)}</p>
        <br />
        <p className={inter.className}>
          Leverage: x{Number(leverage).toFixed(2)}
        </p>
        <br />
        <p className={inter.className}>
          Open/Close Fee (0.2%): {toUSD(openCloseFee)}
        </p>
        <br />
        <p className={inter.className}>Borrow Cost: {toUSD(borrowCost)}</p>
        <br />
        <p className={inter.className}>Total Fees: {toUSD(totalFees)}</p>
        <br />
        <p className={inter.className}>***** FINALITY *****</p>
        <br />
        <p className={inter.className}>
          {isProfit ? "Net Profit: +" : "Net Loss: "}
          {toUSD(profit)}
        </p>
      </div>
    </>
  );
}
