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
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const user = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/");
  }, [user]);

  const userListRef = collection(db, "users", `${user?.uid}`, "anime-list");

  const q = query(userListRef, orderBy(sortBy));
  useEffect(() => {
    const fetchData = async () => {
      try {
        onSnapshot(q, (snapshot) => {
          const querySnapshot = snapshot.docs;
          const animeData = [];
          querySnapshot.forEach((doc) => animeData.push(doc.data()));
          if (sortOrder === "asc") {
            setAnimeList(animeData);
          } else {
            setAnimeList(animeData.reverse());
          }
        });
      } catch (e) {
        alert(e.message);
      }
    };
    fetchData();
  }, [sortBy, sortOrder]);

  function handleShowModal(animeId) {
    setEditedAnimeId(animeId);
    setIsModalOpen((prevState) => !prevState);
  }

  const animeListEls = animeList.map((anime) => {
    return (
      <AnimeListItem
        title={anime.title}
        status={anime.status}
        rating={anime.rating}
        episodes={anime.episodes}
        episodesCount={anime.episodesCount}
        id={anime.id}
        key={anime.id}
        img={anime.img}
        dateUpdated={anime.dateUpdated}
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
      <div className={styles["queries-container"]}>
        <label htmlFor="queries">Sort by:</label>
        <select
          id="queries"
          className={styles["queries-container__select"]}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="rating">Rating</option>
          <option value="status">Status</option>
          <option value="dateUpdated">Date Updated</option>
        </select>
        <label htmlFor="order">Order:</label>
        <select
          id="order"
          className={styles["queries-container__select"]}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc"> {String.fromCharCode(8593)} </option>
          <option value="desc"> {String.fromCharCode(8595)} </option>
        </select>
      </div>
      <div className={styles["table-container"]}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Episodes</th>
              <th>Rating</th>
              <th>Date updated</th>
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
