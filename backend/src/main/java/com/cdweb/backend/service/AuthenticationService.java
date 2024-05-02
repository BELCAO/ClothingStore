package com.cdweb.backend.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

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
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	
	public String authentication(String email, String password) {
		Account account = accountRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Account Not Found"));
		boolean authentication = passwordEncoder.matches(password, account.getPassword());
		if(!authentication) {
			throw new RuntimeException();
		}
		return generateToken(account);
	}
	
	public String againAuthentication(Account account) {
		return generateToken(account);
	}
	
	private String generateToken(Account account) {
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
	
	private String buildScope(Account account) {
		StringJoiner stringJoiner = new StringJoiner(" ");
		if(!CollectionUtils.isEmpty(account.getRole())) {
			account.getRole().forEach(s -> stringJoiner.add(s));
		}
		return stringJoiner.toString();
	}

}
