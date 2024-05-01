import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ".././css/profileStyle.css";
import { deleteToken } from "../js/redux/actions";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const UpdateProfileSchema = Yup.object().shape({
  email: Yup.string()
    .email("Vui lòng nhập đúng định dạng email")
    .required("Vui lòng không để trống"),
  name: Yup.string().required("Vui lòng không để trống"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Số điện thoại phải là số")
    .min(10, "Số điện thoại không hợp lệ")
    .required("Vui lòng nhập số điện thoại của bạn"),
});

const Profile = () => {
  const token = useSelector((state) => state.token);
  const [accountInfor, setAccountInfor] = useState(null);
  const [loading, setLoadings] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      setLoadings(true);
      axios
        .get(`http://localhost:8080/account/myprofile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setAccountInfor(response.data);
          setLoadings(false);
        })
        .catch((error) => {
          console.log("Không load được thông tin tài khoản", error);
          setLoadings(false);
        });
    } else {
      navigate("/SignIn");
    }
  }, [token]);
  const renderContent = () => {
    if (loading) {
      console.log("render content laoding");
      return (
        <div style={{ margin: "auto", width: "fit-Content" }}>Loading...</div>
      );
    } else {
      console.log("render content loaded");
      if (accountInfor) {
        return (
          <>
            <Formik
              initialValues={
                {
                  name: accountInfor.name,
                  email: accountInfor.email,
                  phone: accountInfor.phone,
                }
              }
              validationSchema={UpdateProfileSchema}
              onSubmit={updateProfile}
            >
              {({ isValid, isSubmitting, errors, touched }) => (
                <Form>
                  <div className="form-group">
                    <label>Email:</label>
                    <Field
                      name="email"
                      type="email"
                      disabled={!isEditing}
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
                    <label>Name:</label>
                    <Field
                      name="name"
                      type="text"
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
                      name="phoneNumber"
                      type="text"
                      className={`form-control ${
                        errors.email && touched.email ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      className="invalid-feedback custom-error-message"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block" disabled={!isValid || isSubmitting || !isEditing}>Save</button>
                  <button type="button" className="btn btn-primary btn-block" onClick={renderContent} disabled={!isEditing}>Canel</button>
                  <button type="button" className="btn btn-primary btn-block" onClick={() =>{setIsEditing(true)}}>Edit</button>
                </Form>
              )}
            </Formik>
            {/* <h1>Account ID: {accountInfor.id} </h1>
            <h1>Account Name: {accountInfor.name}</h1>
            <h1>Account Email: {accountInfor.email}</h1>
            <h1>Account Phone: {accountInfor.phone}</h1>
            <h1>Account Avatar: {accountInfor.avatar}</h1>
            <h1>Account Role: {accountInfor.role}</h1>
            <h1>Account Status: {accountInfor.status}</h1> */}
          </>
        );
      }
    }
  };

  const logOut = () => {
    dispatch(deleteToken());
    navigate("/");
  };

  const updateProfile = () => {};

  return (
    <>
      <div className="clearfix"></div>
      <div className="container">
        <div className="row display-flex">
          <div className="col-md-4">
            <div className="profile-menu">
              <img
                className="avatar-profile"
                src="images/avatar_default.jpg"
                alt="No image"
              />
              <div className="item-menu-list">
                <div className="item-menu">My Profile</div>
                <div className="item-menu">Liked Products</div>
                <div className="item-menu">Orders</div>
                <div className="item-menu">Change Password</div>
                <div className="item-menu" onClick={logOut}>
                  Log Out
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="infor-content content">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
      <div className="clearfix"></div>
    </>
  );
};
export default Profile;
