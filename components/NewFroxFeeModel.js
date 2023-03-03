import { Inter } from "next/font/google";
import styles from "@/styles/Position.module.css";
import { getNewFroxOpenCloseFee, getNewFroxBorrowFee } from "@/lib/Position";
const inter = Inter({ subsets: ["latin"] });

export default function NewFroxFeeModel({
  expiration,
  collateral,
  positionValue,
  maxProfit,
  borrowedRatio,
}) {
  return (
    <>
      <div className={styles.card}>
        <h2 className={inter.className}>New Fr0x Fee Model</h2>
        <h6 className={inter.className}>Swap fee not included.</h6>
        <br />
        <p className={inter.className}>
          Collateral: {Number(collateral).toFixed(2)}$
        </p>
        <p className={inter.className}>
          Position Value: {Number(positionValue).toFixed(2)}$
        </p>
        <p className={inter.className}>
          Leverage: x{Number(positionValue / collateral).toFixed(2)}
        </p>
        <p className={inter.className}>
          Open/Close Fee (0.2%):
          {Number(getNewFroxOpenCloseFee(maxProfit)).toFixed(2)}$
        </p>
        <p className={inter.className}>
          Borrow Cost:
          {Number(
            getNewFroxBorrowFee(borrowedRatio, expiration, positionValue)
          ).toFixed(2)}
          $
        </p>
        <p className={inter.className}>
          Total Fees:{" "}
          {Number(
            Number(getNewFroxOpenCloseFee(maxProfit)) +
              Number(
                getNewFroxBorrowFee(borrowedRatio, expiration, positionValue)
              )
          ).toFixed(2)}
          $
        </p>
        <p className={inter.className}>Max Profit:{maxProfit} $</p>
      </div>
    </>
  );
}
