import React from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
function Modal(props) {
  return createPortal(
    <div id="myModal" className={styles.modal}>
      <div className={styles["modal-content"]}>
        <button onClick={props.handleShowModal} class="close">
          &times;
        </button>
        {props.children}
      </div>
    </div>,
    document.getElementById("overlays")
  );
}

export default Modal;
