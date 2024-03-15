import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import style from "./Button.module.scss";

export default function Button({ text, handleFunction, link }) {
  return (
    <Link to={link}>
      <button className={style.customButton} onClick={handleFunction}>
        {text}
      </button>
    </Link>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  handleFunction: PropTypes.func,
  link: PropTypes.string,
};
