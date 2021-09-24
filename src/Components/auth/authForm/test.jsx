import React, { useState } from "react";
import { AuthFormStyled } from "./AuthFormStyled";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInOperation,
  signUpOperation,
} from "../../redux/operations/authOperations";
import { resetError } from "../../redux/actions/authActions";
import { Formik, Form, Field } from "formik";
import ErrorValidation, {
  funcMessage,
  validationSchema,
} from "./validation/Validator";
const initialState = {
  email: "",
  password: "",
  name: "",
  error: "",
};
const AuthForm = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  // const onHandleChange = (e) => {
  //   const { name, value } = e.target;
  //   error && dispatch(resetError());
  //   setState({ ...state, [name]: value });
  // };
  return (
    <AuthFormStyled>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          if (location.pathname === "/signup") {
            dispatch(signUpOperation(values));
          } else {
            dispatch(signInOperation(values));
          }
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <label>
              Електронна пошта
              <Field
                type="text"
                name="email"
                value={values.email}
                // onChange={handleChange}
                // onBlur={handleBlur}
                className={
                  !values.email.length &&
                  touched.email &&
                  errors.email &&
                  "invalidInput"
                }
              />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
              {/* {errors.email && (
                  <ErrorValidation
                    touched={touched.email}
                    message={errors.email}
                  />
                ) &&
                funcMessage(errors.email)} */}
            </label>
            <label>
              Пароль
              <Field
                type="text"
                name="password"
                value={values.password}
                // onChange={handleChange}
                onBlur={handleBlur}
                className={
                  !values.password.length &&
                  touched.password &&
                  errors.password &&
                  "invalidInput"
                }
              />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
              {/* {errors.password && (
                  <ErrorValidation
                    touched={touched.password}
                    message={errors.password}
                  />
                ) &&
                funcMessage(errors.password)} */}
            </label>
            {location.pathname === "/signin" ? (
              <button type="submit">Вхід</button>
            ) : (
              <button type="submit">Зареєструватись</button>
            )}
          </Form>
        )}
      </Formik>
    </AuthFormStyled>
  );
};
// export default AuthForm;
