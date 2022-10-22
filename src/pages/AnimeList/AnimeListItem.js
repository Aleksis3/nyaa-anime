import React, { useState } from "react";
import styles from "./AnimeListItem.module.css";
import { Link } from "react-router-dom";
function AnimeListItem(props) {
  const dateToString = props.dateAdded.toDate().toLocaleDateString();

  return (
    <tr className={styles["table-row"]}>
      <td className={styles["table-row__title"]}>
        <Link to={`/anime/${props.id}`}>{props.title}</Link>
      </td>
      <td>{props.episodes}</td>
      <td>{props.rating}</td>
      <td>{dateToString}</td>
      <td>{props.status}</td>
      <td>
        <button onClick={() => props.handleShowModal(props.id)}>Edit</button>
      </td>
      <td>
        <img className={styles["table__img"]} src={`${props.img}`} alt="" />
      </td>
    </tr>
  );
}

export default AnimeListItem;
