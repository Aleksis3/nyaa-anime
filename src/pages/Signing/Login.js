import React, { useEffect, useState, useContext } from "react";
import styles from "./SigningForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import { logInWithEmailAndPassword } from "../../firebase";
import AuthContext from "../../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  return (
    <div className={styles["form"]}>
      <div className={styles["form__container"]}>
        <input
          type="text"
          className={styles["form__textBox"]}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className={styles["form__textBox"]}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className={styles["form__btn"]}
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>

        <p className={styles["form__switch-form"]}>
          Don't have an account? <Link to="/register">Register now </Link>
        </p>
      </div>
    </div>
  );
}
export default Login;
