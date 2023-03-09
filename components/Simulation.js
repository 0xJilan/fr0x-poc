import { useState } from "react";
import { Inter } from "next/font/google";
import { getSimulation, toUSD } from "@/lib/Trade";

import styles from "@/styles/Simulation.module.css";
const inter = Inter({ subsets: ["latin"] });

export default function Simulation() {
  const [runs, setRuns] = useState(10);
  const [amountInPool, setAmountInPool] = useState(30000);
  const [simulationOutput, setSimulationOutput] = useState(null);
  const handleClick = () => {
    setSimulationOutput(getSimulation(runs, amountInPool));
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
              max="100"
              defaultValue={runs}
              onChange={(e) => setRuns(Number(e.target.value))}
            />
            <label htmlFor="runs">Runs: {runs}</label>
          </div>

          <div className={styles.inputWrapper}>
            <input
              type="range"
              id="amountInPool"
              name="amountInPool"
              min="10000"
              max="100000000"
              defaultValue={amountInPool}
              onChange={(e) => setAmountInPool(Number(e.target.value))}
            />
            <label htmlFor="runs">Amount In Pool: {toUSD(amountInPool)}</label>
            <br />
            <button onClick={handleClick} className={styles.buttonDesign}>
              Run {runs} trades!
            </button>
          </div>
          {simulationOutput && simulationOutput}
        </div>
      </section>
    </>
  );
}
