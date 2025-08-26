package com.example.demo.data.repository;

import com.example.demo.data.model.UserSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface UserSessionRepository extends JpaRepository<UserSession, String> {

    Optional<UserSession> findBySessionTokenHash(String tokenHash);

    List<UserSession> findByUserId(String userId);

    List<UserSession> findByWalletAddress(String walletAddress);

    @Transactional
    @Modifying
    @Query("UPDATE UserSession s SET s.ipAddress = :ip, s.userAgent = :ua, s.lastSeenAt = CURRENT_TIMESTAMP WHERE s.sessionTokenHash = :tokenHash")
    int touch(@Param("tokenHash") String tokenHash, @Param("ip") String ip, @Param("ua") String ua);
}