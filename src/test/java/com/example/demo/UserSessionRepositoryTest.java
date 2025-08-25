//package com.example.demo;
//
//import com.example.demo.data.model.UserSession;
//import com.example.demo.data.repository.UserSessionRepository;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//import org.springframework.test.context.ActiveProfiles;
//
//import java.util.List;
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@DataJpaTest
//@ActiveProfiles("test")
//class UserSessionRepositoryTest {
//
//    @Autowired
//    private UserSessionRepository userSessionRepository;
//
//    private UserSession testSession;
//
//    @BeforeEach
//    void setUp() {
//        testSession = new UserSession();
//        testSession.setSessionTokenHash("testtoken");
//        testSession.setUserId("testuser");
//        testSession.setWalletAddress("testwallet");
//        testSession.setIpAddress("127.0.0.1");
//        testSession.setUserAgent("testagent");
//
//        userSessionRepository.save(testSession);
//    }
//
//    @Test
//    void findBySessionTokenHash_ShouldReturnSessionIfFound() {
//        Optional<UserSession> session = userSessionRepository.findBySessionTokenHash("testtoken");
//
//        assertTrue(session.isPresent(), "session should be found");
//        assertEquals("testuser", session.get().getUserId(), "user id should match the expected value");
//    }
//
//    @Test
//    void findBySessionTokenHash_ShouldReturnEmptyIfNotFound() {
//        Optional<UserSession> session = userSessionRepository.findBySessionTokenHash("invalidtoken");
//
//        assertFalse(session.isPresent(), "no session should be found");
//    }
//
//    @Test
//    void findByUserId_ShouldReturnSessions() {
//        List<UserSession> sessions = userSessionRepository.findByUserId("testuser");
//
//        assertEquals(1, sessions.size(), "should find one session for user");
//        assertEquals("testtoken", sessions.get(0).getSessionTokenHash(), "token hash should match the expected value");
//    }
//
//    @Test
//    void findByUserId_ShouldReturnEmptyListIfNotFound() {
//        List<UserSession> sessions = userSessionRepository.findByUserId("unknownuser");
//
//        assertTrue(sessions.isEmpty(), "no sessions should be found for an unknown user id");
//    }
//
//    @Test
//    void findByWalletAddress_ShouldReturnSessions() {
//        List<UserSession> sessions = userSessionRepository.findByWalletAddress("testwallet");
//
//        assertEquals(1, sessions.size(), "should find one session for wallet address");
//        assertEquals("testtoken", sessions.get(0).getSessionTokenHash(), "token hash should match the expected value");
//    }
//
//    @Test
//    void findByWalletAddress_ShouldReturnEmptyListIfNotFound() {
//        List<UserSession> sessions = userSessionRepository.findByWalletAddress("unknownwallet");
//
//        assertTrue(sessions.isEmpty(), "no sessions should be found for an unknown wallet address");
//    }
//
//    @Test
//    void touch_ShouldUpdateUserAgentAndIpAddressWhenTokenIsFound() {
//        int updatedRows = userSessionRepository.touch("testtoken", "192.168.0.1", "updatedagent");
//
//        assertEquals(1, updatedRows, "one session should be updated");
//
//        Optional<UserSession> session = userSessionRepository.findBySessionTokenHash("testtoken");
//        assertTrue(session.isPresent(), "session should still be found");
//        assertEquals("192.168.0.1", session.get().getIpAddress(), "ip address should be updated");
//        assertEquals("updatedagent", session.get().getUserAgent(), "user agent should be updated");
//    }
//
//    @Test
//    void touch_ShouldNotUpdateAnythingIfTokenNotFound() {
//        int updatedRows = userSessionRepository.touch("invalidtoken", "192.168.0.1", "updatedagent");
//
//        assertEquals(0, updatedRows, "no session should be updated for an unknown token hash");
//    }
//}
