import React from "react";
import AnimeRow from "./AnimeRow";
import styles from "./index.module.css";
function Main() {
  return (
    <div className={styles.main}>
      <AnimeRow rowTitle="Currently airing:" query="seasons/now" />
      <AnimeRow rowTitle="Top Anime:" query="top/anime" />
    </div>
  );
}

export default Main;
