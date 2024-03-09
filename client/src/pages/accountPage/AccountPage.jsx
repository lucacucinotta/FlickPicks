import NavbarLogged from "../../components/NavbarLogged/NavbarLogged";
import Footer from "../../components/Footer/Footer";
import style from "./AccountPage.module.scss";

export default function AccountPage() {
  return (
    <div className={style.wrapper}>
      <NavbarLogged />
      <main></main>
      <Footer />
    </div>
  );
}
