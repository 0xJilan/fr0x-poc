import { useState } from "react";
import { Inter } from "next/font/google";
import styles from "@/styles/Simulation.module.css";
const inter = Inter({ subsets: ["latin"] });

const Input = ({ label, value, setValue }) => {
  return (
    <label>
      {label}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </label>
  );
};

export default function Simulation() {
  const [entryPrice, setEntryPrice] = useState("");
  return (
    <>
      <section className={styles.section}>
        <h1 className={inter.className}>SIMULATION</h1>
        <div className={styles.card}>
          <Input
            label="Entry Price:"
            value={entryPrice}
            setValue={setEntryPrice}
          />
        </div>
      </section>
    </>
  );
}
