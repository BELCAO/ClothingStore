package com.cdweb.backend.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cdweb.backend.entity.Account;
import com.cdweb.backend.repository.AccountRepository;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSObject;
import com.nimbusds.jose.Payload;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;


@Service
public class AuthenticationService {
	@Value("${signer.key}")
	private  String signKey;
	@Autowired
	private AccountRepository accountRepository;
	
	
	public String authentication(String email, String password) {
		Account account = accountRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Account Not Found"));
		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
		boolean authentication =  passwordEncoder.matches(password, account.getPassword());
		if(!authentication) {
			throw new RuntimeException();
		}
		return generateToken(email);
	}
	
	
	private String generateToken(String email) {
		JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);
		JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
				.subject(email)
				.issuer("cdw.com")
				.issueTime(new Date())
				.expirationTime(new Date(
						Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()
						))
				.claim("customClain", "Custom")
				.build();
		Payload payload = new Payload(claimsSet.toJSONObject());
		JWSObject jwsObject = new JWSObject(header, payload);
		
		try {
			jwsObject.sign(new MACSigner(signKey));
			return jwsObject.serialize();
		} catch (JOSEException e) {
			System.out.println("ggggggggg");
			throw new RuntimeException(e);
		}
	}

}
