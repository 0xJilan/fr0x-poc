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

export default function GlobalContext({
  totalAssetInThePool,
  setTotalAssetInThePool,
  totalAssetBorrowed,
  setTotalAssetBorrowed,
  borrowedRatio,
  borrowBaseRate,
  setBorrowBaseRate,
  borrowPerSecondRate,
  setBorrowPerSecondRate,
  executionBaseFee,
  setExecutionBaseFee,
}) {
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
        <br />
        <p className={inter.className}>
          Execution Base Fee : {executionBaseFee}
        </p>
        <Edit
          label="edit executionFee:"
          value={executionBaseFee}
          setValue={setExecutionBaseFee}
        />
      </div>
    </>
  );
}
