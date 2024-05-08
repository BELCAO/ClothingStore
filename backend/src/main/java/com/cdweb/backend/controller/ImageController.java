package com.cdweb.backend.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.cdweb.backend.service.AccountService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("/images")
public class ImageController {
	
	 @Value("${avatar.dir.path}")
	 private String uploadAvatarPath;
	 @Autowired
	 private AccountService accountService;

	 @PostMapping("/loadavatar")
	 public ResponseEntity<?> uploadAvatar(@RequestParam("avatar") MultipartFile avatar) {
	     if (avatar.isEmpty()) {
	         return ResponseEntity.badRequest().body("Không có tệp được chọn");
	     }

	     try {
	    	 File uploadDir = new File(uploadAvatarPath);
	    	 if(!uploadDir.exists()) uploadDir.mkdirs();
	         // Tạo tên ngẫu nhiên cho ảnh
	         String fileName = UUID.randomUUID().toString() + "_" + avatar.getOriginalFilename();
	         // Lưu ảnh vào thư mục lưu trữ
	         avatar.transferTo(new File(uploadAvatarPath + fileName));
	         // Lưu đường dẫn ảnh mới vào csdl
	         accountService.updateAvatar(Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getName()), uploadAvatarPath+fileName);
	         // Trả về đường dẫn của ảnh đại diện mới
	         String avatarUrl = uploadAvatarPath + fileName;
	         return ResponseEntity.ok().body(Map.of("avatarUrl", avatarUrl));
	     } catch (IOException e) {
	         e.printStackTrace();
	         return ResponseEntity.status(500).body("Lỗi khi tải ảnh lên");
	     }
	 }
	
	@GetMapping("/avatar")
	public ResponseEntity<byte[]> getImage(@RequestParam String imgPath) throws IOException {
	        Path path = Paths.get(imgPath);
	        if (!Files.exists(path)) {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	        byte[] imageBytes = Files.readAllBytes(path);
	        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageBytes);
	}
	
}
