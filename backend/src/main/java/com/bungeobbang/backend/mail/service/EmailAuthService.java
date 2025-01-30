package com.bungeobbang.backend.mail.service;

import com.bungeobbang.backend.common.exception.AuthException;
import com.bungeobbang.backend.common.exception.ErrorCode;
import com.bungeobbang.backend.mail.domain.repository.EmailVerificationCodeRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.Random;

import static com.bungeobbang.backend.common.exception.ErrorCode.TEMPLATE_FILE_READ_ERROR;

@Service
public class EmailAuthService {
    private final EmailVerificationCodeRepository emailVerificationCodeRepository;
    private final JavaMailSender mailSender;
    private final String sender;
    private final String title;

    public EmailAuthService(EmailVerificationCodeRepository emailVerificationCodeRepository,
                            JavaMailSender mailSender,
                            @Value("${spring.mail.username}") String sender,
                            @Value("${spring.mail.subject}") String title) {
        this.emailVerificationCodeRepository = emailVerificationCodeRepository;
        this.mailSender = mailSender;
        this.sender = sender;
        this.title = title;
    }

    public void sendVerificationEmail(final String email) {
        final String code = generateVerificationCode();
        emailVerificationCodeRepository.save(email, code);

        sendAuthMail(email, code);
    }

    public void verifyCode(final String email, final String code) {
        final String verificationCode = emailVerificationCodeRepository.findByEmail(email);
        if (verificationCode == null) {
            throw new AuthException(ErrorCode.EMAIL_CODE_EXPIRED);
        }

        if (!verificationCode.equals(code)) {
            throw new AuthException(ErrorCode.CODE_MISMATCH);
        }
    }

    private String generateVerificationCode() {
        Random random = new Random();
        int code = 1000 + random.nextInt(9000);
        return String.valueOf(code);
    }

    private String loadEmailTemplate(final String code) {
        ClassPathResource resource = new ClassPathResource("templates/email-template.html");
        try {
            String emailHtml = Files.readString(resource.getFile().toPath(), StandardCharsets.UTF_8);
            return emailHtml.replace("{{VERIFICATION_CODE}}", code);
        } catch (IOException e) {
            throw new AuthException(TEMPLATE_FILE_READ_ERROR);
        }
    }

    private void sendAuthMail(final String email, final String code) {
        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            messageHelper.setFrom(sender);
            messageHelper.setTo(email);
            messageHelper.setSubject(title);
            messageHelper.setText(loadEmailTemplate(code), true);
        };

        mailSender.send(messagePreparator);
    }
}
