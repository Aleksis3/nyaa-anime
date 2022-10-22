import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useLocation, useParams } from "react-router-dom";
import styles from "./AnimeDetails.module.css";
import SuggestedItem from "./SuggestedItem";
import { db } from "../../firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function AnimeDetails() {
  const [user, loading, error] = useAuthState(auth);
  const [similars, setSimilars] = useState([]);
  const [animeData, setAnimeData] = useState();
  // const anime = useLocation().state;
  const { animeId } = useParams();
  const episodes = animeData?.episodes || "unknown";

  console.log(animeData);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
      const json = await data.json();
      setAnimeData(json.data);
    };
    fetchData();
  }, []);

  const handleAddTitle = async (e) => {
    e.preventDefault();
    try {
      await setDoc(
        doc(db, "users", `${user.uid}`, "anime-list", `${animeData.mal_id}`),
        {
          title: animeData.title,
          episodes: `4/${episodes}`,
          status: "watching",
          id: animeData.mal_id,
          img: animeData.images.jpg.image_url,
          dateAdded: Timestamp.now(),
        }
      );
    } catch (err) {
      alert(err);
    }
  };

  console.log(animeData);

  if (animeData) {
    return (
      <div className={styles["anime-details"]}>
        <div className={styles["anime-details-left"]}>
          <img
            className={styles["anime-details__img"]}
            src={`${animeData.images.jpg.large_image_url}`}
            alt="Anime cover image"
          ></img>
          <ul className={styles["anime-details__list"]}>
            <li>
              <span>Type:</span> {animeData.type}
            </li>
            <li>
              <span>Episodes:</span> {animeData.episodes || "Unknown"}
            </li>
            <li>
              <span>Duration:</span> {animeData.duration}
            </li>
          </ul>
        </div>
        <div className={styles["anime-details-right"]}>
          <p className={styles["anime-details__title"]}>{animeData.title}</p>
          {animeData.title !== animeData.titleEnglish && (
            <p className={styles["anime-details__alt-title"]}>
              {animeData.titleEnglish}
            </p>
          )}
          <p className={styles["anime-details__desc"]}>{animeData.synopsis}</p>

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
    );
  }
}

export default AnimeDetails;
