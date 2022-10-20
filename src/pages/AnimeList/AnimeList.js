import React, { useEffect, useState } from "react";
import styles from "./AnimeList.module.css";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import AnimeListItem from "./AnimeListItem";
function UserList() {
  const [user, loading, error] = useAuthState(auth);
  const [animeList, setAnimeList] = useState([]);

  const collectionRef = collection(db, "users", `${user.uid}`, "anime-list");

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collectionRef);
      setAnimeList(querySnapshot);
      const animeData = [];
      querySnapshot.forEach((doc) => animeData.push(doc.data()));
      setAnimeList(animeData);
    };
    fetchData();
  }, []);

  console.log(animeList);
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const docSnap = await getDoc(docRef);
  //       console.log(docSnap.data());
  //       setAnimeList(docSnap.data());
  //     };
  //     fetchData();
  //   }, []);

  const animeListEls = animeList.map((anime) => {
    return (
      <AnimeListItem
        title={anime.title}
        status={anime.status}
        rating={anime.ratimg}
        episodes={anime.episodes}
        id={anime.id}
        key={anime.id}
        img={anime.img}
        dateAdded={anime.dateAdded}
      />
    );
  });

  return <table className={styles.table}>{animeListEls}</table>;
}

export default UserList;
