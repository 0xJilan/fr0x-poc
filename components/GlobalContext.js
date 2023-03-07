import { Inter } from "next/font/google";
import { toUSD } from "@/lib/Trade";
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
}) {
  return (
    <>
      <div className={styles.card}>
        <p className={inter.className}>
          Total Asset In Pool : {toUSD(totalAssetInThePool)}
        </p>
        <Edit
          label="edit totalAssetInThePool:"
          value={totalAssetInThePool}
          setValue={setTotalAssetInThePool}
        />
        <br />
        <p className={inter.className}>
          Total Asset Borrowed: {toUSD(totalAssetBorrowed)}
        </p>
        <Edit
          label="edit totalAssetBorrowed:"
          value={totalAssetBorrowed}
          setValue={setTotalAssetBorrowed}
        />
        <br />

        <p className={inter.className}>Borrowed Ratio : {borrowedRatio}</p>
        <br />
      </div>
    </>
  );
}
