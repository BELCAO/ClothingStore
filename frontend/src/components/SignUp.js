import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
  password: Yup.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Mật khẩu không được để trống"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ")
    .required("Số điện thoại không được để trống"),
});

const SignUp = () => {
  return (
    <>
      <div className="clearfix"></div>
      <div className="container">
          <div className="row">
            <div className="col-md-6">
              <image src="images/logo.png" alt="" />
            </div>
            <div className="col-md-6">
              <div className="card">
                <h5 className="card-header text-center">Sign Up</h5>
                <div className="card-body">
                  <Formik
                    initialValues={{
                      email: "",
                      password: "",
                      phoneNumber: "",
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={(values, { setSubmitting }) => {
                      setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                      }, 400);
                    }}
                  >
                    {({ isSubmitting, errors, touched }) => (
                      <Form>
                        <div className="form-group">
                          <label>Email:</label>
                          <Field
                            type="email"
                            name="email"
                            className={`form-control ${
                              errors.email && touched.email ? "is-invalid" : ""
                            }`}
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                        <div className="form-group">
                          <label>Password:</label>
                          <Field
                            type="password"
                            name="password"
                            className={`form-control ${
                              errors.password && touched.password
                                ? "is-invalid"
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                        <div className="form-group">
                          <label>Phone Number:</label>
                          <Field
                            type="text"
                            name="phoneNumber"
                            className={`form-control ${
                              errors.phoneNumber && touched.phoneNumber
                                ? "is-invalid"
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            name="phoneNumber"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                          disabled={isSubmitting}
                        >
                          Sign Up
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
                <div className="card-footer text-muted text-center">
                  Already have an account? <Link to="/SignIn">Sign In</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      <div className="clearfix"></div>
    </>
  );
};
export default SignUp;
