import React, { useState } from "react";
import axios from "axios";
import ".././css/chooseimagestyle.css";
import {useSelector } from "react-redux";


const UploadAvatar = (prop) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(prop.urlAvatar);
  const token = useSelector((state) => state.token);


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

    try {
      const response = await axios.post(
        "http://localhost:8080/api/avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
             Authorization: `Bearer ${token}` ,
          },
        }
      );

      console.log("Đường dẫn ảnh đại diện mới:", response.data.avatarUrl);
      // Cập nhật giao diện người dùng với ảnh đại diện mới
    } catch (error) {
      console.error("Lỗi khi tải lên ảnh:", error);
      alert("Đã xảy ra lỗi khi tải lên ảnh");
    }
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
      <button className="btn-load" onClick={handleUpload}>Tải lên</button>
    </div>
  );
};

export default UploadAvatar;
