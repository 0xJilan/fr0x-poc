import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import styles from "@/styles/GlobalContext.module.css";
const inter = Inter({ subsets: ["latin"] });

const Edit = ({ label, value, setValue }) => {
  return (
    <label>
      {label}
      <input
        style={{ width: "100px" }}
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </label>
  );
};

export default function GlobalContext() {
  const [totalAssetInThePool, setTotalAssetInThePool] = useState(1000000);
  const [totalAssetBorrowed, setTotalAssetBorrowed] = useState(730000);
  const [borrowedRatio, setBorrowedRatio] = useState(0);
  const [borrowBaseRate, setBorrowBaseRate] = useState(0.015);
  const [borrowPerSecondRate, setBorrowPerSecondRate] = useState(
    (4.166 / 10 ** 8).toFixed(11)
  );

  useEffect(() => {
    setBorrowedRatio(totalAssetBorrowed / totalAssetInThePool);
  }, [totalAssetInThePool, totalAssetBorrowed]);

  return (
    <>
      <div className={styles.card}>
        <p className={inter.className}>
          Total Asset In Pool : {totalAssetInThePool}$
        </p>
        <Edit
          label="edit totalAssetInThePool:"
          value={totalAssetInThePool}
          setValue={setTotalAssetInThePool}
        />
        <br />
        <p className={inter.className}>
          Total Asset Borrowed: {totalAssetBorrowed}$
        </p>
        <Edit
          label="edit totalAssetBorrowed:"
          value={totalAssetBorrowed}
          setValue={setTotalAssetBorrowed}
        />
        <br />

        <p className={inter.className}>Borrowed Ratio : {borrowedRatio}</p>
        <br />
        <p className={inter.className}>Borrow Base Rate: {borrowBaseRate}</p>
        <Edit
          label="edit borrowBaseRate:"
          value={borrowBaseRate}
          setValue={setBorrowBaseRate}
        />
        <br />

        <p className={inter.className}>
          Borrow Per Seconds Rate : {borrowPerSecondRate}
        </p>
        <Edit
          label="edit borrowBaseRate:"
          value={borrowPerSecondRate}
          setValue={setBorrowPerSecondRate}
        />
      </div>
    </>
  );
}
