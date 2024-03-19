import NavbarLogged from "../NavbarLogged/NavbarLogged";
import Footer from "../Footer/Footer";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Button from "../Button/Button";
import style from "./Error.module.scss";
import { FaExclamationCircle } from "react-icons/fa";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export default function Error({ refetch }) {
  const { isShown } = useSelector((state) => state.burgerMenuState);
  return (
    <>
      <NavbarLogged />
      <main className={isShown ? style.mainBurger : null}>
        {isShown ? (
          <BurgerMenu />
        ) : (
          <div className={style.errorContainer}>
            <FaExclamationCircle className={style.icon} />
            <div className={style.text}>
              <h1 className={style.banner}>Something went wrong.</h1>
              <p className={style.errorMsg}>
                It seems there was an error while fetching data. Please try
                again.
              </p>
            </div>
            <Button text={"Retry"} handleFunction={refetch} />
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

Error.propTypes = {
  refetch: PropTypes.func.isRequired,
};
