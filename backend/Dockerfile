# 1. OpenJDK 17 기반 이미지 사용
FROM openjdk:17-jdk

# 3. JAR 파일을 컨테이너로 복사

ARG JAR_FILE=build/libs/backend-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar

# 4. 컨테이너 실행 시 JAR 파일 실행
ENTRYPOINT ["java", "-jar", "/app.jar"]

# 5. 기본 포트를 외부에 노출
EXPOSE 8080