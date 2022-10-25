import React from "react";
import styles from "./Footer.module.css";
function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles["footer__text"]}>Made in 2022 by Łukasz Sodolski</p>
    </footer>
  );
}

export default Footer;
