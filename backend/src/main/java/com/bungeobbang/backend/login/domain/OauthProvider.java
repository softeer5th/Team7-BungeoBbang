package com.bungeobbang.backend.login.domain;

import com.bungeobbang.backend.member.domain.ProviderType;
import org.springframework.web.client.RestTemplate;

public interface OauthProvider {

    RestTemplate restTemplate = new RestTemplate();

    boolean is(ProviderType providerType);
    OauthUserInfo getUserInfo(String code);
    ProviderType getProviderType();
}
