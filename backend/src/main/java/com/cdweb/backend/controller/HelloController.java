package com.cdweb.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/hello")
public class HelloController {
	@GetMapping("/get")
	public String hello() {
		return "hello word";
	}
	@PostMapping("/post")
	public String postMethodName(@RequestBody Map<String, String> entity) {
		String result = "";
		for (String s : entity.keySet()) {
			result += s +"_"+entity.get(s)+"|";
		}
		return result;
	}
	
	
}
