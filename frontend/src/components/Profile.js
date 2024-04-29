import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ".././css/profileStyle.css";
import { deleteToken } from "../js/redux/actions";
import { useDispatch } from "react-redux";

const Profile = () => {
  const { accountID } = useParams();
  const token = useSelector((state) => state.token);
  const [accountInfor, setAccountInfor] = useState(null);
  const [loading, setLoadings] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("loading data...");
    if (token) {
      setLoadings(true);
      axios
        .get(`http://localhost:8080/account/${accountID}`, {
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
    }else{
        navigate("/SignIn")
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
          <div>
            <h1>Account ID: {accountInfor.id} </h1>
            <h1>Account Name: {accountInfor.name}</h1>
            <h1>Account Email: {accountInfor.email}</h1>
            <h1>Account Phone: {accountInfor.phone}</h1>
            <h1>Account Avatar: {accountInfor.avatar}</h1>
            <h1>Account Role: {accountInfor.role}</h1>
            <h1>Account Status: {accountInfor.status}</h1>
          </div>
        );
      }
    }
  };

  const logOut = () => {
    dispatch(deleteToken());
  };

  return (
    <>
      <div className="clearfix"></div>
      <div className="container">
        <div className="row display-flex">
          <div className="col-md-4">
            {/* {token ? renderContent():"NULL"} */}
            <div className="profile-menu">
              <img
                className="avatar-profile"
                src="images/avatar_default.jpg"
                alt="No image"
              />
              <div className="item-menu">My Profile</div>
              <div className="item-menu">Liked Products</div>
              <div className="item-menu">Orders</div>
              <div className="item-menu">Change Password</div>
              <div onClick={logOut} className="item-menu">
                Log Out
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="infor-content content">
              {token ? renderContent() : navigate("/")}
            </div>
          </div>
        </div>
      </div>
      <div className="clearfix"></div>
    </>
  );
};
export default Profile;
