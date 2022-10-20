import React from "react";
import styles from "./AnimeListItem.module.css";
import { Timestamp } from "firebase/firestore";
function AnimeListItem(props) {
  const dateToString = props.dateAdded.toDate().toLocaleDateString();
  return (
    <li className={styles["list-item"]}>
      <span>{props.title}</span>
      <span>{props.episodes}</span>
      <span>{dateToString}</span>
      <span>{props.status}</span>
      <span>{props.rating}</span>

      <img src={`${props.img}`} alt="" className={styles["list-item__img"]} />
    </li>
  );
}

export default AnimeListItem;
