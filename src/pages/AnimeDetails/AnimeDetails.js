import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import styles from "./AnimeDetails.module.css";
import UpdateItemForm from "../../components/UpdateItemForm/UpdateItemForm";
import AnimeRow from "../../components/AnimeRow/AnimeRow";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";
function AnimeDetails() {
  const user = useContext(AuthContext);
  const [animeData, setAnimeData] = useState();
  const [error, setError] = useState();
  const { animeId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
        if (!data.ok) {
          const e = await data.json();
          throw e;
        }
        const json = await data.json();
        setAnimeData(json.data);
        window.scrollTo(0, 0);
      } catch (e) {
        setError(e.message);
      }
    };
    fetchData();
  }, [animeId]);

  if (error) {
    return <p className={styles["anime-details__error"]}>Error: {error}</p>;
  }

  if (animeData) {
    return (
      <div className={styles["anime-details"]}>
        <div className={styles["anime-details-left"]}>
          <div className={styles["test"]}>
            <img
              className={styles["anime-details__img"]}
              src={`${animeData.images.jpg.large_image_url}`}
              alt="Anime cover image"
            ></img>
            <ul className={styles["anime-details__list"]}>
              <li>
                <span>Type:</span> {animeData.type || "Unknown"}
              </li>
              <li>
                <span>Episodes:</span> {animeData.episodes || "Unknown"}
              </li>
              <li>
                <span>Year:</span> {animeData.year || "?"}
              </li>
              <li>
                <span>Source:</span> {animeData.source || "Unknown"}
              </li>
              <li>
                <span>Duration:</span> {animeData.duration || "?"}
              </li>
              <li>
                <span>Status:</span> {animeData.status || "Unknown"}
              </li>
            </ul>
          </div>

          <div className={styles["anime-details__form-container"]}>
            {user ? (
              <UpdateItemForm
                id={animeData.mal_id}
                img={animeData.images.jpg.image_url}
                title={animeData.title}
                episodesCount={animeData.episodes}
              />
            ) : (
              <p className={styles["anime-details__login-prompt"]}>
                You must me <Link to="/login">logged in</Link> to edit your list
              </p>
            )}
          </div>
        </div>
        <div className={styles["anime-details-right"]}>
          <p className={styles["anime-details__title"]}>{animeData.title}</p>
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
