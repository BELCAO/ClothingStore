package com.cdweb.backend.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.StringJoiner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.cdweb.backend.entity.User;
import com.cdweb.backend.repository.UserRepository;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSObject;
import com.nimbusds.jose.Payload;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;

import jakarta.transaction.Transactional;


@Service
public class AuthenticationService {
	@Value("${signer.key}")
	private  String signKey;
	@Autowired
	private UserRepository accountRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Transactional
	public Map<String, String> authentication(String email, String password) {
		User user = accountRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Account Not Found"));
		boolean authentication = passwordEncoder.matches(password, user.getPassword());
		if(!authentication) {
			throw new RuntimeException();
		}
		String token = generateToken(user);
		Map<String, String> result = new HashMap<String, String>();
		result.put("token", token);
		result.put("name", user.getName());
		result.put("avatarUrl", user.getAvatarUrl());
		return result;
	}
	
	public String againAuthentication(User account) {
		return generateToken(account);
	}
	
	private String generateToken(User account) {
		JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);
		JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
				.subject(Long.toString(account.getId()))
				.issuer("cdw.com")
				.issueTime(new Date())
				.expirationTime(new Date(
						Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()
						))
				.claim("scope", buildScope(account))
				.build();
		Payload payload = new Payload(claimsSet.toJSONObject());
		JWSObject jwsObject = new JWSObject(header, payload);
		
		try {
			jwsObject.sign(new MACSigner(signKey));
			return jwsObject.serialize();
		} catch (JOSEException e) {
			throw new RuntimeException(e);
		}
	}
	
	private String buildScope(User account) {
		StringJoiner stringJoiner = new StringJoiner(" ");
		if(!CollectionUtils.isEmpty(account.getRoles())) {
			account.getRoles().forEach(s -> stringJoiner.add(s));
		}
		return stringJoiner.toString();
	}

}
