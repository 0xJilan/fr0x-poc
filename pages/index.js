import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Simulation from "@/components/Simulation";
import Position from "@/components/Position";
import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [page, setPage] = useState("POSITION");
  return (
    <>
      <Head>
        <title>Fr0x-POC</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={inter.className}>Fr0x Proof Of Concept</h1>
        <div className={styles.buttonWrapper}>
          <div
            className={`${styles.buttonPage} ${styles.left}`}
            onClick={() => setPage("POSITION")}
          >
            POSITION
          </div>
          <div
            className={`${styles.buttonPage} ${styles.right}`}
            onClick={() => setPage("SIMULATION")}
          >
            SIMULATION
          </div>
        </div>
        {page === "POSITION" && <Position />}
        {page === "SIMULATION" && <Simulation />}
      </main>
    </>
  );
}
