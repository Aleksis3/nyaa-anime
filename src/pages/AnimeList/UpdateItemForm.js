import React, { useEffect, useState, useRef } from "react";
import styles from "./UpdateItemForm.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
function UpdateItemForm({ editedAnimeId, img, title, id }) {
  // <p>{props.editedAnimeId}</p>
  const [user, loading, error] = useAuthState(auth);
  const [prevInputData, setPrevInputData] = useState();
  // const [userInput, setUserInput] = useState({
  //   status: "",
  //   episodes: "",
  //   rating: "",
  // });
  const statusRef = useRef();
  const episodesRef = useRef();
  const ratingRef = useRef();

  const animeRef = doc(db, "users", `${user.uid}`, "anime-list", `${id}`);

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const docSnap = await getDoc(animeRef);
        setPrevInputData(docSnap.data());
      } catch (e) {
        alert(e.message);
      }
    };
    fetchDoc();
  }, []);
  console.log(prevInputData);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await setDoc(
        animeRef,
        {
          ...(episodesRef.current.value.length && {
            episodes: episodesRef.current.value,
          }),
          ...(ratingRef.current.value.length && {
            rating: ratingRef.current.value,
          }),
          ...(statusRef.current.value.length && {
            status: statusRef.current.value,
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
          ref={episodesRef}
          type="number"
          id="xd"
          defaultValue={prevInputData?.episodes}
        />
      </div>
      <div className={styles["form__item-wrapper"]}>
        <label htmlFor="rating">Rating</label>
        <select ref={ratingRef} id="rating">
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
        <select ref={statusRef} value={prevInputData?.status} id="xd">
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
