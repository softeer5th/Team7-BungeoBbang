package com.bungeobbang.backend.member.infrastructure.oauthprovider;

import com.bungeobbang.backend.member.domain.ProviderType;
import com.bungeobbang.backend.member.infrastructure.oauthuserinfo.OauthUserInfo;
import org.springframework.web.client.RestTemplate;

public interface OauthProvider {

    RestTemplate restTemplate = new RestTemplate();

    boolean is(ProviderType providerType);
    OauthUserInfo getUserInfo(String code);
    ProviderType getProviderType();
}
