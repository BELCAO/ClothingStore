package com.cdweb.backend.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/images")
public class ImageController {
	
	@Value("${avatar.path}")
	private String imageDefPath;
	
	@GetMapping("/avatars/{imageName}")
	public ResponseEntity<byte[]> getImage(@PathVariable String imageName) throws IOException {
	        Path path = Paths.get(imageDefPath + imageName);
	        
	        if (!Files.exists(path)) {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	        
	        byte[] imageBytes = Files.readAllBytes(path);
	        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageBytes);
	}
	
}
