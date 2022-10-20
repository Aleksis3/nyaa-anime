import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { logout } from "./../firebase";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

function Header() {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  return (
    <header className={styles.header}>
      <Link to="/">
        <p className={styles.logo}>Anime.nyaa</p>
      </Link>
      {!user && (
        <div>
          <Link to="/register">
            <button className={styles.register}>Register</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      )}
      {user && (
        <div>
          <Link to="/list">
            <button>My List</button>
          </Link>
          <button className={styles.logout} onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
