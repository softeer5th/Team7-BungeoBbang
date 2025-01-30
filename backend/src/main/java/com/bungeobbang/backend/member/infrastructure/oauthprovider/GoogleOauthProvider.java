package com.bungeobbang.backend.member.infrastructure.oauthprovider;

import com.bungeobbang.backend.common.exception.AuthException;
import com.bungeobbang.backend.common.exception.ErrorCode;
import com.bungeobbang.backend.member.domain.OauthAccessToken;
import com.bungeobbang.backend.member.domain.ProviderType;
import com.bungeobbang.backend.member.infrastructure.oauthuserinfo.GoogleUserInfo;
import com.bungeobbang.backend.member.infrastructure.oauthuserinfo.OauthUserInfo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

import static org.springframework.http.HttpMethod.POST;

@Component
public class GoogleOauthProvider implements OauthProvider {
    private static final ProviderType PROVIDER_TYPE = ProviderType.GOOGLE;
    private static final String prefix = "${oauth2.provider.google.";

    private final String clientId;
    private final String clientSecret;
    private final String redirectUri;
    private final String tokenUri;
    private final String userUri;

    public GoogleOauthProvider(@Value(prefix + "client-id}") String clientId,
                               @Value(prefix + "client-secret}") String clientSecret,
                               @Value(prefix + "redirect-uri}") String redirectUri,
                               @Value(prefix + "request-token-uri}") String tokenUri,
                               @Value(prefix + "request-user-info-uri}") String userUri) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUri = redirectUri;
        this.tokenUri = tokenUri;
        this.userUri = userUri;
    }

    @Override
    public boolean is(ProviderType provider) {
        return PROVIDER_TYPE.equals(provider);
    }

    @Override
    public OauthUserInfo getUserInfo(final String code) {
        // google에 access token 요청
        String accessToken = getAccessToken(code);
        // access token으로 사용자 정보 요청
        final ResponseEntity<GoogleUserInfo> userInfo = new RestTemplate().exchange(
                userUri,
                HttpMethod.GET,
                getUserInfoRequestEntity(accessToken),
                GoogleUserInfo.class
        );

        // 사용자 정보 반환
        return Optional.ofNullable(userInfo.getBody())
                .orElseThrow(() -> new AuthException(ErrorCode.OAUTH_USER_INFO_FETCH_FAILED));
    }

    @Override
    public ProviderType getProviderType() {
        return PROVIDER_TYPE;
    }

    private String getAccessToken(final String code) {
        final HttpEntity<MultiValueMap<String, String>> accessTokenRequestEntity = getAccessTokenRequestEntity(code);
        final ResponseEntity<OauthAccessToken> accessToken = new RestTemplate().exchange(tokenUri, POST, accessTokenRequestEntity, OauthAccessToken.class);

        return Optional.ofNullable(accessToken.getBody())
                .orElseThrow(() -> new AuthException(ErrorCode.OAUTH_ACCESS_TOKEN_FETCH_FAILED))
                .getAccessToken();
    }

    private HttpEntity<MultiValueMap<String, String>> getAccessTokenRequestEntity(final String code) {
        final HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        final MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", code);
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("redirect_uri", redirectUri);
        params.add("grant_type", "authorization_code");
        return new HttpEntity<>(params, headers);
    }

    private HttpEntity<MultiValueMap<String, String>> getUserInfoRequestEntity(final String token) {
        final HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setBearerAuth(token);
        return new HttpEntity<>(headers);
    }
}