import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./AnimeDetails.module.css";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import UpdateItemForm from "../../components/UpdateItemForm";
import AnimeRow from "../../components/AnimeRow";

function AnimeDetails() {
  const [user, loading, error] = useAuthState(auth);
  const [similars, setSimilars] = useState([]);
  const [animeData, setAnimeData] = useState();
  // const anime = useLocation().state;
  const { animeId } = useParams();
  // const episodes = animeData?.episodes || "unknown";

  console.log(animeData);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
      const json = await data.json();
      setAnimeData(json.data);
      window.scrollTo(0, 0);
    };
    fetchData();
  }, [animeId]);

  console.log(animeData);

  if (!animeData) {
    return <p>fsfs</p>;
  }

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
              <span>Year:</span> {animeData.year}
            </li>
            <li>
              <span>Duration:</span> {animeData.duration}
            </li>
            <li>
              <span>Status:</span> {animeData.status}
            </li>
          </ul>
          {user && (
            <div className={styles["form-container"]}>
              <UpdateItemForm
                id={animeData.mal_id}
                img={animeData.images.jpg.image_url}
                title={animeData.title}
              />
            </div>
          )}
        </div>
        <div className={styles["anime-details-right"]}>
          <p className={styles["anime-details__title"]}>{animeData.title}</p>
          {animeData.title !== animeData.titleEnglish && (
            <p className={styles["anime-details__alt-title"]}>
              {animeData.titleEnglish}
            </p>
          )}
          <p className={styles["anime-details__desc"]}>{animeData.synopsis}</p>
          <div className={styles["similiar-anime__container"]}>
            <AnimeRow
              isSmall={true}
              rowTitle="Similar anime:"
              query={`anime/${animeId}/recommendations`}
              isRec={true}
            ></AnimeRow>
          </div>
        </div>
      </div>
    );
  }
}

export default AnimeDetails;
