import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ".././css/mystyle.css";
import axios from "axios";
import { useState } from "react";
import { saveUserInfo, saveToken } from "../js/redux/actions";
import { useDispatch } from "react-redux";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Vui lòng nhập tên của bạn"),
  password: Yup.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Vui lòng nhập mật khẩu của bạn"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Số điện thoại phải là số")
    .min(10, "Số điện thoại không hợp lệ")
    .required("Vui lòng nhập số điện thoại của bạn"),
});

const EmailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập Email của bạn"),
});

const SignUp = () => {
  const [showCheckEmail, setShowCheckEmail] = useState(true);
  const [email, setEmail] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const toggleCheckEmail = () => {
    setShowCheckEmail(!showCheckEmail);
  };

  const createAccount = (values, account) => {
    const data = {email: email, name: values.name, password: values.password, phone: values.phoneNumber}
    console.log(data)
    axios
      .post("http://localhost:8080/user/create", data)
      .then((response) => {
        console.log("Successfully created");
        axios.post("http://localhost:8080/auth/", data)
        .then((response) => {
          dispatch(saveToken(response.data.token));
          dispatch(saveUserInfo({userName:response.data.name, avatarUrl:response.data.avatarUrl}))
          navigate("/")
        })
        .catch((error) => {
          console.log("Error Sign in", error);
        });
      })
      .catch((errors) => {
        console.log("Error creating account: ", errors);
        navigate("/SignUp")
      });
    // Đặt trạng thái submitting về false sau một khoảng thời gian
    setTimeout(() => {
      alert(JSON.stringify(data, null, 2));
      account.setSubmitting(false);
    }, 400);
  };

  const existsEmail = (values, actions) => {
    axios
      .post("http://localhost:8080/user/existsemail", values)
      .then((response) => {
        if (response.data) {
          actions.setFieldError("email", "Email đã được sử dụng");
          actions.setSubmitting(false);
        } else {
          setEmail(values.email);
          actions.setSubmitting(false);
          toggleCheckEmail();
        }
      })
      .catch((errors) => {
        console.log("Error creating account: ", errors);
      });
  };

  const FormCheckEmail = () => {
    return (
      <>
        <div className="card-body">
          <Formik
            initialValues={{ email: email }}
            validationSchema={EmailSchema}
            onSubmit={existsEmail}
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
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={!isValid || isSubmitting}
                >
                  Continue
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </>
    );
  };

  const FormCreateAccount = () => {
    return (
      <>
        <div className="card-body">
          <Formik
            initialValues={{
              name: "",
              password: "",
              phoneNumber: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={createAccount}
          >
            {({ isValid, isSubmitting, errors, touched }) => (
              <Form>
                <div className="form-group">
                  <label>Name:</label>
                  <Field
                    type="text"
                    name="name"
                    className={`form-control ${
                      errors.name && touched.name ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="invalid-feedback custom-error-message"
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
                    className="invalid-feedback custom-error-message"
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <Field
                    type="password"
                    name="password"
                    className={`form-control ${
                      errors.password && touched.password ? "is-invalid" : ""
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
                  Sign Up
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={toggleCheckEmail}
                >
                  Back
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </>
    );
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
                <h2 className="card-header text-center title">Sign Up</h2>
                {showCheckEmail ? <FormCheckEmail /> : <FormCreateAccount />}
                <div className="separator">
                  <span>or</span>
                </div>
                <div className="login-with-google">
                  <button>Sign up with Google</button>
                </div>
                <div className="have-account">
                  <p>
                    Do you have an account yet?{"    "}
                    <Link to="/SignIn">Sign In</Link>
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
export default SignUp;
