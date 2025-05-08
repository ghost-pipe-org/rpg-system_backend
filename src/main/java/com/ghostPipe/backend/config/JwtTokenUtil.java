package com.ghostPipe.backend.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;

import com.ghostPipe.backend.model.entities.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenUtil {
    
    @Value("${jwt.secret}")
    private String secret;
    
    @Value("${jwt.expiration}")
    private Long expiration;

    public String generateToken(User user) {

    SecretKey key = Keys.hmacShaKeyFor(secret.getBytes());
    return Jwts.builder()
        .setSubject(user.getEmail())
        .claim("id", user.getId())
        .claim("role", user.getRole().name())
        .setExpiration(new Date(System.currentTimeMillis() + expiration * 1000))
        .signWith(key)
        .compact();
}
}