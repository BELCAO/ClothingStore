package com.cdweb.backend.repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdweb.backend.entity.User;
import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long>  {
	boolean existsByEmail(String email);
	boolean existsByPhone(String phone);
	User getByEmail(String email);
	Optional<User> findByEmail(String email);
	Page<User> findAllByRole(String role, Pageable pageable);
	Page<User> findAll(Pageable pageable);
}
