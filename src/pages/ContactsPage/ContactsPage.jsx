import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import ContactList from "../../components/ContactList/ContactList";
import css from "./ContactsPage.module.css";

export default function ContactsPage() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <div className={css.content}>
        <div className={css.forms}>
          <ContactForm />
          <SearchBox />
        </div>
        <ContactList />
      </div>
    </div>
  );
}