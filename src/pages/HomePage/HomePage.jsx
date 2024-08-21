import Title from "../../components/Title/Title";
import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <section className={css.bcContainer}>
      <div className={css.container}>
        <Title />
      </div>
    </section>
  );
}