import React from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ".././css/mystyle.css";
import { useDispatch } from "react-redux";
import { saveAvatarUrl, saveToken, saveUserName } from "../js/redux/actions";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
  password: Yup.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Mật khẩu không được để trống"),
});

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values, actions) => {
    axios.post("http://localhost:8080/auth/", values)
    .then((response) => {
      dispatch(saveToken(response.data));
      actions.setSubmitting(false);
      axios.get(`${process.env.REACT_APP_HOST_API_URL}account/myprofile`,{
        headers: {Authorization: `Bearer ${response.data}`}
      })
      .then((response) => {
        dispatch(saveUserName(response.data.name));
        dispatch(saveAvatarUrl(response.data.avatarUrl));
      })
      .catch((error) =>{
        console.log(error);
      });
      navigate("/")
    })
    .catch((error) => {
      actions.setSubmitting(false);
      actions.resetForm();
      console.log("Error Sign in", error);
    });
  };


  return (
    <>
      <div className="clearfix"></div>
      <div className="container">
        <div className="row display-flex">
          <div className="col-md-6 margin-auto">
            <img className="logo" src="./images/logo3.png" alt="" />
          </div>
          <div className="col-md-6 margin-auto">
            <div className="sing-up_container">
              <div className="card">
                <h2 className="card-header text-center title">Sign In</h2>
                <div className="card-body">
                  <Formik
                    initialValues={{
                      email: "",
                      password: "",
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ isValid, isSubmitting, errors, touched }) => (
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
                            className="invalid-feedback custom-error-message"
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
                            className="invalid-feedback custom-error-message"
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                          disabled={!isValid || isSubmitting}
                        >
                          Sign In
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
                <div className="separator">
                  <span>or</span>
                </div>
                <div className="login-with-google">
                  <button>Sign in with Google</button>
                </div>
                <div className="have-account">
                  <p>
                    You just heard about Clothing Store?{"    "}
                    <Link to="/SignUp">Sign Up</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="clearfix"></div>
    </>
  );

};
export default SignIn;
