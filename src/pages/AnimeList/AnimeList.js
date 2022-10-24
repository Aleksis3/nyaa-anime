import React, { useEffect, useState } from "react";
import styles from "./AnimeList.module.css";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import Modal from "../../overlays/Modal";
import AnimeListItem from "./AnimeListItem";
import UpdateItemForm from "../../components/UpdateItemForm";

function UserList() {
  const [user, loading, error] = useAuthState(auth);
  const [animeList, setAnimeList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedAnimeId, setEditedAnimeId] = useState();

  const collectionRef = collection(db, "users", `${user.uid}`, "anime-list");

  useEffect(() => {
    const fetchData = async () => {
      try {
        onSnapshot(collectionRef, (snapshot) => {
          const querySnapshot = snapshot.docs;
          const animeData = [];
          querySnapshot.forEach((doc) => animeData.push(doc.data()));
          setAnimeList(animeData);
        });
      } catch (e) {
        alert(e.message);
      }
    };
    fetchData();
  }, []);

  function handleShowModal(animeId) {
    setEditedAnimeId(animeId);
    setIsModalOpen((prevState) => !prevState);
  }

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
        rating={anime.rating}
        episodes={anime.episodes}
        id={anime.id}
        key={anime.id}
        img={anime.img}
        dateAdded={anime.dateAdded}
        handleShowModal={handleShowModal}
      />
    );
  });

  return (
    <div style={{ overflowX: "auto" }}>
      {isModalOpen && (
        <Modal handleShowModal={handleShowModal}>
          <UpdateItemForm id={editedAnimeId} />
        </Modal>
      )}
      <div className={styles["table-container"]}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Episodes</th>
              <th>Rating</th>
              <th>Date added</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{animeListEls}</tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;
