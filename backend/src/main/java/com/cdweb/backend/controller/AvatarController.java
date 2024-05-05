package com.cdweb.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
//AvatarController.java
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.cdweb.backend.entity.Account;
import com.cdweb.backend.service.AccountService;

import java.io.File;
import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/avatar")
public class AvatarController {

// @Value("${avatar.path}")
 private String uploadPath = "D:/CDWEB/ClothingStore/backend/src/main/resources/images/avatars/";
 @Autowired
 private AccountService accountService;

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
         Long accLongID = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getName());
//         accountService.updateAvatar(accLongID,fileName);
         String avatarUrl = "http://localhost:8080/images/avatars/" + fileName;
         return ResponseEntity.ok().body(Map.of("avatarUrl", avatarUrl));
     } catch (IOException e) {
         e.printStackTrace();
         return ResponseEntity.status(500).body("Lỗi khi tải lên ảnh");
     }
 }
}
