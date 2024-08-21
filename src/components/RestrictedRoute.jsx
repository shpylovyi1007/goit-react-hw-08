import { useSelector } from "react-redux";
import { selectLoggedIn } from "../redux/auth/selectors";
import { Navigate } from "react-router-dom";

export default function RestrictedRoute({
  component: Component,
  redirectTo = "/",
}) {
  const isLogged = useSelector(selectLoggedIn);
  return (
    <>{isLogged ? <Navigate to={redirectTo} replace={true} /> : Component}</>
  );
}