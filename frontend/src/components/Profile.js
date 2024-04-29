import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const { uerID } = useParams();
  const token = useSelector((state) => state.token);
  console.log("Token: " + token);
  const InforNull = () => {
    return <div style={{ margin: "auto", width: "fit-Content" }}>NUll</div>;
  };
  const InforAccount = () => {
    if (token != null) {
      axios
        .get("http://localhost:8080/account/56", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response.data);
          return (
            <div style={{ margin: "auto", width: "fit-Content" }}>
              <img
                className="logo"
                src="images/avatar_default.jpg"
                alt=""
                style={{ marginRight: 50 }}
              />
              <h1>Account ID: {response.data.id} </h1>
              <h1>Account Name: {response.data.name}</h1>
              <h1>Account Email: {response.data.email}</h1>
              <h1>Account Phone: {response.data.phone}</h1>
              <h1>Account Avatar: {response.data.avatar}</h1>
              <h1>Account Role: {response.data.role}</h1>
              <h1>Account Status: {response.data.status}</h1>
            </div>
          );
        })
        .catch((error) => {
          console.log("Không load được thông tin tài khoản", error);
        });
    } else {
      console.log("chưa đăng nhập");
    }
  };
  return (
    <>
      <div className="clearfix"></div>
      <div className="container">
        <div className="row display-flex">
          <div className="col-md-12 margin-auto">
            {token != null ? <InforAccount /> : <InforNull />}
          </div>
        </div>
      </div>
      <div className="clearfix"></div>
    </>
  );
};
export default Profile;
