import React, {useState} from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ".././css/mystyle.css";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
  password: Yup.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Mật khẩu không được để trống"),
});

const SignInForm = ({setToken}) => {
  const[username, setUsername] = useState('');
  const[password, setPassword] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/',{
        username, password
      });
      const token = response.data.accessToken;
      setToken(token);
    }catch (error){
      console.error('Sign In error:', error);
    }
  }
};
const SignIp = ({setToken}) => {

  // const handleSubmit = (values, { setSubmitting }) => {
  //   // Xử lý form và in ra console
  //   console.log("Dữ liệu form:", values);

  //   // Điều hướng sang trang mới

  //   // Đặt trạng thái submitting về false sau một khoảng thời gian
  //   setTimeout(() => {
  //     alert(JSON.stringify(values, null, 2));
  //     setSubmitting(false);
  //   }, 400);
  // };
  const[username, setUsername] = useState('');
  const[password, setPassword] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/',{
        username, password
      });
      const token = response.data.accessToken;
      setToken(token);
    }catch (error){
      console.error('Sign In error:', error);
    }
  }



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
                          Sign Ip
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
export default SignIp;
