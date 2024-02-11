import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import styles from "./Heder.module.css";

function LowerHeader() {
  return (
    <div className={styles.lower_container}>
      <ul>
        <li>
          <AiOutlineMenu />
          <p>All</p>
        </li>
        <li>Today's Deals</li>
        <li>Customer Service</li>
        <li>Registry</li>
        <li>Gift Card</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default LowerHeader;
