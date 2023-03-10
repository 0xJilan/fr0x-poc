import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import { getSimulation, toUSD } from "@/lib/Trade";

import styles from "@/styles/Simulation.module.css";
const inter = Inter({ subsets: ["latin"] });

export default function Simulation({ borrowedRatio }) {
  const [runs, setRuns] = useState(10);
  const [winRate, setWinRate] = useState(0.5);
  const [shareBorrowRate, setShareBorrowRate] = useState(0);
  const [amountInPool, setAmountInPool] = useState(30000);
  const [simulationOutput, setSimulationOutput] = useState(null);

  const handleClick = () => {
    setSimulationOutput(
      getSimulation(runs, amountInPool, borrowedRatio, winRate, shareBorrowRate)
    );
  };

  return (
    <>
      <section className={styles.section}>
        <h1 className={inter.className}>SIMULATION</h1>
        <div className={styles.card}>
          <div className={styles.inputWrapper}>
            <input
              type="range"
              id="runs"
              name="runs"
              min="10"
              max="10000"
              defaultValue={runs}
              onChange={(e) => setRuns(Number(e.target.value))}
            />
            <label htmlFor="runs">Runs: {runs}</label>
          </div>
          <div className={styles.inputWrapper}>
            <input
              type="range"
              id="winRate"
              name="winRate"
              min={0.05}
              max={0.95}
              step={0.01}
              defaultValue={winRate}
              onChange={(e) => setWinRate(Number(e.target.value))}
            />
            <label htmlFor="winRate">Traders win rate: {winRate}</label>
          </div>

          <div className={styles.inputWrapper}>
            <input
              type="range"
              id="shareBorrowRate"
              name="shareBorrowRate"
              min={0}
              max={1}
              step={0.01}
              defaultValue={shareBorrowRate}
              onChange={(e) => setShareBorrowRate(Number(e.target.value))}
            />
            <label htmlFor="winRate">
              Share of Borrow Fee keep by Pool: {shareBorrowRate}
            </label>
          </div>

          <div className={styles.inputWrapper}>
            <input
              type="range"
              id="amountInPool"
              name="amountInPool"
              min="10000"
              step={10000}
              max="1000000"
              defaultValue={amountInPool}
              onChange={(e) => setAmountInPool(Number(e.target.value))}
            />
            <label htmlFor="amountInPool">
              Amount In Pool: {toUSD(amountInPool)}
            </label>
            <br />
            <button onClick={handleClick} className={styles.buttonDesign}>
              Run {runs} trades!
            </button>
          </div>
          {simulationOutput && (
            <div className={styles.outputWrapper}>
              <p className={inter.className}>
                ENDING POOL: {toUSD(simulationOutput.poolBalance)}
              </p>
              <p className={inter.className}>
                POOL VARIATION:{" "}
                {Number(simulationOutput.poolEvolutionRate).toFixed(2)}%
              </p>
              <p className={inter.className}>
                POOL BALANCE + FEE EARNED :{" "}
                {toUSD(simulationOutput.poolBalanceWithBorrowFee)}
              </p>
              <p className={inter.className}>
                POOL BALANCE+ FEE EARNED VARIATION :{" "}
                {Number(
                  simulationOutput.poolEvolutionRateIncludingBorrowFee
                ).toFixed(2)}
                %
              </p>
              <p className={inter.className}>
                TOTAL BORROW FEE EARNED:{" "}
                {toUSD(simulationOutput.BorrowFeesEarned)}
              </p>
              <p className={inter.className}>
                TOTAL EXECUTION FEE EARNED:{" "}
                {toUSD(simulationOutput.OpenCloseFeeEarned)}
              </p>
              <p className={inter.className}>
                Executed trades: {simulationOutput.executedTrades}
              </p>
              <p className={inter.className}>
                Executed Trades %:
                {Number(simulationOutput.executedTradesPercent).toFixed(2)}
              </p>
              <p className={inter.className}>
                Final Trader winning rate %:
                {Number(simulationOutput.trueWinningRate).toFixed(2)}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
