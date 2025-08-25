package com.example.demo;

import com.example.demo.data.model.User;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    @Test
    void defaultRoleShouldBeUser() {
        User user = new User("testUser", "testPassword");
        assertEquals(User.Role.USER, user.getRole(), "default role should be user");
    }

    @Test
    void testConstructorValues() {
        User user = new User("testUser", "testPassword", User.Role.ADMIN);
        assertEquals("testUser", user.getUserName(), "username should match value");
        assertEquals("testPassword", user.getPassword(), "password should match value");
        assertEquals(User.Role.ADMIN, user.getRole(), "user role should match value");
    }

    @Test
    void testSettersAndGetters() {
        User user = new User();
        user.setUserName("newUser");
        user.setPassword("newPassword");
        user.setRole(User.Role.ADMIN);

        assertEquals("newUser", user.getUserName(), "username should be updated");
        assertEquals("newPassword", user.getPassword(), "password should be updated");
        assertEquals(User.Role.ADMIN, user.getRole(), "role should be updated to admin");
    }
}