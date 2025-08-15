package com.example.demo.data.repository;

import com.example.demo.data.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByUserName(String userName);

    boolean existsByUserName(String userName);
}
