import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import { getPositionValue, getMaxProfit } from "@/lib/Position";
import { getRandomTrade } from "@/lib/Trade";
import styles from "@/styles/Position.module.css";
import Switch from "./Switch";
import TimeBox from "./TimeBox";
import Price from "./Price";
import GmxPosition from "./GmxPosition";
import RandomTrade from "./RandomTrade";
import NewFroxFeeModel from "./NewFroxFeeModel";
import DexPosition from "./DexPosition";

const inter = Inter({ subsets: ["latin"] });

export default function Position({ borrowedRatio }) {
  const [page, setPage] = useState("CREATE");
  const [isLong, setIsLong] = useState(true);
  const [expiration, setExpiration] = useState(0);
  const [entryPrice, setEntryPrice] = useState(1000);
  const [stopLossPrice, setStopLossPrice] = useState(980);
  const [takeProfitPrice, setTakeProfitPrice] = useState(1100);
  const [collateral, setCollateral] = useState(100);
  const [positionValue, setPositionValue] = useState(0);
  const [maxProfit, setMaxProfit] = useState(0);
  const [randomizedTrade, setRandomizedTrade] = useState(null);

  const handleClick = () => {
    setRandomizedTrade(getRandomTrade());
  };

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
  }, [positionValue, takeProfitPrice, entryPrice, stopLossPrice]);

  return (
    <>
      <section className={styles.section}>
        <h1 className={inter.className}>POSITION</h1>
        <div className={styles.buttonWrapper}>
          <div
            className={`${styles.buttonPage} ${styles.left}`}
            onClick={() => setPage("CREATE")}
          >
            CREATE ORDER
          </div>
          <div
            className={`${styles.buttonPage} ${styles.right}`}
            onClick={() => setPage("RANDOMIZE")}
          >
            RANDOMIZE TRADE
          </div>
        </div>

        {page === "CREATE" && (
          <>
            <div className={styles.card}>
              <Switch isOn={isLong} handleToggle={() => setIsLong(!isLong)} />
              <TimeBox expiration={expiration} setExpiration={setExpiration} />
              <Price
                label="Entry"
                value={entryPrice}
                setValue={setEntryPrice}
              />
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
            </div>
            <div className={styles.dexContainer}>
              <GmxPosition
                borrowedRatio={borrowedRatio}
                expiration={expiration}
                positionValue={positionValue}
                collateral={collateral}
              />
              <NewFroxFeeModel
                expiration={expiration}
                collateral={collateral}
                positionValue={positionValue}
                maxProfit={maxProfit}
                borrowedRatio={borrowedRatio}
              />
            </div>
          </>
        )}

        {page === "RANDOMIZE" && (
          <>
            <button onClick={handleClick}>Randomize!</button>

            <div className={styles.dexContainer}>
              {randomizedTrade && (
                <>
                  <DexPosition
                    name="GMX"
                    randomizedTrade={randomizedTrade}
                    borrowedRatio={borrowedRatio}
                  />
                  <RandomTrade
                    randomizedTrade={randomizedTrade}
                    setRandomizedTrade={setRandomizedTrade}
                  />
                  <DexPosition
                    name="Fr0x"
                    randomizedTrade={randomizedTrade}
                    borrowedRatio={borrowedRatio}
                  />
                </>
              )}
            </div>
          </>
        )}
      </section>
    </>
  );
}
