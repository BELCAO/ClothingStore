package com.cdweb.backend.controller;

//AvatarController.java
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/avatar")
public class AvatarController {

// @Value("${upload.path}")
 private String uploadPath = "D:/111/image/";// Đường dẫn thư mục lưu trữ ảnh đại diện

 @PostMapping
 public ResponseEntity<?> uploadAvatar(@RequestParam("avatar") MultipartFile avatar) {
     if (avatar.isEmpty()) {
         return ResponseEntity.badRequest().body("Không có tệp được chọn");
     }

     try {
         // Tạo tên ngẫu nhiên cho ảnh
         String fileName = UUID.randomUUID().toString() + "_" + avatar.getOriginalFilename();
         // Lưu ảnh vào thư mục lưu trữ
         avatar.transferTo(new File(uploadPath + fileName));
         // Trả về đường dẫn của ảnh đại diện mới
         String avatarUrl = "http://localhost:8080/"+ uploadPath + fileName;
         return ResponseEntity.ok().body(Map.of("avatarUrl", avatarUrl));
     } catch (IOException e) {
         e.printStackTrace();
         return ResponseEntity.status(500).body("Lỗi khi tải lên ảnh");
     }
 }
}
