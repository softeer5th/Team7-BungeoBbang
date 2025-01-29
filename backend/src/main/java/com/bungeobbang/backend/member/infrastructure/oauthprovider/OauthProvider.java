package com.bungeobbang.backend.member.infrastructure.oauthprovider;

import com.bungeobbang.backend.member.domain.ProviderType;
import com.bungeobbang.backend.member.infrastructure.oauthuserinfo.OauthUserInfo;

public interface OauthProvider {

    boolean is(ProviderType providerType);
    OauthUserInfo getUserInfo(String code);
    ProviderType getProviderType();
}
