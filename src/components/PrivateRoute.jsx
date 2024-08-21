import { useSelector } from "react-redux";
import { selectLoggedIn } from "../redux/auth/selectors";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({
  component: Component,
  redirectTo = "/",
}) {
  const isLogged = useSelector(selectLoggedIn);

  return (
    <>{isLogged ? Component : <Navigate to={redirectTo} replace={true} />}</>
  );
}