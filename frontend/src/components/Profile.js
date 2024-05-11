import ".././css/profileStyle.css";
import axios from "axios";
import { useNavigate, Link, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteToken,
  deleteUserInfo,
  saveAvatarUrl,
  saveUserName,
} from "../js/redux/actions";
import UploadAvatar from "./UploadAvatar";
import Orders from "./Orders";
import LikedProducs from "./LikedProducts";

const UpdateProfileSchema = Yup.object().shape({
  email: Yup.string()
    .email("Vui lòng nhập đúng định dạng email")
    .required("Vui lòng không để trống"),
  name: Yup.string().required("Vui lòng không để trống"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Số điện thoại phải là số")
    .min(10, "Số điện thoại không hợp lệ")
    .required("Vui lòng nhập số điện thoại của bạn"),
  gender: Yup.string(),
  birthday: Yup.date(),
});

const Profile = () => {
  const token = useSelector((state) => state.token);
  const avatarUrl = useSelector((state) => state.avatarUrl);
  const userName = useSelector((state) => state.userName);

  const [accountInfor, setAccountInfor] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [nUrl, setNUrl] = useState(
    process.env.REACT_APP_HOST_API_URL + "images/avatar?imgPath=" + avatarUrl
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
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

  const updateProfile = (values) => {
    console.log("cập nhật thông tin");
    handleUpload();
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
        dispatch(saveUserName(response.data.name));
        setAccountInfor(response.data);
      })
      .catch((error) => {
        console.log("Không lưu được", error);
      });
  };

  const logOut = () => {
    dispatch(deleteToken());
    dispatch(deleteUserInfo());
    navigate("/");
  };

  const renderImageProfile = () => {
    if (userName && avatarUrl) {
      return (
        <div className="profile-info">
          <div className="avatar-profile-frame">
            <img
              className="avatar-profile"
              src={
                process.env.REACT_APP_HOST_API_URL +
                "images/avatar?imgPath=" +
                avatarUrl
              }
              alt="No image"
            />
          </div>
          <p className="userName">{userName}</p>
        </div>
      );
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    // Hiển thị ảnh ngay sau khi người dùng chọn
    const reader = new FileReader();
    reader.onload = () => {
      setNUrl(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Vui lòng chọn ảnh trước khi tải lên");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", selectedFile);
    console.log(token);
    axios
      .post(
        `${process.env.REACT_APP_HOST_API_URL}images/loadavatar`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        dispatch(saveAvatarUrl(response.data.avatarUrl));
        setNUrl(
          `${process.env.REACT_APP_HOST_API_URL}images/avatar?imgPath=${response.data.avatarUrl}`
        );
      })
      .catch((error) => {
        console.error("Lỗi khi tải lên ảnh:", error);
        alert("Đã xảy ra lỗi khi tải lên ảnh");
      });
  };
  const renderInforForm = () => {
    if (accountInfor) {
      return (
        <>
          <Formik
            initialValues={{
              name: accountInfor.name,
              email: accountInfor.email,
              phoneNumber: accountInfor.phone,
              gender: accountInfor.gender,
              birthday: accountInfor.birthday,
            }}
            validationSchema={UpdateProfileSchema}
            onSubmit={updateProfile}
          >
            {({
              isValid,
              isSubmitting,
              setFieldValue,
              errors,
              touched,
              resetForm,
            }) => (
              <Form className="form-contains">
                <div className="form-info">
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
                      disabled={!isEditing}
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
                      disabled={!isEditing}
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
                  <div className="form-group">
                    <label>Gender:</label>
                    <div className="gender-contains">
                      <label>
                        Nam:
                        <Field
                          name="gender"
                          type="radio"
                          value="male"
                          disabled={!isEditing}
                          className={`form-control ${
                            errors.gender && touched.gender ? "is-invalid" : ""
                          }`}
                          onClick={() => setFieldValue("gender", "male")} // Set giá trị khi clicked
                        />
                      </label>
                      <label>
                        Nữ:
                        <Field
                          name="gender"
                          type="radio"
                          value="female"
                          disabled={!isEditing}
                          className={`form-control ${
                            errors.gender && touched.gender ? "is-invalid" : ""
                          }`}
                          onClick={() => setFieldValue("gender", "female")} // Set giá trị khi clicked
                        />
                      </label>
                      <label>
                        Khác:
                        <Field
                          name="gender"
                          type="radio"
                          value="other"
                          disabled={!isEditing}
                          className={`form-control ${
                            errors.gender && touched.gender ? "is-invalid" : ""
                          }`}
                          onClick={() => setFieldValue("gender", "other")} // Set giá trị khi clicked
                        />
                      </label>
                    </div>
                    <ErrorMessage
                      name="gender"
                      component="div"
                      className="invalid-feedback custom-error-message"
                    />
                  </div>
                  <div className="form-group">
                    <label>Birthday:</label>
                    <Field
                      name="birthday"
                      type="date"
                      disabled={!isEditing}
                      className={`form-control ${
                        errors.birthday && touched.birthday ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="birthday"
                      component="div"
                      className="invalid-feedback custom-error-message"
                    />
                  </div>
                  <div className="btn-list">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={!isValid || isSubmitting || !isEditing}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
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
                      className="btn btn-primary"
                      onClick={() => {
                        setIsEditing(true);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
                <span style={{ width: 25 }}></span>
                <div className="edit-avatar-contains">
                  <div className="avatar-frame">
                    <img className="avatar" src={nUrl} alt="Avatar" />
                  </div>
                  <button
                    className="btn btn-primary"
                    disabled={!isEditing}
                    style={{ position: "relative" }}
                  >
                    Chọn ảnh
                    <input
                      className="choose-img"
                      type="file"
                      name="avatar"
                      onChange={handleFileChange}
                      accept=".jpg, .png" // Chỉ cho phép người dùng chọn các loại file cụ thể
                    />
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          {/* <span style={{ width: 20 }}></span>
          <UploadAvatar avatarUrl={accountInfor.avatar} /> */}
        </>
      );
    }
  };

  return (
    <>
      <div className="clearfix"></div>
      <div className="container">
        <div className="row" style={{ padding: 20 - 0 }}>
          <div className="col-md-2">
            <div className="profile-menu">
              {renderImageProfile()}
              <div className="item-menu-list">
                <Link to="/Profile">
                  <div className="item-menu">My Profile</div>
                </Link>
                <Link to="/Profile/LidedProducts">
                  <div className="item-menu">Liked Products</div>
                </Link>
                <Link to="/Profile/Orders">
                  <div className="item-menu">Orders</div>
                </Link>
                <Link>
                  <div className="item-menu">Change Password</div>
                </Link>
                <div className="item-menu" onClick={logOut}>
                  Log Out
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-10">
            <Routes>
              <Route path="/Orders" element={<Orders />} />
              <Route path="/LikedProducts" element={<LikedProducs />} />
            </Routes>
            <div className="content">{renderInforForm()}</div>
          </div>
        </div>
      </div>
      <div className="clearfix"></div>
    </>
  );
};
export default Profile;
