import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./LogInForm.module.css";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const initValues = {
  email: "",
  password: "",
};

export default function LogInForm() {
  const emailId = nanoid();
  const passwordId = nanoid();
  const dispatch = useDispatch();

  const notifyError = () =>
    toast.error("Something went wrong. Please try again.");

  const notifyLoading = () => toast.loading("Loading...");

  const registerSubmit = (values, action) => {
    const loadingToastId = notifyLoading();
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        action.resetForm();
      })
      .catch(() => {
        notifyError();
      })
      .finally(() => {
        toast.dismiss(loadingToastId);
      });
  };

  return (
    <div className={css.section}>
      <h2 className={css.title}>Login to Account</h2>
      <Formik initialValues={initValues} onSubmit={registerSubmit}>
        <Form className={css.form}>
          <div className={css.inputDiv}>
            <label className={css.label} htmlFor={emailId}>
              Email
            </label>
            <Field
              id={emailId}
              placeholder="Enter email"
              className={`${css.input} addHoverToInput`}
              type="email"
              name="email"
            ></Field>
            <ErrorMessage
              className={css.errorMessage}
              name="email"
              component="span"
            />
          </div>
          <div className={css.inputDiv}>
            <label className={css.label} htmlFor={passwordId}>
              Password
            </label>
            <Field
              id={passwordId}
              placeholder="Enter password"
              className={`${css.input} addHoverToInput`}
              type="password"
              name="password"
            ></Field>
            <ErrorMessage
              className={css.errorMessage}
              name="password"
              component="span"
            />
          </div>
          <button className={`${css.submitBtn} addHoverToButton`} type="submit">
            Login
          </button>
        </Form>
      </Formik>
      <div className={css.subInfo}>
        <p className={css.text}>Don’t have account?</p>
        <Link className={`${css.link} addHoverToLink`} to="/register">
          Create Account
        </Link>
      </div>
      <Toaster />
    </div>
  );
}