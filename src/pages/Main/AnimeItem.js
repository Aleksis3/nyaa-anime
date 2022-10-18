import React from "react";

function AnimeItem(props) {
  const shortenedTitle = (title) => {
    if (title.length < 20) {
      return title;
    }
    return title.substring(20, 0) + "...";
  };

  return (
    <div
      onMouseOver={(anime) => handleMouseOver(anime)}
      onMouseOut={handleMouseOut}
      className={styles["anime-item"]}
      key={anime.mal_id}
      id={anime.mal_id}
    >
      <p className={styles["anime-item__title"]}>
        {shortenedTitle(anime.title)}
      </p>
      <div className={styles["anime-img__container"]}>
        <img
          className={styles["anime-item__img"]}
          src={`${anime.images.jpg.image_url}`}
          alt="Anime's cover image"
          id={anime.mal_id}
        />
      </div>
      <div
        className={
          anime.mal_id == hoveredId
            ? styles["anime-item__full-name"]
            : styles["hidden"]
        }
      >
        {anime.title}
      </div>
    </div>
  );
}

export default AnimeItem;
