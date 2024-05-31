package com.cdweb.backend.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;



@ControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(value = RuntimeException.class)
	ResponseEntity<String> handlingRuntimeException(RuntimeException exception){
		return ResponseEntity.badRequest().body(exception.getMessage());
	}
//	@ExceptionHandler(value = DataIntegrityViolationException.class)
//	ResponseEntity<String> handlingRuntimeException(DataIntegrityViolationException exception){
//		return ResponseEntity.badRequest().body("khong tao đuoc tai khoan");
//		
//	}
}
