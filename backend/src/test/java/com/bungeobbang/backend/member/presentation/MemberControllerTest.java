package com.bungeobbang.backend.member.presentation;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(
        properties = "de.flapdoodle.mongodb.embedded.version=5.0.5"
)

@AutoConfigureMockMvc
class MemberControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("지원하지 않는 ProviderType으로 로그인 시 실패")
    void login_invalidProvider() throws Exception {
        mockMvc.perform(post("/student/auth/naver/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"code\": \"code\"}"))
                .andExpect(status().isNotImplemented());
    }
}
