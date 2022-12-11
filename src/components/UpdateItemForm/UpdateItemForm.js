import React, { useEffect, useState, useContext } from "react";
import styles from "./UpdateItemForm.module.css";
import { db } from "../../firebase";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import AuthContext from "../../context/AuthContext";

function UpdateItemForm({ img, title, id, episodesCount, handleShowModal }) {
  const user = useContext(AuthContext);
  const [inputData, setInputData] = useState({});

  const [animateBtn, setAnimateBtn] = useState(false);

  const inputDataHandler = (e) => {
    // Ensures episodes type to be int for a proper sorting
    if ((e.target.id === "rating") & (e.target.value !== "-")) {
      setInputData((prevInputData) => ({
        ...prevInputData,
        [e.target.id]: parseInt(e.target.value),
      }));
    } else {
      setInputData((prevInputData) => ({
        ...prevInputData,
        [e.target.id]: e.target.value,
      }));
    }
  };

  const animeRef = doc(db, "users", `${user.uid}`, "anime-list", `${id}`);

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const docSnap = await getDoc(animeRef);
        {
          docSnap._document
            ? setInputData(docSnap.data())
            : setInputData({ rating: "-", episodes: "0", status: "Watching" });
        }
      } catch (e) {
        alert(e.message);
      }
    };
    fetchDoc();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setAnimateBtn(true);
      await setDoc(
        animeRef,
        {
          ...(inputData.episodes && {
            episodes: inputData.episodes,
          }),
          ...(episodesCount && {
            episodesCount: episodesCount,
          }),
          ...(inputData.rating && {
            rating: inputData.rating,
          }),
          ...(inputData.status && {
            status: inputData.status,
          }),
          dateUpdated: Timestamp.now(),
          ...(img && { img: img }),
          ...(title && { title: title }),
          ...(id && { id: id }),
        },

        { merge: true }
      );

      setTimeout(() => setAnimateBtn(false), 100);
      {
        handleShowModal && handleShowModal();
      }
    } catch (e) {
      alert(e.message);
    }
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <div className={styles["form__items-wrapper"]}>
          <div className={styles["form__item-wrapper"]}>
            <label htmlFor="episodes">Episodes</label>
            <input
              onChange={inputDataHandler}
              type="number"
              min="0"
              max={inputData.episodesCount || episodesCount}
              id="episodes"
              value={inputData.episodes}
            />
          </div>
          <div className={styles["form__item-wrapper"]}>
            <label htmlFor="rating">Rating</label>
            <select
              id="rating"
              onChange={inputDataHandler}
              value={inputData.rating}
            >
              <option value="-">-</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
          </div>
          <div className={styles["form__item-wrapper"]}>
            <label htmlFor="status">Status</label>
            <select
              onChange={inputDataHandler}
              value={inputData.status}
              id="status"
            >
              <option value="Watching">Watching</option>
              <option value="Plan to Watch">Plan to Watch</option>
              <option value="Completed">Completed</option>
              <option value="Dropped">Dropped</option>
              <option value="On hold">On Hold</option>
            </select>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className={`${styles.form__btn} ${
          animateBtn ? styles["form__btn-submit"] : ""
        }`}
      >
        Submit
      </button>
    </form>
  );
}

export default UpdateItemForm;
