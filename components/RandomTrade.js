import { Inter } from "next/font/google";
import styles from "@/styles/Position.module.css";
import { getSecondsInTime, toUSD } from "@/lib/Trade";

const inter = Inter({ subsets: ["latin"] });

export default function RandomTrade({ randomizedTrade }) {
  return (
    <>
      <div className={styles.card}>
        <h2 className={inter.className}>Randomize Trade</h2>

        {randomizedTrade && (
          <>
            <br />
            <p className={inter.className}>
              Side: {randomizedTrade.isLong ? "Long" : "Short"}
            </p>
            <br />
            <p className={inter.className}>
              Expiration: {getSecondsInTime(Number(randomizedTrade.expiration))}
            </p>
            <br />
            <p className={inter.className}>
              Entry: {toUSD(randomizedTrade.entryPrice)}
            </p>
            <br />
            <p className={inter.className}>
              Stop Loss: {toUSD(randomizedTrade.stopLossPrice)}
            </p>
            <br />
            <p className={inter.className}>
              Take Profit: {toUSD(randomizedTrade.takeProfitPrice)}
            </p>
            <br />

            <p className={inter.className}>
              Position Value: {toUSD(randomizedTrade.value)}
            </p>
            <br />
            <p className={inter.className}>***** FINALITY *****</p>
            <br />
            <p className={inter.className}>Status: {randomizedTrade.status}</p>
            <br />
            <p className={inter.className}>
              Duration: {getSecondsInTime(Number(randomizedTrade.duration))}
            </p>
            <br />
            <p className={inter.className}>
              Result: {randomizedTrade.isWinning ? "Win" : "Loose"}
            </p>
            <br />
            <p className={inter.className}>
              Exit Price: {toUSD(randomizedTrade.exitPrice)}
            </p>
          </>
        )}
      </div>
    </>
  );
}
