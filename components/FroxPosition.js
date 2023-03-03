import { Inter } from "next/font/google";
import styles from "@/styles/Position.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function FroxPosition({
  collateral,
  positionValue,
  maxProfit,
  marginFee,
  executionFee,
}) {
  return (
    <>
      <div className={styles.card}>
        <h2 className={inter.className}>Fr0x</h2>
        <h6 className={inter.className}>Swap fee not included.</h6>
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
          Open/Close Fee: {Number(executionFee).toFixed(2)}$
        </p>
        <p className={inter.className}>
          Borrow Cost: {Number(marginFee).toFixed(2)}$
        </p>
        <p className={inter.className}>
          Total Fees: {Number(executionFee + marginFee).toFixed(2)}$
        </p>
        <p className={inter.className}>Max Profit:{maxProfit} $</p>
      </div>
    </>
  );
}
