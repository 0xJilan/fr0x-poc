import { Inter } from "next/font/google";
import styles from "@/styles/Position.module.css";
import {
  getGMXCollateral,
  getGMXLeverage,
  getGMXOpenCloseFee,
  getGMXBorrowFee,
} from "@/lib/Position";
const inter = Inter({ subsets: ["latin"] });

export default function GmxPosition({
  borrowedRatio,
  expiration,
  positionValue,
  collateral,
}) {
  return (
    <>
      <div className={styles.card}>
        <h2 className={inter.className}>GMX</h2>
        <h6 className={inter.className}>Swap fee not included.</h6>
        <br />
        <p className={inter.className}>
          Collateral:
          {Number(getGMXCollateral(positionValue, collateral)).toFixed(2)}$
        </p>
        <p className={inter.className}>
          Position Value: {Number(positionValue).toFixed(2)}$
        </p>
        <p className={inter.className}>
          Leverage: x
          {Number(getGMXLeverage(positionValue, collateral)).toFixed(2)}
        </p>
        <p className={inter.className}>
          Open/Close Fee (0.2%):
          {Number(getGMXOpenCloseFee(positionValue)).toFixed(2)}$
        </p>
        <p className={inter.className}>
          Borrow Cost:
          {Number(
            getGMXBorrowFee(borrowedRatio, expiration, positionValue)
          ).toFixed(2)}
          $
        </p>
        <p className={inter.className}>
          Total Fees:
          {Number(
            Number(getGMXOpenCloseFee(positionValue)) +
              Number(getGMXBorrowFee(borrowedRatio, expiration, positionValue))
          ).toFixed(2)}
          $
        </p>
      </div>
    </>
  );
}
