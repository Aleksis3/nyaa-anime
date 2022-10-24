import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import AnimeRowItem from "./AnimeRowItem";
import styles from "./AnimeRow.module.css";
import { SampleNextArrow } from "../pages/Main/AnimeRowArrows";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 6,
  responsive: [
    // {
    //   breakpoint: 1024,
    //   settings: {
    //     slidesToShow: 4,
    //     slidesToScroll: 4,
    //     infinite: true,
    //     dots: false,
    //   },
    // },
    {
      breakpoint: 650,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 410,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
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
      setAnimeList(data.data);
      console.log(data.data);
    }
    getAnime();
  }, []);

  const shortenedTitle = (title) => {
    if (title.length < 20) {
      return title;
    }
    return title.substring(20, 0) + "...";
  };

  const animeEls = animeList.map((anime) =>
    props.isRec ? (
      <AnimeRowItem
        key={anime.entry.mal_id}
        id={anime.entry.mal_id}
        title={anime.entry.title}
        img={anime.entry.images.jpg.image_url}
        isSmall={props.isSmall}
      />
    ) : (
      <AnimeRowItem
        key={anime.mal_id}
        id={anime.mal_id}
        title={anime.title}
        desc={anime.synopsis}
        img={anime.images.jpg.image_url}
        isSmall={props.isSmall}
      />
    )
  );

  if (animeList <= 0) {
    return <p>Loading...</p>;
  }

  return (
    <section
      className={
        props.isSmall ? styles["anime-row--small"] : styles["anime-row"]
      }
    >
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
