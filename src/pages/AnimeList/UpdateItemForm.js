import React, { useEffect, useState, useRef } from "react";
import styles from "./UpdateItemForm.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
function UpdateItemForm({ editedAnimeId, img, title, id }) {
  // <p>{props.editedAnimeId}</p>
  const [user, loading, error] = useAuthState(auth);
  const [oldInputData, setOldInputData] = useState();
  const [inputData, setInputData] = useState({
    rating: "",
    episodes: null,
    status: "",
  });

  const inputDataHandler = (e) => {
    setInputData((prevInputData) => ({
      ...prevInputData,
      [e.target.name]: e.target.value,
    }));
  };

  const animeRef = doc(db, "users", `${user.uid}`, "anime-list", `${id}`);

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const docSnap = await getDoc(animeRef);
        setOldInputData(docSnap.data());
        setInputData(docSnap.data());
      } catch (e) {
        alert(e.message);
      }
    };
    fetchDoc();
  }, []);
  console.log(oldInputData);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await setDoc(
        animeRef,
        {
          ...(inputData.episodes && {
            episodes: inputData.episodes,
          }),
          ...(inputData.rating && {
            rating: inputData.rating,
          }),
          ...(inputData.status && {
            status: inputData.status,
          }),
          dateAdded: Timestamp.now(),
          ...(img && { img: img }),
          ...(title && { title: title }),
          ...(id && { id: id }),
        },

        { merge: true }
      );
    } catch (e) {
      alert(e.message);
    }
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles["form__item-wrapper"]}>
        <label htmlFor="xd">Episodes</label>
        <input
          name="episodes"
          onChange={inputDataHandler}
          type="number"
          id="xd"
          value={inputData?.episodes}
        />
      </div>
      <div className={styles["form__item-wrapper"]}>
        <label htmlFor="rating">Rating</label>
        <select
          id="rating"
          name="rating"
          onChange={inputDataHandler}
          value={inputData?.rating}
        >
          <option value="-">-</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
      <div className={styles["form__item-wrapper"]}>
        <label htmlFor="xd">Status</label>
        <select
          name="status"
          onChange={inputDataHandler}
          value={inputData?.status}
          id="xd"
        >
          <option value="Watching">Watching</option>
          <option value="Completed">Completed</option>
          <option value="Dropped">Dropped</option>
          <option value="On hold">On Hold</option>
        </select>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default UpdateItemForm;
