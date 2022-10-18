import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import styles from "./AnimeRow.module.css";
import { SampleNextArrow } from "./AnimeRowArrows";
var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 6,
  prevArrow: <SampleNextArrow />,
};

function AnimeRow(props) {
  const [animeList, setAnimeList] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredId, setHoveredId] = useState("");

  const handleMouseOver = (e) => {
    console.log(e.target.offsetParent.id);
    setHoveredId(e.target.offsetParent.id);
  };

  const handleMouseOut = () => {
    setHoveredId("");
  };

  useEffect(() => {
    async function getAnime() {
      const response = await fetch(`https://api.jikan.moe/v4/${props.query}`);
      const data = await response.json();
      console.log(data);
      setAnimeList(data.data);
    }
    getAnime();
  }, []);

  const shortenedTitle = (title) => {
    if (title.length < 20) {
      return title;
    }
    return title.substring(20, 0) + "...";
  };

  const animeEls = animeList.map((anime) => (
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
  ));

  return (
    <section className={styles["anime-row"]}>
      <h3 className={styles["anime-row__title"]}>{props.rowTitle}</h3>
      <div className={styles["slider-container"]}>
        <Slider className={styles.slider} {...settings}>
          {animeEls}
        </Slider>
      </div>
      {/* <ul>{animeEls}</ul> */}
    </section>
  );
}

export default AnimeRow;
