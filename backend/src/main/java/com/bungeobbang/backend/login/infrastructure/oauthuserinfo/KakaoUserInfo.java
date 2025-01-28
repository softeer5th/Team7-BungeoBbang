package com.bungeobbang.backend.login.infrastructure.oauthuserinfo;

import com.bungeobbang.backend.login.domain.OauthUserInfo;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PRIVATE;

@NoArgsConstructor(access = PRIVATE)
@AllArgsConstructor
public class KakaoUserInfo implements OauthUserInfo {

    @JsonProperty("id")
    private String socialLoginId;

    @Override
    public String getSocialLoginId() {
        return socialLoginId;
    }
}
