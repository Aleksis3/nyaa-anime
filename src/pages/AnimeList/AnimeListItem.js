import React, { useState } from "react";
import styles from "./AnimeListItem.module.css";
import { Link } from "react-router-dom";
function AnimeListItem(props) {
  const dateToString = props.dateAdded.toDate().toLocaleDateString();

  let statusColor;
  switch (props.status) {
    case "Completed":
      statusColor = "green";
      break;
    case "Plan to Watch":
      statusColor = "gray";
      break;
    case "Dropped":
      statusColor = "red";
      break;
    case "On hold":
      statusColor = "yellow";
      break;
  }
  return (
    <tr className={styles["table-row"]}>
      <td className={styles["table-row__title"]}>
        <Link to={`/anime/${props.id}`}>{props.title}</Link>
      </td>
      <td>{props.episodes}</td>
      <td>{props.rating}</td>
      <td>{dateToString}</td>
      <td className={styles[statusColor]}>{props.status}</td>
      <td>
        <button
          className={styles["table__btn"]}
          onClick={() => props.handleShowModal(props.id)}
        >
          Edit
        </button>
      </td>
      <td>
        <img className={styles["table__img"]} src={`${props.img}`} alt="" />
      </td>
    </tr>
  );
}

export default AnimeListItem;
