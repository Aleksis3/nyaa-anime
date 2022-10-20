import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useLocation } from "react-router-dom";
import styles from "./AnimeDetails.module.css";
import SuggestedItem from "./SuggestedItem";
import { db } from "../../firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function AnimeDetails() {
  const [user, loading, error] = useAuthState(auth);
  const [similars, setSimilars] = useState([]);
  const anime = useLocation().state;
  const episodes = anime.episodes || "unknown";

  console.log(anime);

  const handleAddTitle = async (e) => {
    e.preventDefault();
    try {
      await setDoc(
        doc(db, "users", `${user.uid}`, "anime-list", `${anime.id}`),
        {
          title: anime.title,
          episodes: `4/${episodes}`,
          status: "watching",
          id: anime.id,
          img: anime.img,
          dateAdded: Timestamp.now(),
        }
      );
    } catch (err) {
      alert(err);
    }
  };

  // const sliderSettings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 4,
  //   slidesToScroll: 6,
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await fetch(
  //       `https://api.jikan.moe/v4/anime/${anime.id}/recommendations`
  //     );
  //     const res = await data.json();
  //     setSimilars(res.data);
  //   };
  //   fetchData();
  // }, []);
  // console.log(similars);

  const similarEls = similars.map((similar) => (
    <SuggestedItem
      title={similar.entry.title}
      img={similar.entry.images.jpg.image_url}
    />
  ));

  return (
    <div className={styles["anime-details"]}>
      <div className={styles["anime-details-left"]}>
        <img
          className={styles["anime-details__img"]}
          src={`${anime.largeImg}`}
          alt="Anime cover image"
        ></img>
        <ul className={styles["anime-details__list"]}>
          <li>
            <span>Type:</span> {anime.type}
          </li>
          <li>
            <span>Episodes:</span> {anime.episodes || "Unknown"}
          </li>
          <li>
            <span>Duration:</span> {anime.duration}
          </li>
        </ul>
      </div>
      <div className={styles["anime-details-right"]}>
        <p className={styles["anime-details__title"]}>{anime.title}</p>
        {anime.title !== anime.titleEnglish && (
          <p className={styles["anime-details__alt-title"]}>
            {anime.titleEnglish}
          </p>
        )}
        <p className={styles["anime-details__desc"]}>{anime.desc}</p>

        <div>
          <button
            onClick={handleAddTitle}
            className={styles["anime-details__bttn"]}
          >
            +Add to list
          </button>
        </div>
      </div>
    </div>
    /* <div className={styles["slider-container"]}>
        <p>Similiar anime:</p>
        <Slider className={styles.slider} {...sliderSettings}>
          {similarEls}
        </Slider>
      </div> */
  );
}

export default AnimeDetails;
