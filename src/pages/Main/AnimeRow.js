import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import AnimeItem from "./AnimeItem";
import styles from "./AnimeRow.module.css";
import { SampleNextArrow } from "./AnimeRowArrows";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 6,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function AnimeRow(props) {
  const [animeList, setAnimeList] = useState([]);

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
    <AnimeItem
      key={anime.mal_id}
      id={anime.mal_id}
      type={anime.type}
      title={anime.title}
      titleEnglish={anime.title_english}
      desc={anime.synopsis}
      score={anime.score}
      episodes={anime.episodes}
      duration={anime.duration}
      img={anime.images.jpg.image_url}
      largeImg={anime.images.jpg.large_image_url}
    />
  ));

  return (
    <section className={styles["anime-row"]}>
      <h3 className={styles["anime-row__title"]}>{props.rowTitle}</h3>
      <div className={styles["slider-container"]}>
        <Slider className={styles.slider} {...settings}>
          {animeEls}
        </Slider>
      </div>
    </section>
  );
}

export default AnimeRow;
