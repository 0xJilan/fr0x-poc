import { useState } from "react";
import { Inter } from "next/font/google";
import { getPositionValue } from "@/lib/Position";
import styles from "@/styles/Position.module.css";
import Switch from "./Switch";
import TimeBox from "./TimeBox";
import Price from "./Price";
const inter = Inter({ subsets: ["latin"] });

export default function Position() {
  const [isLong, setIsLong] = useState(true);
  const [expiration, setExpiration] = useState(0);
  const [entryPrice, setEntryPrice] = useState(0);
  const [stopLossPrice, setStopLossPrice] = useState(0);
  const [takeProfitPrice, setTakeProfitPrice] = useState(0);
  const [collateral, setCollateral] = useState(0);

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
          <p className={inter.className}>
            VALUE :{" "}
            {collateral != 0 &&
              getPositionValue(isLong, entryPrice, stopLossPrice, collateral)}
          </p>
        </div>
      </section>
    </>
  );
}
