import style from "./Arrow.module.scss";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";

export default function Arrow() {
  return (
    <div className={style.arrowDiv}>
      <FaArrowUp
        size={20}
        className={style.icon}
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      />
      <FaArrowDown
        size={20}
        className={style.icon}
        onClick={() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
        }}
      />
    </div>
  );
}
