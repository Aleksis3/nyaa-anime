import React, { useEffect } from "react";
import styles from "./UpdateItemForm.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
function UpdateItemForm({ editedAnimeId }) {
  // <p>{props.editedAnimeId}</p>
  const [user, loading, error] = useAuthState(auth);

  const animeRef = doc(
    db,
    "users",
    `${user.uid}`,
    "anime-list",
    `${editedAnimeId}`
  );

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await setDoc(
        animeRef,
        {
          episodes: 25,
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
        <input type="number" id="xd" />
      </div>
      <div className={styles["form__item-wrapper"]}>
        <label htmlFor="xd">Status</label>
        <select id="xd">
          <option value="volvo">Watching</option>
          <option value="saab">Completed</option>
          <option value="mercedes">Dropped</option>
          <option value="audi">On Hold</option>
        </select>
      </div>
      <div className={styles["form__item-wrapper"]}>
        <label htmlFor="xd">Rating</label>
        <select id="xd">
          <option value="volvo">-</option>
          <option value="volvo">1</option>
          <option value="saab">2</option>
          <option value="mercedes">3</option>
          <option value="audi">4</option>
          <option value="volvo">5</option>
          <option value="saab">6</option>
          <option value="mercedes">7</option>
          <option value="audi">8</option>
          <option value="volvo">9</option>
          <option value="saab">10</option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default UpdateItemForm;
