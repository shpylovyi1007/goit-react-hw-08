import { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router";
import Navigation from "../Navigation/Navigation";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedIn, selectRefreshing } from "../../redux/auth/selectors";
import { refreshUser } from "../../redux/auth/operations";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../Footer/Footer";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const RestrictedRoute = lazy(() => import("../RestrictedRoute"));
const RegisterPage = lazy(() => import("../../pages/RegisterPage/RegisterPage"));
const PrivateRoute = lazy(() => import("../PrivateRoute"));
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const ContactsPage = lazy(() => import("../../pages/ContactsPage/ContactsPage"));
// import css from "./App.module.css";

function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useSelector(selectRefreshing);
  const isLogged = useSelector(selectLoggedIn);
  const notifySuccess = () => toast.success("Success login in app!");

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  useEffect(() => {
    if (!isLogged) {
      return;
    }
    notifySuccess();
  }, [isLogged]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <>
      <Navigation />
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                component={<RegisterPage />}
                redirectTo="/contacts"
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute
                component={<LoginPage />}
                redirectTo="/contacts"
              />
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute component={<ContactsPage />} redirectTo="/login" />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Footer />
      <Toaster />
    </>
  );
}
export default App;