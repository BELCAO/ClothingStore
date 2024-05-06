import ".././css/profileStyle.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { saveToken, deleteToken } from "../js/redux/actions";
import UploadAvatar from "./UploadAvatar";

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
  const [accountInfor, setAccountInfor] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("load thông tin khi token thay đổi");
    if (token) {
      axios
        .get(`${process.env.REACT_APP_HOST_API_URL}account/myprofile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setAccountInfor(response.data);
        })
        .catch((error) => {
          console.log("Không load được thông tin tài khoản", error);
        });
    } else {
      if (
        window.confirm("You need to log in to continue, do you want to log in?")
      ) {
        navigate("/SignIn");
      } else {
        navigate("/");
      }
    }
  }, [token]);

  const renderContent = () => {
    console.log("reder content");
    if (!accountInfor) {
      console.log("render content laoding");
      return (
        <div style={{ margin: "auto", width: "fit-Content" }}>Loading...</div>
      );
    } else {
      console.log("render content loaded");
      return (
        <>
          <div className="clearfix"></div>
          <div className="container">
            <div className="row display-flex">
              <div className="col-md-4">
                <div className="profile-menu">
                  <img
                    className="avatar-profile"
                    src={
                      process.env.REACT_APP_HOST_API_URL +
                      "images/avatar?imgPath=" +
                      accountInfor.avatar
                    }
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
                <div className="content">
                  <div className="infor-content">
                    <>
                      <Formik
                        initialValues={{
                          name: accountInfor.name,
                          email: accountInfor.email,
                          phoneNumber: accountInfor.phone,
                        }}
                        validationSchema={UpdateProfileSchema}
                        onSubmit={updateProfile}
                      >
                        {({
                          isValid,
                          isSubmitting,
                          errors,
                          touched,
                          resetForm,
                        }) => (
                          <Form className="form-info">
                            <div className="form-group">
                              <label>Email:</label>
                              <Field
                                name="email"
                                type="email"
                                disabled={!isEditing}
                                className={`form-control ${
                                  errors.email && touched.email
                                    ? "is-invalid"
                                    : ""
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
                                disabled={!isEditing}
                                className={`form-control ${
                                  errors.name && touched.name
                                    ? "is-invalid"
                                    : ""
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
                                disabled={!isEditing}
                                className={`form-control ${
                                  errors.email && touched.email
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
                            <div className="btn-list">
                              <button
                                type="submit"
                                className="btn btn-primary btn-block"
                                disabled={
                                  !isValid || isSubmitting || !isEditing
                                }
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary btn-block"
                                disabled={!isEditing}
                                onClick={() => {
                                  resetForm();
                                  setIsEditing(false);
                                }}
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary btn-block"
                                onClick={() => {
                                  setIsEditing(true);
                                }}
                              >
                                Edit
                              </button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                      <span style={{ width: 20 }}></span>
                      <UploadAvatar urlAvatar={accountInfor.avatar} />
                    </>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="clearfix"></div>
        </>
      );
    }
  };
  // const renderContent = () => {
  //   console.log("reder content");
  //   if (token) {
  //     if (loading) {
  //       console.log("render content laoding");
  //       return (
  //         <div style={{ margin: "auto", width: "fit-Content" }}>Loading...</div>
  //       );
  //     } else {
  //       console.log("render content loaded");
  //       if (accountInfor) {
  //         return (
  //           <>
  //             <div className="clearfix"></div>
  //             <div className="container">
  //               <div className="row display-flex">
  //                 <div className="col-md-4">
  //                   <div className="profile-menu">
  //                     <img
  //                       className="avatar-profile"
  //                       src={
  //                         process.env.REACT_APP_HOST_API_URL +
  //                         "images/avatar?imgPath=" +
  //                         accountInfor.avatar
  //                       }
  //                       alt="No image"
  //                     />
  //                     <div className="item-menu-list">
  //                       <div className="item-menu">My Profile</div>
  //                       <div className="item-menu">Liked Products</div>
  //                       <div className="item-menu">Orders</div>
  //                       <div className="item-menu">Change Password</div>
  //                       <div className="item-menu" onClick={logOut}>
  //                         Log Out
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </div>
  //                 <div className="col-md-8">
  //                   <div className="content">
  //                     <div className="infor-content">
  //                       <>
  //                         <Formik
  //                           initialValues={{
  //                             name: accountInfor.name,
  //                             email: accountInfor.email,
  //                             phoneNumber: accountInfor.phone,
  //                           }}
  //                           validationSchema={UpdateProfileSchema}
  //                           onSubmit={updateProfile}
  //                         >
  //                           {({
  //                             isValid,
  //                             isSubmitting,
  //                             errors,
  //                             touched,
  //                             resetForm,
  //                           }) => (
  //                             <Form className="form-info">
  //                               <div className="form-group">
  //                                 <label>Email:</label>
  //                                 <Field
  //                                   name="email"
  //                                   type="email"
  //                                   disabled={!isEditing}
  //                                   className={`form-control ${
  //                                     errors.email && touched.email
  //                                       ? "is-invalid"
  //                                       : ""
  //                                   }`}
  //                                 />
  //                                 <ErrorMessage
  //                                   name="email"
  //                                   component="div"
  //                                   className="invalid-feedback custom-error-message"
  //                                 />
  //                               </div>
  //                               <div className="form-group">
  //                                 <label>Name:</label>
  //                                 <Field
  //                                   name="name"
  //                                   type="text"
  //                                   disabled={!isEditing}
  //                                   className={`form-control ${
  //                                     errors.name && touched.name
  //                                       ? "is-invalid"
  //                                       : ""
  //                                   }`}
  //                                 />
  //                                 <ErrorMessage
  //                                   name="name"
  //                                   component="div"
  //                                   className="invalid-feedback custom-error-message"
  //                                 />
  //                               </div>
  //                               <div className="form-group">
  //                                 <label>Phone Number:</label>
  //                                 <Field
  //                                   name="phoneNumber"
  //                                   type="text"
  //                                   disabled={!isEditing}
  //                                   className={`form-control ${
  //                                     errors.email && touched.email
  //                                       ? "is-invalid"
  //                                       : ""
  //                                   }`}
  //                                 />
  //                                 <ErrorMessage
  //                                   name="phoneNumber"
  //                                   component="div"
  //                                   className="invalid-feedback custom-error-message"
  //                                 />
  //                               </div>
  //                               <div className="btn-list">
  //                                 <button
  //                                   type="submit"
  //                                   className="btn btn-primary btn-block"
  //                                   disabled={
  //                                     !isValid || isSubmitting || !isEditing
  //                                   }
  //                                 >
  //                                   Save
  //                                 </button>
  //                                 <button
  //                                   type="button"
  //                                   className="btn btn-primary btn-block"
  //                                   disabled={!isEditing}
  //                                   onClick={() => {
  //                                     resetForm();
  //                                     setIsEditing(false);
  //                                   }}
  //                                 >
  //                                   Cancel
  //                                 </button>
  //                                 <button
  //                                   type="button"
  //                                   className="btn btn-primary btn-block"
  //                                   onClick={() => {
  //                                     setIsEditing(true);
  //                                   }}
  //                                 >
  //                                   Edit
  //                                 </button>
  //                               </div>
  //                             </Form>
  //                           )}
  //                         </Formik>
  //                         <span style={{ width: 20 }}></span>
  //                         <UploadAvatar urlAvatar={accountInfor.avatar} />
  //                       </>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //             <div className="clearfix"></div>
  //           </>
  //         );
  //       }
  //     }
  //   }
  // };

  const logOut = () => {
    dispatch(deleteToken());
    navigate("/");
  };

  const updateProfile = (values) => {
    console.log("cập nhật thông tin");
    axios
      .post(
        `${process.env.REACT_APP_HOST_API_URL}account/updateMyInfo`,
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setIsEditing(false);
        dispatch(saveToken(response.data));
      })
      .catch((error) => {
        console.log("Không lưu được", error);
      });
  };
  return <>{renderContent()}</>;
};
export default Profile;
