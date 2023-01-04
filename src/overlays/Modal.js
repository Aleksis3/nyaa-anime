import React, { Children } from "react";
import { cloneElement } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
function Modal(props) {
  return createPortal(
    <div id="myModal" className={styles.modal}>
      <div className={styles["modal-content"]}>
        <button
          className={styles["modal-close"]}
          onClick={props.handleShowModal}
        >
          &times;
        </button>
        {Children.map(props.children, (child) => {
          return cloneElement(child, {
            ...child.props,
            handleShowModal: props.handleShowModal,
          });
        })}
      </div>
    </div>,
    document.getElementById("overlays")
  );
}

export default Modal;
