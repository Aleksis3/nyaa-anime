import React, { useState } from "react";
import styles from "./AnimeRowItem.module.css";
import { useNavigate, Link } from "react-router-dom";

function AnimeItem(props) {
  const [hoveredId, setHoveredId] = useState("");
  const [mouseMoved, setMouseMoved] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!mouseMoved) {
      navigate(`/anime/${props.id}`);
    }
  };

  const shortenedTitle = (title) => {
    if (title.length < 20) {
      return title;
    }
    return title.substring(20, 0) + "...";
  };

  const handleMouseOver = (e) => {
    console.log(e.target.offsetParent.id);
    setHoveredId(e.target.offsetParent.id);
  };

  const handleMouseOut = () => {
    setHoveredId("");
  };

  return (
    <Link
      style={{ textDecoration: "none" }}
      onMouseMove={() => setMouseMoved(true)}
      onTouchMove={() => setMouseMoved(true)}
      onMouseDown={() => setMouseMoved(false)}
      onTouchStart={() => setMouseMoved(false)}
      onTouchEnd={() => handleClick()}
      onMouseUp={() => handleClick()}
    >
      <div
        onMouseOver={(anime) => handleMouseOver(anime)}
        onMouseOut={handleMouseOut}
        className={styles["anime-item"]}
        key={props.key}
        id={props.id}
      >
        <div className={styles["anime-item__title-container"]}>
          <p className={styles["anime-item__title"]}>
            {shortenedTitle(props.title)}
          </p>
        </div>
        <div className={styles["anime-img__container"]}>
          <img
            className={
              props.isSmall
                ? styles["anime-item__img--small"]
                : styles["anime-item__img"]
            }
            src={`${props.img}`}
            alt="Anime's cover image"
            id={props.id}
          />
        </div>
        <div
          className={
            props.id == hoveredId
              ? styles["anime-item__full-name"]
              : styles["hidden"]
          }
        >
          {props.title}
        </div>
      </div>
    </Link>
  );
}

export default AnimeItem;
