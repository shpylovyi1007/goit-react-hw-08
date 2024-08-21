import LogInForm from "../../components/LogInForm/LogInForm";
import css from './LoginPage.module.css'

export default function LoginPage() {
  return (
    <section className={css.container}>
      <LogInForm />
    </section>
  );
}