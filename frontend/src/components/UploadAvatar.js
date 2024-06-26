import React, { useState } from "react";
import axios from "axios";
import ".././css/chooseimagestyle.css";
import { useSelector, useDispatch } from "react-redux";
import { saveAvatarUrl } from "../js/redux/actions";

const UploadAvatar = (prop) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(
    process.env.REACT_APP_HOST_API_URL +
      "images/avatar?imgPath=" +
      prop.avatarUrl
  );
  const token = useSelector((state) => state.token);
  const userInfo = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    // Hiển thị ảnh ngay sau khi người dùng chọn
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarUrl(reader.result);
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
    axios.post(`${process.env.REACT_APP_HOST_API_URL}images/loadavatar`,formData,{
      headers: {Authorization: `Bearer ${token}`},
    })
    .then((response) => {
      dispatch(saveAvatarUrl(response.data.avatarUrl));
    })
    .catch((error) => {
      console.error("Lỗi khi tải lên ảnh:", error);
      alert("Đã xảy ra lỗi khi tải lên ảnh");
    });
    
  };

  return (
    <div className="edit-avatar-contains">
      <div className="choose-avatar-contains">
        <input
          className="choose-img"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <img className="avatar" src={avatarUrl} alt="Avatar" />
      </div>
      <button className="btn-load" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
};

export default UploadAvatar;
