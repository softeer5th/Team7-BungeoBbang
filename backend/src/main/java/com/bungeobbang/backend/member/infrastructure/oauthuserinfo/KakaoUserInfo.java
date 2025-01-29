package com.bungeobbang.backend.member.infrastructure.oauthuserinfo;

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
