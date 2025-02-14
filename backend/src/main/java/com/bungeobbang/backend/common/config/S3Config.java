package com.bungeobbang.backend.common.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.sts.StsClient;
import software.amazon.awssdk.services.sts.model.GetCallerIdentityResponse;

@Configuration
public class S3Config {
    private static final Logger logger = LoggerFactory.getLogger(S3Config.class);

    @Value("${cloud.aws.region}")
    private String region;

    @Bean
    public S3Client s3Client() {
        // DefaultCredentialsProvider 사용 (IAM Role 자동 감지)
        DefaultCredentialsProvider credentialsProvider = DefaultCredentialsProvider.create();

        // 현재 사용 중인 AWS 계정 및 IAM Role 확인
        try (StsClient stsClient = StsClient.builder()
                .credentialsProvider(credentialsProvider)
                .region(Region.of(region))
                .build()) {

            GetCallerIdentityResponse identity = stsClient.getCallerIdentity();
            logger.info("✅ 현재 AWS 계정 ID: {}", identity.account());
            logger.info("✅ 현재 IAM Role ARN: {}", identity.arn());
        } catch (Exception e) {
            logger.error("❌ AWS 계정 정보를 가져오는 데 실패했습니다: {}", e.getMessage());
        }

        return S3Client.builder()
                .region(Region.of(region))
                .credentialsProvider(credentialsProvider)
                .build();
    }
}
