import { useDispatch, useSelector } from "react-redux";
import css from "./SearchBox.module.css";
import { useId } from "react";
import { selectFilter } from "../../redux/filter/selectors";
import { setFilter } from "../../redux/filter/slice";

export default function SearchBox() {
  const searchId = useId();
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const search = (e) => {
    const fullName = e.target.value.trim();
    dispatch(setFilter(fullName));
  };

  return (
    <div className={css.search}>
      <label className={css.label} htmlFor={searchId}>
        Find contacts
      </label>
      <input
        onChange={search}
        value={filter}
        className={`${css.input} addHoverToInput`}
        type="text"
        id={searchId}
        name="searchBox"
      />
    </div>
  );
}