import css from "./Title.module.css";
import { Link } from "react-router-dom";

export default function Title() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Contacts app welcome page</h1>
      <p className={css.text}>
        The application is created especially for you so that you can easily
        save your contacts while traveling around the world
      </p>
      <Link to="/register" className={css.link}>
        <button className={`addHoverToButton ${css.btn} `}>Start</button>
      </Link>
    </div>
  );
}