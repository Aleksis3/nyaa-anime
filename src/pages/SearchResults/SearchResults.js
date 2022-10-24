import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./SearchResults.module.css";
import SearchResultItem from "./SearchResultItem";
function SearchResults() {
  const [titles, setTitles] = useState([]);
  const params = useParams();
  const query = params.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
        if (!data.ok) {
          throw new Error(data.status);
        }
        const json = await data.json();
        setTitles(json.data);
      } catch (e) {
        alert(e.message);
      }
    };
    fetchData();
  }, []);

  const searchItemsEls = titles.map((title) => {
    return (
      <SearchResultItem
        desc={title.synopsis}
        title={title.title}
        type={title.type}
        img={title.images.jpg.image_url}
        id={title.mal_id}
      />
    );
  });
  console.log(titles);

  return (
    <div className={styles.results}>
      {titles.length > 0 && (
        <>
          <h1 className={styles["results__title"]}>
            The following titles have been found:
          </h1>
          <ul className={styles["results__list"]}>{searchItemsEls}</ul>
        </>
      )}
      {!titles.length && (
        <h1 className={styles["results__title"]}>
          Sadly, there doesn't seem to be any titles matching the searched
          phrase
        </h1>
      )}
    </div>
  );
}

export default SearchResults;
