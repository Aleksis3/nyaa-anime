import React from "react";
import AnimeRow from "../../components/AnimeRow/AnimeRow";

function Main() {
  return (
    <>
      <AnimeRow rowTitle="Currently airing:" query="seasons/now" />
      <AnimeRow rowTitle="Top Anime:" query="top/anime" />
      <AnimeRow rowTitle="Romance Anime:" query="anime?genres=23"></AnimeRow>
    </>
  );
}

export default Main;
