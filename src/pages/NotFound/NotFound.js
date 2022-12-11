import React from "react";
import { Link } from "react-router-dom";
import btnStyle from "../../components/Button/Button.module.css";
import styles from "./NotFound.module.css";
function NotFound() {
  return (
    <div className={styles["not-found"]}>
      <h1 className={styles["not-found__header"]}>
        <span>404:</span> it seems like you 've got lost...
      </h1>
      <Link className={btnStyle["button"]} to="/">
        Start over...
      </Link>
    </div>
  );
}

export default NotFound;
