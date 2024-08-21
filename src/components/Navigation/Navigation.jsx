import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedIn, selectUserName } from "../../redux/auth/selectors";
import { logOut } from "../../redux/auth/operations";
import logo from "../../img/Logo.png";

export default function Navigation() {
  const isLoggedIn = useSelector(selectLoggedIn);
  const userName = useSelector(selectUserName);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <header className={css.container}>
      <nav className={css.nav}>
        <div className={css.list}>
          <a href="/">
            <img className={css.logo} src={logo} alt="logo" />
          </a>
          <NavLink className={`${css.link} addHoverToLink`} to="/">
            Home
          </NavLink>
          {isLoggedIn && (
            <NavLink className={`${css.link} addHoverToLink`} to="/contacts">
              Contacts
            </NavLink>
          )}
        </div>

        {isLoggedIn ? (
          <div className={css.list}>
            <h2 className={css.welcomeText}>Welcome, {userName}</h2>
            <button
              className={`${css.logOut} addHoverToButton`}
              onClick={handleLogOut}
            >
              Log out
            </button>
          </div>
        ) : (
          <ul className={css.list}>
            <li>
              <NavLink className={`${css.link} addHoverToLink`} to="/register">
                Register
              </NavLink>
            </li>
            <li>
              <NavLink className={`${css.link} addHoverToLink`} to="/login">
                Login
              </NavLink>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}