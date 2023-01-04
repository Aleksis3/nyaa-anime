import React from "react";
import { Link } from "react-router-dom";
import styles from "./SearchResultItem.module.css";
function SearchResultItem(props) {
  const shortenDesc = (desc) => {
    if (desc.length > 250) {
      return desc.substring(0, 250) + "...";
    }
    return desc;
  };

  return (
    <Link to={`/anime/${props.id}`}>
      <li className={styles.item}>
        <img src={props.img} className={styles.img} alt="" />
        <div className={styles.a}>
          <p className={styles.title}>{props.title}</p>
          <p className={styles.desc}>{shortenDesc(props.desc)}</p>
          <p className={styles.type}>{props.type}</p>
        </div>
      </li>
    </Link>
  );
}

export default SearchResultItem;
