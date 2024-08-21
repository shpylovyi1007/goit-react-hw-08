import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <a href="#" className={`${css.all} addHoverToLink`}>
        All rights reserved | 2024
      </a>
      <a href="#" className={`${css.privacy} addHoverToLink`}>
        Privacy policy / Terms and conditions
      </a>
    </footer>
  );
}