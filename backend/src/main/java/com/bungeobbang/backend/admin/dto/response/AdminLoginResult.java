package com.bungeobbang.backend.admin.dto.response;

import com.bungeobbang.backend.member.dto.response.MemberTokens;

public record AdminLoginResult(
        MemberTokens memberTokens,
        AdminLoginResponse adminIdResponse
) {
}
