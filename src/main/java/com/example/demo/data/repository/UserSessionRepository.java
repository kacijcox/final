package com.example.demo.data.repository;

import com.example.demo.data.model.UserSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface UserSessionRepository extends JpaRepository<UserSession, String> {

    Optional<UserSession> findBySessionTokenHash(String tokenHash);

    List<UserSession> findByUserId(String userId);

    List<UserSession> findByWalletAddress(String walletAddress);

    @Transactional
    @Modifying
    @Query("update UserSession s set s.ipAddress = :ip, s.userAgent = :ua where s.sessionTokenHash = :tokenHash")
    int touch(String tokenHash, String ip, String ua);
}