package com.bungeobbang.backend.member.infrastructure.oauthprovider;

import com.bungeobbang.backend.common.exception.AuthException;
import com.bungeobbang.backend.member.domain.OauthAccessToken;
import com.bungeobbang.backend.member.infrastructure.oauthuserinfo.OauthUserInfo;
import com.bungeobbang.backend.member.infrastructure.oauthuserinfo.KakaoUserInfo;

import com.bungeobbang.backend.member.domain.ProviderType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static com.bungeobbang.backend.common.exception.ErrorCode.INVALID_AUTHORIZATION_CODE;
import static com.bungeobbang.backend.common.exception.ErrorCode.NOT_SUPPORTED_OAUTH_SERVICE;
import static java.lang.Boolean.TRUE;

@Component
public class KakaoOauthProvider implements OauthProvider {

    private static final String PROPERTIES_PATH = "${oauth2.provider.kakao.";
    private static final ProviderType PROVIDER_TYPE = ProviderType.KAKAO;
    private static final String SECURE_RESOURCE = "secure_resource";

    private final String clientId;
    private final String clientSecret;
    private final String redirectUri;
    private final String tokenUri;
    private final String userUri;

    private final RestTemplate restTemplate;

    public KakaoOauthProvider(
            @Value(PROPERTIES_PATH + "client-id}") final String clientId,
            @Value(PROPERTIES_PATH + "client-secret}") final String clientSecret,
            @Value(PROPERTIES_PATH + "redirect-uri}") final String redirectUri,
            @Value(PROPERTIES_PATH + "request-token-uri}") final String tokenUri,
            @Value(PROPERTIES_PATH + "request-user-info-uri}") final String userUri,
            RestTemplate restTemplate
    ) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUri = redirectUri;
        this.tokenUri = tokenUri;
        this.userUri = userUri;
        this.restTemplate = restTemplate;
    }

    @Override
    public ProviderType getProviderType() {
        return ProviderType.KAKAO;
    }

    @Override
    public boolean is(ProviderType providerType) {
        return PROVIDER_TYPE.equals(providerType);
    }

    @Override
    public OauthUserInfo getUserInfo(final String code) {
        final String accessToken = requestAccessToken(code);
        final HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        final HttpEntity<MultiValueMap<String, String>> userInfoRequestEntity = new HttpEntity<>(headers);

        final Map<String, Boolean> queryParam = new HashMap<>();
        queryParam.put(SECURE_RESOURCE, TRUE);

        final ResponseEntity<KakaoUserInfo> response = restTemplate.exchange(
                userUri,
                HttpMethod.GET,
                userInfoRequestEntity,
                KakaoUserInfo.class,
                queryParam
        );

        if (response.getStatusCode().is2xxSuccessful()) {
            return response.getBody();
        }
        throw new AuthException(NOT_SUPPORTED_OAUTH_SERVICE);
    }

    private String requestAccessToken(final String code) {
        final HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        final MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", code);
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("redirect_uri", redirectUri);
        params.add("grant_type", "authorization_code");
        final HttpEntity<MultiValueMap<String, String>> accessTokenRequestEntity = new HttpEntity<>(params, headers);

        final ResponseEntity<OauthAccessToken> accessTokenResponse = restTemplate.exchange(
                tokenUri,
                HttpMethod.POST,
                accessTokenRequestEntity,
                OauthAccessToken.class
        );

        return Optional.ofNullable(accessTokenResponse.getBody())
                .orElseThrow(() -> new AuthException(INVALID_AUTHORIZATION_CODE))
                .getAccessToken();
    }
}
