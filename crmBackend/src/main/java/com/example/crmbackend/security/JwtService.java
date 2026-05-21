package com.example.crmbackend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${app.jwt.secret:ZmFsbGJhY2tfc2VjcmV0X2RvX25vdF91c2VfaW5fcHJvZF9wbGVhc2VfY2hhbmdlX21l}")
    private String secret;

    @Value("${app.jwt.expiration-ms:3600000}")
    private long expiration;

    private SecretKey key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
    }

    public String generateToken(String username, String role, Long userId) {
        return Jwts.builder()
                .subject(username)
                .claims(Map.of("role", role, "uid", userId))
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(key())
                .compact();
    }

    public String extractUsername(String token) {
        return extract(token, Claims::getSubject);
    }

    public boolean isValid(String token, String username) {
        try {
            String u = extractUsername(token);
            return u.equals(username) && !extract(token, Claims::getExpiration).before(new Date());
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    private <T> T extract(String token, Function<Claims, T> resolver) {
        Claims claims = Jwts.parser().verifyWith(key()).build().parseSignedClaims(token).getPayload();
        return resolver.apply(claims);
    }
}
