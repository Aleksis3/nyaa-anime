import React, { useContext } from "react";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "./../firebase";
import AuthContext from "../context/AuthContext";
function Header() {
  const user = useContext(AuthContext);
  const navigate = useNavigate();

  const searchInputHandler = (e) => {
    if (e.key === "Enter") {
      navigate(`/search/${e.target.value}`);
      e.target.value = "";
    }
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <p>Anime.nyaa</p>
      </Link>
      <input
        className={styles.header__input}
        type="text"
        placeholder="Search for a specific title"
        onKeyPress={searchInputHandler}
      />
      {!user && (
        <div className={styles.buttons}>
          <Link to="/register">
            <button className={(styles.register, styles.button)}>
              Register
            </button>
          </Link>
          <Link to="/login">
            <button className={styles.button}>Login</button>
          </Link>
        </div>
      )}
      {user && (
        <div className={styles.buttons}>
          <Link to="/list">
            <button className={styles.button}>My List</button>
          </Link>
          <button className={(styles.logout, styles.button)} onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
