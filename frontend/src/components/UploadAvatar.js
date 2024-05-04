import React, { useState } from 'react';
import axios from 'axios';
import ".././css/chooseimagestyle.css";

const UploadAvatar = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("images/avatar_default.jpg");

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
      alert('Vui lòng chọn ảnh trước khi tải lên');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', selectedFile);

    try {
      const response = await axios.post('http://localhost:8080/api/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log('Đường dẫn ảnh đại diện mới:', response.data.avatarUrl);
      // Cập nhật giao diện người dùng với ảnh đại diện mới
    } catch (error) {
      console.error('Lỗi khi tải lên ảnh:', error);
      alert('Đã xảy ra lỗi khi tải lên ảnh');
    }
  };

  return (
    <div style={{margin: "auto"}}>
      <img className='avatar' src={avatarUrl} alt="Avatar" />
      <input className='choose-img' type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Tải lên</button>
    </div>
  );
};

export default UploadAvatar;
