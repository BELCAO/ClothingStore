package com.cdweb.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdweb.backend.service.AuthenticationService;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
	@Autowired
	private AuthenticationService authenticationService;
	@PostMapping("/")
	public String authentication(@RequestBody Map<String, String> data) {
		return authenticationService.authentication(data.get("email"), data.get("password"));
	}

}
