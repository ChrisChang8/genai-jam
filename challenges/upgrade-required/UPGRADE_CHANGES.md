# Upgrade Changes Documentation

## Summary
This document outlines all changes made to upgrade the Spring Boot application from 2021 (Java 11, Spring Boot 2.5.3) to modern versions (Java 17, Spring Boot 3.4.0).

## Changes Made

### 1. Java Version Upgrade
**File:** `pom.xml`
- **Changed:** `<java.version>11</java.version>` → `<java.version>17</java.version>`
- **Why:** Java 11 reached end-of-life support. Java 17 is the latest Long-Term Support (LTS) release with extended support until 2029. It provides better performance, security updates, and modern language features.

### 2. Spring Boot Version Upgrade
**File:** `pom.xml`
- **Changed:** `spring-boot-starter-parent` version `2.5.3` → `3.4.0`
- **Why:** Spring Boot 2.5.3 was released in 2021 and no longer receives updates. Version 3.4.0 is the latest stable release offering improved performance, security patches, bug fixes, and compatibility with modern ecosystems.

### 3. MySQL Driver Update
**File:** `pom.xml`
- **Changed:** 
  - `mysql-connector-java` 8.0.22 → `mysql-connector-j` 8.0.33
  - Artifact ID changed from `mysql-connector-java` to `mysql-connector-j`
- **Why:** Oracle rebranded the connector package. The new `mysql-connector-j` is the official MySQL connector for Java 8+. Version 8.0.33 includes security fixes and performance improvements.

### 4. H2 Database Update
**File:** `pom.xml`
- **Changed:** H2 version `1.4.200` → `2.2.224`
- **Why:** H2 1.4.x is outdated. Version 2.2.x provides better performance, security patches, and is compatible with Spring Boot 3.x.

### 5. Mockito Update
**File:** `pom.xml`
- **Changed:** Mockito version `2.22.0` → `5.2.0`
- **Added:** New dependency `mockito-junit-jupiter` 5.2.0
- **Removed:** `junit-vintage-engine` (no longer needed)
- **Why:** Mockito 2.22.0 is extremely outdated. Version 5.2.0 is compatible with JUnit 5 (Jupiter) which Spring Boot 3 uses by default. The new dependency enables proper `@Mock` and `@ExtendWith` annotations in modern tests.

### 6. API Documentation Framework Replacement
**File:** `pom.xml`
- **Removed:** 
  - `springfox-swagger-ui` 2.9.2
  - `springfox-swagger2` 2.9.2
- **Added:** `springdoc-openapi-starter-webmvc-ui` 2.4.0
- **Why:** Springfox is no longer maintained for Spring Boot 3.x. SpringDoc OpenAPI is the modern replacement that supports OpenAPI 3.0 standard (successor to Swagger 2.0). It integrates seamlessly with Spring Boot 3.x and provides better performance and standards compliance.

### 7. JPA Package Migration
**Files:** 
- `src/main/java/com/conygre/spring/boot/entities/CompactDisc.java`
- `src/main/java/com/conygre/spring/boot/entities/Track.java`

- **Changed:** All imports from `javax.persistence.*` → `jakarta.persistence.*`
- **Why:** Spring Boot 3.0 migrated to Jakarta EE, which moved the namespace from `javax` to `jakarta`. This is a fundamental change in Spring's architecture required for Java EE compatibility. The `javax` package no longer exists in Spring Boot 3.x.

### 8. Swagger Configuration Modernization
**File:** `src/main/java/com/conygre/spring/boot/SwaggerConfig.java`
- **Changed:** Complete rewrite from Springfox to SpringDoc OpenAPI
- **Removed:**
  - `@EnableSwagger2` annotation
  - Springfox imports (builders, Docket, etc.)
  - Old Swagger 2.0 configuration
- **Added:**
  - OpenAPI 3.0 configuration using `OpenAPI` bean
  - Modern `Info` object with Contact details
  - Proper OpenAPI 3.0 structure
- **Why:** Springfox is incompatible with Spring Boot 3. SpringDoc OpenAPI is the standard for modern Spring applications and uses the OpenAPI 3.0 specification which is the industry standard for API documentation.

## Key Points

### Backward Compatibility
- No breaking changes to the application logic
- All existing endpoints and functionality remain the same
- Database schema and data are unaffected

### Testing & Validation
To verify the upgrade:
1. Run `mvn clean compile` to ensure all code compiles
2. Run `mvn test` to verify unit tests pass
3. Run `mvn spring-boot:run` to start the application (with appropriate database configuration)
4. Access Swagger UI at: `http://localhost:8080/swagger-ui.html`

### Database Configuration
The MySQL connection still works the same way. Ensure your environment variables are set:
- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`

## Version Timeline
- **Original:** Java 11, Spring Boot 2.5.3 (August 2021)
- **Upgraded:** Java 17 LTS, Spring Boot 3.4.0 (2026)
- **Support Until:** Java 17 supported until September 2029, Spring Boot 3.4.0 supported according to Pivotal's release schedule

## References
- [Spring Boot 3.0 Migration Guide](https://spring.io/blog/2022/08/18/spring-boot-3-0-0-m4-is-now-available)
- [Jakarta EE Migration](https://jakarta.ee/)
- [SpringDoc OpenAPI](https://springdoc.org/)
- [MySQL Connector/J](https://dev.mysql.com/doc/connector-j/en/)
