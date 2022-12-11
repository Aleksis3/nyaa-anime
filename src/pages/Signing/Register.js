import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { registerWithEmailAndPassword } from "../../firebase";
import styles from "./SigningForm.module.css";

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
    <div className={styles["form"]}>
      <div className={styles["form__container"]}>
        <input
          type="text"
          className={styles["form__textBox"]}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Username"
        />
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
        <input
          type="password"
          className={styles["form__textBox"]}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
        <button className={styles["form__btn"]} onClick={register}>
          Register
        </button>
        <p className={styles["form__switch-form"]}>
          Already have an account? <Link to="/login">Login now</Link>
        </p>
      </div>
    </div>
  );
}
export default Register;
