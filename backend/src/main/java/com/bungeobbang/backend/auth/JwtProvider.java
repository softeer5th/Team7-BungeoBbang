package com.bungeobbang.backend.auth;

import com.bungeobbang.backend.auth.domain.Authority;
import com.bungeobbang.backend.common.exception.AuthException;
import com.bungeobbang.backend.member.dto.response.MemberTokens;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

import static com.bungeobbang.backend.common.exception.ErrorCode.EXPIRED_ACCESS_TOKEN;
import static com.bungeobbang.backend.common.exception.ErrorCode.INVALID_ACCESS_TOKEN;

@Component
public class JwtProvider {
    private static final String EMPTY_SUBJECT = "";
    private final SecretKey secretKey;
    private final Long accessExpirationTime;
    private final Long refreshExpirationTime;

    public JwtProvider(
            @Value("${security.jwt.secret-key}") final String secretKey,
            @Value("${security.jwt.access-expiration-time}") final Long accessExpirationTime,
            @Value("${security.jwt.refresh-expiration-time}") final Long refreshExpirationTime
    ) {
        this.secretKey = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
        this.accessExpirationTime = accessExpirationTime;
        this.refreshExpirationTime = refreshExpirationTime;
    }

    public MemberTokens generateLoginToken(final String subject,
                                           final Authority authority,
                                           final String uuid,
                                           String universityId) {
        final String accessToken = createTokenWithRole(subject, authority, uuid, universityId, accessExpirationTime);
        final String refreshToken = createToken(EMPTY_SUBJECT, refreshExpirationTime);
        return new MemberTokens(accessToken, refreshToken);
    }

    public String createAccessToken(final String subject, final Authority authority, final String uuid) {
        return createTokenWithRole(subject, authority, uuid, accessExpirationTime);
    }

    /*
     * subject : memberId/adminId
     * claim : role, uuid
     */
    private String createTokenWithRole(final String subject, final Authority authority,
                                       final String uuid, final Long validityInMilliseconds) {
        final Date now = new Date();
        final Date expiresAt = new Date(now.getTime() + validityInMilliseconds);

        return Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setSubject(subject)
                .claim(Claim.ROLE.toString(), authority)
                .claim(Claim.UUID.toString(), uuid)
                .setIssuedAt(now)
                .setExpiration(expiresAt)
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    private String createTokenWithRole(final String subject, final Authority authority,
                                       final String uuid,
                                       final String universityId, final Long validityInMilliseconds) {
        final Date now = new Date();
        final Date expiresAt = new Date(now.getTime() + validityInMilliseconds);

        return Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setSubject(subject)
                .claim(Claim.ROLE.toString(), authority)
                .claim(Claim.UUID.toString(), uuid)
                .claim(Claim.UNIVERSITY.toString(), universityId)
                .setIssuedAt(now)
                .setExpiration(expiresAt)
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    private String createToken(final String subject, final Long validityInMilliseconds) {
        final Date now = new Date();
        final Date expiresAt = new Date(now.getTime() + validityInMilliseconds);

        return Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setSubject(subject)
                .setIssuedAt(now)
                .setExpiration(expiresAt)
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public String getSubject(final String token) {
        return parseToken(token)
                .getSubject();
    }

    public String getClaim(final String token, final Claim claimName) {
        return parseToken(token)
                .get(claimName.toString(), String.class);
    }

    private Claims parseToken(final String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public void validateToken(final String accessToken) {
        try {
            parseToken(accessToken);
        } catch (final ExpiredJwtException e) {
            throw new AuthException(EXPIRED_ACCESS_TOKEN);
        } catch (final JwtException | IllegalArgumentException e) {
            throw new AuthException(INVALID_ACCESS_TOKEN);
        }
    }
}
