import style from "./LoadingSpinner.module.scss";
import { PulseLoader } from "react-spinners";

export default function LoadingSpinner() {
  return (
    <div className={style.loadingDiv}>
      <PulseLoader size={50} color="#0074e4" />
    </div>
  );
}
