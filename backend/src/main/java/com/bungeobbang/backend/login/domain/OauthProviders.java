package com.bungeobbang.backend.login.domain;

import com.bungeobbang.backend.common.exception.AuthException;
import com.bungeobbang.backend.member.domain.ProviderType;
import org.springframework.stereotype.Component;

import java.util.List;

import static com.bungeobbang.backend.common.exception.ErrorCode.NOT_SUPPORTED_OAUTH_SERVICE;

@Component
public class OauthProviders {

    private final List<OauthProvider> providers;

    public OauthProviders(final List<OauthProvider> providers) {
        this.providers = providers;
    }

    public OauthProvider mapping(final ProviderType providerType) {
        return providers.stream()
                .filter(provider -> provider.is(providerType))
                .findFirst()
                .orElseThrow(() -> new AuthException(NOT_SUPPORTED_OAUTH_SERVICE));
    }
}