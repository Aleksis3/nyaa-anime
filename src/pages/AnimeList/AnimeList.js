import React, { useEffect, useState, useContext } from "react";
import styles from "./AnimeList.module.css";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import Modal from "../../overlays/Modal";
import AnimeListItem from "./AnimeListItem";
import UpdateItemForm from "../../components/UpdateItemForm/UpdateItemForm";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function UserList() {
  const [animeList, setAnimeList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedAnimeId, setEditedAnimeId] = useState();

  const user = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/");
  }, [user]);

  const collectionRef = collection(db, "users", `${user?.uid}`, "anime-list");

  const sort = (title) => {};
  const q = query(collectionRef, orderBy("title"));
  useEffect(() => {
    const fetchData = async () => {
      try {
        onSnapshot(q, (snapshot) => {
          const querySnapshot = snapshot.docs;
          const animeData = [];
          querySnapshot.forEach((doc) => animeData.push(doc.data()));
          setAnimeList(animeData.reverse());

          console.log(q.docs());
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
          <UpdateItemForm id={editedAnimeId} closeModal={handleShowModal} />
        </Modal>
      )}
      <div>
        <p>Sort by:</p>
        <button></button>
      </div>
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
