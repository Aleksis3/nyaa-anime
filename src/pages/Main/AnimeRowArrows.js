import styles from "./Arrows.module.css";
export const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "red",
        right: "200px",
        zindex: "10",
      }}
      onClick={onClick}
    />
  );
};

export const SamplePrevArrow = () => {
  return <div className={styles["prev-arrow"]} />;
};
