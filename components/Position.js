import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import {
  getPositionValue,
  getMaxProfit,
  getMarginFee,
  getExecutionFee,
} from "@/lib/Position";
import styles from "@/styles/Position.module.css";
import Switch from "./Switch";
import TimeBox from "./TimeBox";
import Price from "./Price";
const inter = Inter({ subsets: ["latin"] });

export default function Position({
  borrowedRatio,
  borrowBaseRate,
  borrowPerSecondRate,
  executionBaseFee,
}) {
  const [isLong, setIsLong] = useState(true);
  const [expiration, setExpiration] = useState(0);
  const [entryPrice, setEntryPrice] = useState(1000);
  const [stopLossPrice, setStopLossPrice] = useState(980);
  const [takeProfitPrice, setTakeProfitPrice] = useState(1100);
  const [collateral, setCollateral] = useState(100);
  const [positionValue, setPositionValue] = useState(0);
  const [maxProfit, setMaxProfit] = useState(0);
  const [marginFee, setMarginFee] = useState(0);
  const [executionFee, setExecutionFee] = useState(0);

  useEffect(() => {
    const newValue = getPositionValue(
      isLong,
      Number(entryPrice),
      Number(stopLossPrice),
      Number(collateral)
    );
    setPositionValue(newValue);
  }, [entryPrice, stopLossPrice, takeProfitPrice, collateral]);

  useEffect(() => {
    const newProfit = getMaxProfit(
      isLong,
      Number(positionValue),
      Number(entryPrice),
      Number(takeProfitPrice),
      Number(collateral)
    );
    setMaxProfit(newProfit);
  }, [positionValue]);

  useEffect(() => {
    const newMarginFee = getMarginFee(
      Number(expiration),
      Number(borrowedRatio),
      Number(borrowBaseRate),
      Number(borrowPerSecondRate),
      Number(maxProfit)
    );
    setMarginFee(newMarginFee);
  }, [
    expiration,
    borrowedRatio,
    borrowBaseRate,
    borrowPerSecondRate,
    maxProfit,
  ]);

  useEffect(() => {
    const newMarginFee = getExecutionFee(
      Number(maxProfit),
      Number(executionBaseFee)
    );
    setExecutionFee(newMarginFee);
  }, [executionBaseFee, maxProfit]);

  return (
    <>
      <section className={styles.section}>
        <h1 className={inter.className}>POSITION</h1>
        <div className={styles.card}>
          <Switch isOn={isLong} handleToggle={() => setIsLong(!isLong)} />
          <TimeBox expiration={expiration} setExpiration={setExpiration} />
          <Price label="Entry" value={entryPrice} setValue={setEntryPrice} />
          <Price
            label="Stop Loss"
            value={stopLossPrice}
            setValue={setStopLossPrice}
          />
          <Price
            label="Take Profit"
            value={takeProfitPrice}
            setValue={setTakeProfitPrice}
          />
          <Price
            label="Collateral"
            value={collateral}
            setValue={setCollateral}
          />
          <p className={inter.className}>Position Value :{positionValue} $</p>
          <p className={inter.className}>Max Profit :{maxProfit}</p>
          <p className={inter.className}>Margin Fee :{marginFee}</p>
          <p className={inter.className}>Execution Fee :{executionFee}</p>
        </div>
      </section>
    </>
  );
}
