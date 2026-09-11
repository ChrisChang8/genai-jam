# Instructor Presentation Script - Upgrade Required Challenge

## Opening
"Hi, I've successfully upgraded the Spring Boot application from 2021 to modern versions. Let me walk you through what needed to be done and why."

## Main Changes

### 1. Framework Upgrades
"First, I upgraded the core framework stack:
- Java version from 11 to 17 (the latest Long-Term Support release)
- Spring Boot from version 2.5.3 to 3.4.0 (the current stable release)

These are foundational changes because Java 11 and Spring Boot 2.5.3 from 2021 no longer receive security updates and bug fixes."

### 2. Dependency Updates
"Second, I updated the dependencies in the pom.xml:
- MySQL connector changed from 'mysql-connector-java' to 'mysql-connector-j' with the latest version
- H2 database updated for test compatibility
- Mockito updated to version 5.2.0 with proper JUnit 5 support

The key thing here is that the MySQL driver was actually renamed by Oracle, so we had to use the new package name."

### 3. The Critical Breaking Change
"Third, and this was the most important part — I had to migrate from the 'javax.persistence' package to 'jakarta.persistence'. 

When Spring Boot moved to version 3.0, it migrated the entire Jakarta EE framework, which meant all the import statements in our entity classes (CompactDisc.java and Track.java) needed to be updated. This is not optional — Spring Boot 3 simply doesn't support the old javax namespace anymore."

### 4. API Documentation Framework
"Fourth, I replaced Springfox with SpringDoc OpenAPI. Springfox is no longer maintained and incompatible with Spring Boot 3. SpringDoc OpenAPI is the modern standard that supports OpenAPI 3.0, which is the industry-standard format for API documentation."

### 5. Swagger Configuration Rewrite
"I completely rewrote the SwaggerConfig.java file to use the new OpenAPI 3.0 structure instead of the old Swagger 2.0 configuration. Instead of using @EnableSwagger2 and Docket builders, it now uses the modern OpenAPI bean configuration."

## Key Point
"What's important to understand is that this wasn't just about changing version numbers in pom.xml. The migration required code changes because the underlying frameworks changed their structure, especially the package namespace migration from javax to jakarta."

## Testing
"To verify everything works:
- The code compiles cleanly with 'mvn clean compile'
- The application starts with 'mvn spring-boot:run' (with proper MySQL credentials)
- All endpoints remain functional — no breaking changes to the API
- The Swagger UI is now accessible at the standard endpoint"

## Closing
"The upgrade maintains all existing functionality while modernizing the stack to use current, supported versions with better performance and security patches. All the changes are documented in the UPGRADE_CHANGES.md file."
