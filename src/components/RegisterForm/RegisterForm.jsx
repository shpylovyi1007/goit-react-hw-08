import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./RegisterForm.module.css";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

const initValues = {
  name: "",
  email: "",
  password: "",
};

const initState = {
  hard: false,
  middle: false,
  easy: false,
};

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string()
    .min(8, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
});

export default function RegisterForm() {
  const nameId = nanoid();
  const emailId = nanoid();
  const passwordId = nanoid();
  const dispatch = useDispatch();
  const [color, setColor] = useState(initState);
  const [passValue, setValue] = useState("");

  const validatePassword = (password) => {
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasDigits = /\d/.test(password);
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const typesCount = [hasDigits, hasLetters, hasSymbols].filter(
      Boolean
    ).length;

    switch (typesCount) {
      case 3:
        setColor({ hard: true, middle: false, easy: false });
        break;
      case 2:
        setColor({ hard: false, middle: true, easy: false });
        break;
      case 1:
        setColor({ hard: false, middle: false, easy: true });
        break;
      default:
        setColor(initState);
        break;
    }
  };

  const notifyError = () =>
    toast.error("Something went wrong. Please try again!");

  const registerSubmit = (values, action) => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        setValue("");
        action.resetForm();
      })
      .catch(() => {
        notifyError();
      });
  };

  useEffect(() => {
    validatePassword(passValue);
  }, [passValue]);

  return (
    <div className={css.section}>
      <h2 className={css.title}>Create Account</h2>
      <Formik
        validationSchema={registerSchema}
        initialValues={initValues}
        onSubmit={registerSubmit}
      >
        {({ handleChange, values }) => {
          const isRedClass = clsx(
            values.password.length < 8 &&
              values.password.length !== 0 &&
              css.red
          );

          const firstClass = clsx(
            css.message,
            isRedClass ||
              (color.hard && css.green) ||
              (color.middle && css.yellow) ||
              (color.easy && css.red)
          );

          const secondClass = clsx(
            css.message,
            isRedClass,
            (color.hard && css.green) || (color.middle && css.yellow)
          );

          const thirdClass = clsx(
            css.message,
            isRedClass,
            color.hard && css.green
          );

          return (
            <Form className={css.form}>
              <div className={css.inputDiv}>
                <label className={css.label} htmlFor={nameId}>
                  Name
                </label>
                <Field
                  id={nameId}
                  placeholder="Enter name"
                  className={`${css.input} addHoverToInput`}
                  type="text"
                  name="name"
                ></Field>
                <ErrorMessage
                  className={css.errorMessage}
                  name="name"
                  component="span"
                />
              </div>
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
                  value={values.password}
                  className={`${css.input} addHoverToInput`}
                  placeholder="Enter password"
                  type="password"
                  name="password"
                  onChange={(e) => {
                    handleChange(e);
                    setValue(e.target.value);
                  }}
                />
                <div className={css.output}>
                  <div className={firstClass}></div>
                  <div className={secondClass}></div>
                  <div className={thirdClass}></div>
                </div>
                <ErrorMessage
                  className={css.errorMessage}
                  name="password"
                  component="span"
                />
              </div>
              <button
                className={`${css.submitBtn} addHoverToButton`}
                type="submit"
              >
                Register
              </button>
            </Form>
          );
        }}
      </Formik>
      <div className={css.subInfo}>
        <p className={css.text}>Already have an account?</p>
        <Link className={`${css.link} addHoverToLink`} to="/login">
          Login to Account
        </Link>
      </div>
      <Toaster />
    </div>
  );
}