import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { registerWithEmailAndPassword, auth } from "../../firebase";
import styles from "./Register.module.css";

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const user = useContext(AuthContext);
  const navigate = useNavigate();
  const register = () => {
    if (!name) return alert("Please enter name");
    if (password !== confirmPassword) {
      return alert("Passwords must match!");
    }
    if (password.length < 6) {
      return alert("Password should be at least 6 characters long!");
    }
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    // if (loading) return;
    if (user) navigate("/", { replace: true });
  }, [user]);
  return (
    <div className={styles["register"]}>
      <div className={styles["register__container"]}>
        <input
          type="text"
          className={styles["register__textBox"]}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className={styles["register__textBox"]}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className={styles["register__textBox"]}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="password"
          className={styles["register__textBox"]}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
        <button className={styles["register__btn"]} onClick={register}>
          Register
        </button>
        <div className={styles["register__login"]}>
          Already have an account? <Link to="/login">Login now</Link>
        </div>
      </div>
    </div>
  );
}
export default Register;
