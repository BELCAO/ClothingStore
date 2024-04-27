package com.cdweb.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdweb.backend.entity.Account;
import java.util.Optional;


@Repository
public interface AccountRepository extends JpaRepository<Account, Long>  {
	boolean existsByEmail(String email);
	boolean existsByPhone(String phone);
	Optional<Account> findByEmail(String email);
	
}
