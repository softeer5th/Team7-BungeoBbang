package com.bungeobbang.backend.member.infrastructure.oauthuserinfo;

import com.fasterxml.jackson.annotation.JsonProperty;

public record GoogleUserInfo(
        @JsonProperty("id")
        String socialId,
        @JsonProperty("email")
        String email,
        @JsonProperty("name")
        String name
) implements OauthUserInfo {
    @Override
    public String getSocialLoginId() {
        return socialId;
    }
}
