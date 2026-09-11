# Compact Disc REST API

A Spring Boot REST API for managing a catalog of compact disc (album) records. This application provides CRUD operations for compact discs, integrates with MySQL for persistence, and includes interactive API documentation via Swagger.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Database Setup](#database-setup)
- [Configuration](#configuration)
- [Building the Application](#building-the-application)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [API Examples](#api-examples)
- [Swagger Documentation](#swagger-documentation)
- [Static HTML Clients](#static-html-clients)
- [Logging](#logging)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Development](#development)

## Overview

The Compact Disc REST API is a Spring Boot 2.5.3 application built with Java 11 that manages a catalog of albums. The API supports:

- **List all albums** - Retrieve the complete catalog
- **Get album details** - Fetch a single album by ID
- **Create new album** - Add a new album to the catalog
- **Delete album** - Remove an album from the catalog
- **HTTP status handling** - Explicit 404 handling for missing records

The application uses:
- **Spring Boot 2.5.3** - Framework foundation
- **Spring Data JPA** - Object-relational mapping
- **MySQL 8.0** - Primary database
- **Springfox Swagger 2.9.2** - API documentation
- **Log4j2** - Structured logging

## Prerequisites

### Required Software

- **Java Development Kit (JDK) 11+**
  ```bash
  java -version
  ```
  Should show: `openjdk version "11.x.x"` or similar

- **Apache Maven 3.6+**
  ```bash
  mvn -version
  ```
  Should show: `Apache Maven 3.6.x` or later

- **MySQL Server 5.7 or 8.0**
  - Must be running and accessible
  - Credentials required (default: root/c0nygre1)

### Optional Tools

- **Git** - For version control
- **cURL** or **Postman** - For testing REST endpoints
- **Docker** - For containerized deployment
- **Docker Compose** - For multi-container orchestration

## Project Structure

```
no-readme/
├── pom.xml                          # Maven configuration
├── readme.md                        # Original challenge brief
├── src/
│   ├── main/
│   │   ├── java/com/conygre/spring/boot/
│   │   │   ├── AppConfig.java                    # Spring Boot application entry point
│   │   │   ├── SwaggerConfig.java               # API documentation configuration
│   │   │   ├── entities/
│   │   │   │   ├── CompactDisc.java             # Album entity model
│   │   │   │   └── Track.java                   # Track entity model
│   │   │   ├── services/
│   │   │   │   ├── CompactDiscService.java      # Service interface
│   │   │   │   └── CompactDiscServiceImpl.java   # Service implementation (business logic)
│   │   │   ├── repos/
│   │   │   │   └── CompactDiscRepository.java   # Data access layer (Spring Data JPA)
│   │   │   └── rest/
│   │   │       └── CompactDiscController.java   # REST API endpoints
│   │   └── resources/
│   │       ├── application.properties            # Database configuration (MySQL)
│   │       ├── application-docker.properties     # Docker-specific configuration
│   │       ├── log4j2.properties                 # Logging configuration
│   │       └── static/                           # Frontend files
│   │           ├── index.html                    # Main landing page
│   │           ├── listcds.html                  # List albums page
│   │           ├── constructorfunctionajax.html  # Constructor-based AJAX client
│   │           ├── promisefetch.html             # Promise-based Fetch API client
│   │           ├── temp.html                     # Temporary page
│   │           └── css/                          # Stylesheets
│   └── test/                        # Unit tests (if present)
├── sql/
│   └── createTables.sql             # Database schema and sample data
├── rest/
│   ├── postcd.rest                  # Example POST request
│   └── deletecd.rest                # Example DELETE request
└── target/                          # Maven build output (generated)
    ├── classes/                     # Compiled Java classes
    └── ...                          # Build artifacts
```

## Database Setup

### Step 1: Create the Database and Tables

1. **Connect to MySQL:**
   ```bash
   mysql -u root -p
   ```

2. **Run the SQL schema script:**
   ```bash
   mysql -u root -p < sql/createTables.sql
   ```

   This script will:
   - Create a database named `conygre`
   - Create `compact_discs` table with columns: id, title, artist, tracks, price
   - Create `tracks` table for individual track information
   - Load sample album data (8 albums)
   - Load sample track data

3. **Verify the setup:**
   ```sql
   use conygre;
   select * from compact_discs;
   select count(*) from compact_discs;  -- Should return 8
   ```

### Step 2: Configure Database Credentials (if needed)

If your MySQL credentials differ from the default, edit `src/main/resources/application.properties`:

```properties
# Default credentials
spring.datasource.username=root
spring.datasource.password=c0nygre1
```

**Note:** On shared VMs, database credentials are typically stored in a file named `installed.txt` on the desktop.

### Step 3: Sample Data

The database is pre-populated with 8 albums:
- Is This It - The Strokes (11 tracks, $13.99)
- Just Enough Education to Perform - Stereophonics (11 tracks, $10.99)
- Parachutes - Coldplay (10 tracks, $11.99)
- White Ladder - David Gray (10 tracks, $9.99)
- Greatest Hits - Penelope (14 tracks, $14.99)
- Echo Park - Feeder (12 tracks, $13.99)
- Mezzanine - Massive Attack (11 tracks, $12.99)
- Spice World - Spice Girls (11 tracks, $4.99)

## Configuration

### Application Properties

#### Standard Configuration (`application.properties`)

Used for local development with a standard MySQL instance:

```properties
# Database connection
spring.datasource.url=jdbc:mysql://localhost:3306/conygre?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=c0nygre1
spring.datasource.driverClassName=com.mysql.cj.jdbc.Driver

# Server port (optional, default is 8080)
# server.port=8081

# Logging output
logging.file=myapplication.log
```

**Key settings:**
- `spring.datasource.url` - MySQL JDBC connection string
- `serverTimezone=UTC` - Ensures consistent timezone handling
- `useUnicode=true` - Supports international characters
- `logging.file` - Creates application log file in the project root

#### Docker Configuration (`application-docker.properties`)

Used when running in a Docker container with Docker networking:

```properties
spring.datasource.url=jdbc:mysql://cddb:3306/conygre
spring.datasource.username=root
spring.datasource.password=secret123
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
```

**Notes:**
- Hostname `cddb` - Docker service name (not localhost)
- Different password for containerized environment
- This profile is activated with `spring.profiles.active=docker`

### Logging Configuration (`log4j2.properties`)

Log4j2 is configured for console output:

```properties
status = error                                    # Log4j configuration status
rootLogger.level = info                          # Root logger level
appender.console.type = Console                  # Output to console
appender.console.layout.pattern = %d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n

# Application-specific logging
logger.conygre.name=com.conygre.spring.boot
logger.conygre.level=info                        # App package logging level
```

**Current behavior:**
- Logs write to console output (not file, despite the application.properties setting)
- Log level is set to INFO - shows info, warn, error messages
- File logging (`myapplication.log`) is configured but not actively used in the current setup

To enable file logging, add:
```properties
appender.file.type = File
appender.file.name = LOGFILE
appender.file.fileName = logs/application.log
```

## Building the Application

### Quick Build

```bash
cd challenges/no-readme
mvn clean package
```

This command:
1. Cleans previous build artifacts
2. Compiles source code
3. Runs tests (if present)
4. Packages as a JAR file

**Output:** `target/CompactDiscRestDataBoot-0.0.1-SNAPSHOT.jar`

### Skip Tests During Build

```bash
mvn clean package -DskipTests
```

Useful for faster builds when you've already verified tests locally.

### Build with Verbose Output

```bash
mvn clean package -X
```

Shows detailed compilation and dependency information.

### Maven Lifecycle Phases

- `mvn clean` - Remove build artifacts
- `mvn compile` - Compile source code only
- `mvn test` - Run tests
- `mvn package` - Create JAR file
- `mvn install` - Install to local Maven repository
- `mvn verify` - Run full verification pipeline

## Running the Application

### Prerequisites for Running

1. MySQL server must be running
2. Database `conygre` must exist with tables created
3. Maven build must complete successfully

### Method 1: Spring Boot Maven Plugin (Recommended)

```bash
cd challenges/no-readme
mvn spring-boot:run
```

**Advantages:**
- Simplest method
- Automatically handles classpath
- Useful for development

**Sample output:**
```
Started AppConfig in 3.452 seconds
Tomcat started on port(s): 8080
```

### Method 2: Run JAR File

```bash
cd challenges/no-readme/target
java -jar CompactDiscRestDataBoot-0.0.1-SNAPSHOT.jar
```

**Advantages:**
- Production-like execution
- Portable (jar can run anywhere with Java)

### Method 3: Run with Custom Configuration

```bash
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=docker"
```

Or with JAR:

```bash
java -jar target/CompactDiscRestDataBoot-0.0.1-SNAPSHOT.jar --spring.profiles.active=docker
```

### Method 4: Custom Server Port

```bash
# Via Maven
mvn spring-boot:run -Dspring-boot.run.arguments="--server.port=9090"

# Via JAR
java -jar target/CompactDiscRestDataBoot-0.0.1-SNAPSHOT.jar --server.port=9090
```

### Verifying the Application Started

```bash
# Test if server is running
curl http://localhost:8080/api/compactdiscs

# Should return JSON array of albums
```

## API Endpoints

### Base URL
```
http://localhost:8080/api/compactdiscs
```

### Endpoint Summary

| Method | Endpoint | Description | Status Codes |
|--------|----------|-------------|--------------|
| GET | `/api/compactdiscs` | List all albums | 200 |
| GET | `/api/compactdiscs/{id}` | Get single album by ID | 200 |
| GET | `/api/compactdiscs/404/{id}` | Get album with 404 handling | 200, 404 |
| POST | `/api/compactdiscs` | Create new album | 201 |
| DELETE | `/api/compactdiscs/{id}` | Delete album by ID | 204 |
| DELETE | `/api/compactdiscs` | Delete album by object | 204 |

### Detailed Endpoint Documentation

#### 1. List All Albums

**Request:**
```http
GET /api/compactdiscs
Content-Type: application/json
```

**Response (200 OK):**
```json
[
  {
    "id": 9,
    "title": "Is This It",
    "artist": "The Strokes",
    "tracks": 11,
    "price": 13.99
  },
  {
    "id": 10,
    "title": "Just Enough Education to Perform",
    "artist": "Stereophonics",
    "tracks": 11,
    "price": 10.99
  }
]
```

**Example:**
```bash
curl http://localhost:8080/api/compactdiscs
```

---

#### 2. Get Album by ID

**Request:**
```http
GET /api/compactdiscs/{id}
Content-Type: application/json
```

**Response (200 OK):**
```json
{
  "id": 9,
  "title": "Is This It",
  "artist": "The Strokes",
  "tracks": 11,
  "price": 13.99
}
```

**Example:**
```bash
curl http://localhost:8080/api/compactdiscs/9
```

**Note:** Returns `null` if album doesn't exist (no explicit HTTP 404).

---

#### 3. Get Album with Explicit 404

**Request:**
```http
GET /api/compactdiscs/404/{id}
Content-Type: application/json
```

**Response (200 OK) - Album found:**
```json
{
  "id": 9,
  "title": "Is This It",
  "artist": "The Strokes",
  "tracks": 11,
  "price": 13.99
}
```

**Response (404 NOT FOUND) - Album not found:**
```
(empty response body)
```

**Example:**
```bash
# Album exists
curl -i http://localhost:8080/api/compactdiscs/404/9

# Album doesn't exist
curl -i http://localhost:8080/api/compactdiscs/404/999
```

**Note:** This endpoint is useful for REST clients that need explicit HTTP status codes.

---

#### 4. Create New Album

**Request:**
```http
POST /api/compactdiscs
Content-Type: application/json

{
  "title": "Sweet Caroline",
  "artist": "Neil Diamond",
  "price": 13.99,
  "tracks": 1
}
```

**Response (201 Created):**
```json
{
  "id": 17,
  "title": "Sweet Caroline",
  "artist": "Neil Diamond",
  "price": 13.99,
  "tracks": 1
}
```

**Important Notes:**
- `id` field should be omitted in the request (auto-generated)
- The response includes the generated ID
- All fields except `id` should be provided

**Example:**
```bash
curl -X POST http://localhost:8080/api/compactdiscs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Sweet Caroline",
    "artist": "Neil Diamond",
    "price": 13.99,
    "tracks": 1
  }'
```

---

#### 5. Delete Album by ID

**Request:**
```http
DELETE /api/compactdiscs/{id}
```

**Response (204 No Content):**
```
(empty response body)
```

**Example:**
```bash
curl -X DELETE http://localhost:8080/api/compactdiscs/9
```

---

#### 6. Delete Album by Object

**Request:**
```http
DELETE /api/compactdiscs
Content-Type: application/json

{
  "id": 9,
  "title": "Is This It",
  "artist": "The Strokes",
  "tracks": 11,
  "price": 13.99
}
```

**Response (204 No Content):**
```
(empty response body)
```

**Example:**
```bash
curl -X DELETE http://localhost:8080/api/compactdiscs \
  -H "Content-Type: application/json" \
  -d '{
    "id": 9,
    "title": "Is This It",
    "artist": "The Strokes",
    "tracks": 11,
    "price": 13.99
  }'
```

---

## API Examples

The `rest/` directory contains example requests for common operations:

### POST Example: `rest/postcd.rest`

Create a new album:

```http
POST http://localhost:8080/api/compactdiscs
Content-type: application/json

{
    "title" : "Sweet Caroline",
    "artist" : "Neil Diamond",
    "price" : "13.99",
    "tracks" : "1"
}
```

**To run in VS Code:**
1. Install the "REST Client" extension
2. Open `rest/postcd.rest`
3. Click "Send Request" above the HTTP request
4. View response in the sidebar

**Using cURL:**
```bash
curl -X POST http://localhost:8080/api/compactdiscs \
  -H "Content-type: application/json" \
  -d '{"title":"Sweet Caroline","artist":"Neil Diamond","price":"13.99","tracks":"1"}'
```

---

### DELETE Example: `rest/deletecd.rest`

Delete an album:

```http
DELETE http://localhost:8080/api/compactdiscs/14
Content-type: application/json
```

**To run in VS Code:**
1. Open `rest/deletecd.rest`
2. Update the ID as needed (e.g., `/14` to delete album 14)
3. Click "Send Request"

**Using cURL:**
```bash
curl -X DELETE http://localhost:8080/api/compactdiscs/14 \
  -H "Content-type: application/json"
```

---

## Swagger Documentation

### Accessing the API Documentation

The application includes interactive API documentation via Swagger UI.

**URL:**
```
http://localhost:8080/swagger-ui.html
```

**What you'll see:**
- Interactive list of all endpoints
- Request/response schemas
- "Try it out" button to test endpoints directly
- Parameter descriptions

### Swagger JSON Schema

Raw API specification in JSON format:

```
http://localhost:8080/v2/api-docs
```

### Configuration

Swagger is configured in `src/main/java/com/conygre/spring/boot/SwaggerConfig.java`:

```java
@EnableSwagger2
@Profile("!test")  // Disabled during testing
public class SwaggerConfig {
    // Configuration for API documentation
    // Group name: "compactdiscs"
    // Title: "Album REST API with Swagger"
    // Contact: Nick Todd (nick.todd@conygre.com)
}
```

**Note:** Swagger is disabled during unit tests to avoid conflicts with the test framework.

---

## Static HTML Clients

The application includes HTML-based clients for interacting with the API:

### Files Location

`src/main/resources/static/`

### Available Clients

#### 1. **index.html** - Landing Page
- Main entry point for the web application
- Navigation to other pages

#### 2. **listcds.html** - Album Listing
- Displays all albums from the catalog
- Shows album details: title, artist, price, track count
- Allows sorting and filtering (implementation varies)

#### 3. **constructorfunctionajax.html** - AJAX Client (Traditional)
- Uses constructor functions for code organization
- XMLHttpRequest (AJAX) for API calls
- Demonstrates traditional JavaScript patterns

#### 4. **promisefetch.html** - Fetch API Client (Modern)
- Uses Promises and modern Fetch API
- Clean async/await patterns
- Recommended for new development

#### 5. **temp.html** - Temporary/Development Page
- Experimental features
- Can be deleted or updated as needed

### Accessing the Clients

Start the application and open in a browser:

```
http://localhost:8080/index.html
```

All other clients are linked from the navigation menu or directly:

```
http://localhost:8080/listcds.html
http://localhost:8080/constructorfunctionajax.html
http://localhost:8080/promisefetch.html
```

### CORS Configuration

The application enables CORS (Cross-Origin Resource Sharing) on all endpoints:

```java
@CrossOrigin  // Allows requests from all domains
public class CompactDiscController {
    // ...
}
```

This allows the HTML clients (and external applications) to make requests to the API.

---

## Logging

### Log Configuration

Logging is managed by Log4j2 (`src/main/resources/log4j2.properties`):

```properties
status = error                  # Log4j configuration status
rootLogger.level = info         # Root logger level (INFO, DEBUG, WARN, ERROR)
appender.console.type = Console # Logs to console/stdout

# Application-specific logging
logger.conygre.name=com.conygre.spring.boot
logger.conygre.level=info
```

### Log Output Format

```
2024-01-15 14:32:45 INFO  CompactDiscController:24 - managed to call a Get request for findAll
```

Pattern: `YYYY-MM-DD HH:MM:SS LOG_LEVEL CLASS:LINE - MESSAGE`

### Enabling File Logging

To enable file logging (currently configured but not active):

1. Edit `src/main/resources/log4j2.properties`
2. Add file appender configuration:

```properties
appenders = console, file

appender.file.type = File
appender.file.name = LOGFILE
appender.file.fileName = logs/application.log

rootLogger.appenderRefs = stdout, logfile
rootLogger.appenderRef.logfile.ref = LOGFILE
```

3. Rebuild and restart the application

### Log File Locations

- **Console**: Appears in the terminal/console output
- **File**: `./logs/application.log` (relative to working directory)
- **Application**: `./myapplication.log` (configured but not actively used)

### Changing Log Levels

To change logging verbosity, edit `log4j2.properties`:

- `debug` - Most verbose (development only)
- `info` - Standard level (default)
- `warn` - Warnings and errors only
- `error` - Errors only (least verbose)

Example:
```properties
logger.conygre.level=debug  # More detailed output
```

---

## Deployment

### Deployment Considerations

#### Prerequisites
- Target server must have Java 11+ and Maven 3.6+ installed
- MySQL server must be accessible from the deployment server
- Network access to the MySQL instance (hostname, port 3306)

### Deployment Methods

#### 1. Local Machine Deployment

```bash
cd challenges/no-readme
mvn clean package
java -jar target/CompactDiscRestDataBoot-0.0.1-SNAPSHOT.jar
```

#### 2. Linux/Unix Server Deployment

```bash
# Copy JAR to server
scp target/CompactDiscRestDataBoot-0.0.1-SNAPSHOT.jar user@server:/opt/apps/

# SSH into server
ssh user@server

# Create startup directory
mkdir -p /opt/apps
cd /opt/apps

# Run application
java -jar CompactDiscRestDataBoot-0.0.1-SNAPSHOT.jar \
  --spring.datasource.url=jdbc:mysql://db-server:3306/conygre \
  --spring.datasource.username=appuser \
  --spring.datasource.password=secretpassword
```

#### 3. Docker Container Deployment

**Prerequisites:** Docker must be installed

**Build Docker image:**
```bash
# Create Dockerfile (if not present)
FROM openjdk:11-jre-slim
COPY target/CompactDiscRestDataBoot-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

**Build and run:**
```bash
docker build -t compactdisc-api:1.0 .
docker run -d \
  -p 8080:8080 \
  --link mysql-container:cddb \
  -e SPRING_PROFILES_ACTIVE=docker \
  compactdisc-api:1.0
```

#### 4. Docker Compose Deployment

**docker-compose.yml:**
```yaml
version: '3'
services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: secret123
      MYSQL_DATABASE: conygre
    volumes:
      - ./sql/createTables.sql:/docker-entrypoint-initdb.d/init.sql
  
  api:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - mysql
    environment:
      SPRING_PROFILES_ACTIVE: docker
```

**Deploy:**
```bash
docker-compose up -d
```

### Important Deployment Notes

1. **Database Connection String:**
   - Local: `jdbc:mysql://localhost:3306/conygre`
   - Docker: `jdbc:mysql://cddb:3306/conygre`
   - Remote: `jdbc:mysql://db-hostname:3306/conygre`

2. **Database Initialization:**
   - Ensure SQL schema is created before deployment
   - Run `sql/createTables.sql` on the target database

3. **Docker Profile:**
   - When deploying to Docker, use `application-docker.properties`
   - Set `spring.profiles.active=docker` in environment variables

4. **Port Configuration:**
   - Default port: 8080
   - Exposed to internet: Consider reverse proxy/load balancer
   - Firewall rules: Allow port 8080 if needed

5. **Security Considerations:**
   - Change default MySQL credentials
   - Use environment variables for sensitive data
   - Enable HTTPS in production (configure Spring Security)
   - Restrict CORS origin if deployed to production

---

## Troubleshooting

### Issue: "MySQL connection refused"

**Symptom:** Application won't start, error mentions "Connection refused: connect"

**Solutions:**
1. Verify MySQL is running:
   ```bash
   mysql -u root -p -e "select 1"
   ```

2. Check connection settings in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/conygre
   spring.datasource.username=root
   spring.datasource.password=c0nygre1
   ```

3. Verify database exists:
   ```bash
   mysql -u root -p -e "show databases;"
   ```

4. If using Docker, ensure service name is correct (`cddb`), not `localhost`

---

### Issue: "database.conygre does not exist"

**Symptom:** Error indicates the `conygre` database wasn't created

**Solution:**
1. Run the SQL setup script:
   ```bash
   mysql -u root -p < sql/createTables.sql
   ```

2. Verify tables were created:
   ```bash
   mysql -u root -p conygre -e "show tables;"
   ```

   Should output:
   ```
   compact_discs
   tracks
   ```

---

### Issue: "Failed to load class org.springframework.boot.loader.JarLauncher"

**Symptom:** When running JAR file, Java can't find the launcher

**Solutions:**
1. Verify you're running the packaged JAR (not the plain classes):
   ```bash
   ls -lh target/CompactDiscRestDataBoot-0.0.1-SNAPSHOT.jar
   ```

2. Ensure Maven build completed successfully:
   ```bash
   mvn clean package
   ```

3. Check Java version:
   ```bash
   java -version  # Should be Java 11+
   ```

---

### Issue: "Swagger UI not loading at /swagger-ui.html"

**Symptom:** 404 error when accessing Swagger documentation

**Solutions:**
1. Verify Swagger dependency is in pom.xml (present by default)

2. Check Swagger configuration isn't disabled:
   ```java
   // Should NOT have @Profile("test")
   @EnableSwagger2
   ```

3. Verify application started without errors:
   ```
   Look for "Started AppConfig in X.XXX seconds"
   ```

4. Try accessing raw API docs instead:
   ```
   http://localhost:8080/v2/api-docs
   ```

---

### Issue: "Port 8080 already in use"

**Symptom:** Error message: "Address already in use"

**Solutions:**
1. Find process using port 8080:
   ```bash
   # Linux/Mac
   lsof -i :8080
   
   # Windows (PowerShell)
   Get-NetTCPConnection -LocalPort 8080
   ```

2. Kill the process or use different port:
   ```bash
   mvn spring-boot:run -Dspring-boot.run.arguments="--server.port=9090"
   ```

---

### Issue: "java.lang.UnsupportedClassVersionError"

**Symptom:** Error about class version (XX.X) not supported

**Cause:** Java version mismatch (running Java 8 or older)

**Solution:**
1. Check Java version:
   ```bash
   java -version  # Should be Java 11+
   ```

2. Update Java to version 11 or later

3. Point to correct Java if multiple versions installed:
   ```bash
   /usr/lib/jvm/java-11-openjdk/bin/java -jar target/*.jar
   ```

---

### Issue: "Column count doesn't match value count at row 1"

**Symptom:** SQL error when inserting data

**Cause:** SQL schema mismatch

**Solution:**
1. Delete existing database and recreate:
   ```bash
   mysql -u root -p -e "DROP DATABASE conygre;"
   mysql -u root -p < sql/createTables.sql
   ```

2. Verify schema is correct:
   ```bash
   mysql -u root -p conygre -e "DESC compact_discs;"
   ```

---

### Issue: "No such table: compact_discs"

**Symptom:** Error when querying database

**Cause:** Tables weren't created or wrong database selected

**Solution:**
1. Verify you're using the correct database:
   ```bash
   mysql -u root -p conygre -e "SHOW TABLES;"
   ```

2. If tables missing, run schema:
   ```bash
   mysql -u root -p < sql/createTables.sql
   ```

---

### Issue: "Build fails with dependency errors"

**Symptom:** Maven can't download dependencies

**Solutions:**
1. Clear Maven cache:
   ```bash
   mvn dependency:purge-local-repository
   mvn clean install
   ```

2. Try offline mode (if dependencies already cached):
   ```bash
   mvn clean package -o
   ```

3. Check internet connection and Maven repository settings

---

### Issue: "GET request returns null instead of 404"

**Symptom:** When requesting a non-existent album via `/api/compactdiscs/{id}`, returns `null` instead of HTTP 404

**Note:** This is expected behavior for this endpoint. Use `/api/compactdiscs/404/{id}` for explicit HTTP 404 responses.

---

### Enabling Debug Logging

To troubleshoot issues with detailed logging:

1. Edit `src/main/resources/log4j2.properties`:
   ```properties
   logger.conygre.level=debug
   ```

2. Rebuild:
   ```bash
   mvn clean package
   ```

3. Run and check console output for detailed logs

---

## Development

### Project Architecture

The application follows a **layered architecture pattern**:

```
HTTP Request
    ↓
Controller (REST endpoints) - handles HTTP
    ↓
Service (Business logic) - processes requests
    ↓
Repository (Data access) - queries database
    ↓
Database (MySQL)
```

### Key Classes

#### 1. AppConfig.java
- Spring Boot application entry point
- Main method that starts the application
- Imports Swagger configuration

#### 2. CompactDiscController.java
- REST API endpoints
- Handles HTTP requests/responses
- Routes to service layer

#### 3. CompactDiscService/CompactDiscServiceImpl.java
- Business logic interface and implementation
- Handles album operations (get, add, update, delete)
- Calls repository layer

#### 4. CompactDiscRepository.java
- Data access layer (Spring Data JPA)
- Extends JpaRepository for automatic CRUD methods
- Custom query methods

#### 5. CompactDisc.java / Track.java
- Entity models
- Mapped to database tables via JPA annotations

### Adding New Features

#### Example: Add Update Endpoint

**Current state:** Controller has no update endpoint

**To add update functionality:**

1. **Update Service Interface:**
   ```java
   // CompactDiscService.java
   void updateCompactDisc(CompactDisc disc);
   ```

2. **Implement Service Method:**
   ```java
   // CompactDiscServiceImpl.java
   @Override
   public void updateCompactDisc(CompactDisc disc) {
       repository.save(disc);  // Save updates the record if ID exists
   }
   ```

3. **Add Controller Endpoint:**
   ```java
   // CompactDiscController.java
   @RequestMapping(method = RequestMethod.PUT)
   public void updateCd(@RequestBody CompactDisc disc) {
       service.updateCompactDisc(disc);
   }
   ```

4. **Test the endpoint:**
   ```bash
   curl -X PUT http://localhost:8080/api/compactdiscs \
     -H "Content-Type: application/json" \
     -d '{"id":9,"title":"Is This It (Updated)","artist":"The Strokes","tracks":11,"price":15.99}'
   ```

### Extending the Database Model

#### Example: Add Genre Field

1. **Update SQL Schema:**
   ```sql
   ALTER TABLE compact_discs ADD COLUMN genre VARCHAR(50);
   ```

2. **Update Entity:**
   ```java
   // CompactDisc.java
   @Column(name="genre")
   private String genre;
   
   // Add getter/setter
   public String getGenre() { return genre; }
   public void setGenre(String genre) { this.genre = genre; }
   ```

3. **Entity automatically maps to database**
4. **API will accept/return genre in JSON**

### Running Tests

If unit tests are added:

```bash
mvn test                           # Run all tests
mvn test -Dtest=ClassName         # Run specific test class
mvn test -Dtest=ClassName#method  # Run specific test method
```

### Code Quality Tools

#### Generate Javadoc

```bash
mvn javadoc:javadoc
open target/site/apidocs/index.html
```

#### Static Code Analysis

```bash
# With CheckStyle (if configured)
mvn checkstyle:check

# With SpotBugs (if configured)
mvn spotbugs:check
```

### Common Development Tasks

#### Clean Build
```bash
mvn clean
```

#### Build Without Tests
```bash
mvn package -DskipTests
```

#### Check Dependencies
```bash
mvn dependency:tree
```

#### Update Dependencies
```bash
mvn versions:display-dependency-updates
```

---

## Technology Stack Summary

| Component | Technology | Version |
|-----------|-----------|---------|
| Framework | Spring Boot | 2.5.3 |
| Language | Java | 11+ |
| Build Tool | Maven | 3.6+ |
| Database | MySQL | 5.7+ or 8.0+ |
| ORM | Spring Data JPA | 2.5.3 |
| API Docs | Springfox Swagger | 2.9.2 |
| Logging | Log4j2 | 2.17.0 |
| Testing | JUnit | 4+ |
| Mocking | Mockito | 2.22.0+ |
| Server | Apache Tomcat | Embedded 9.0+ |

---

## Contact & Support

**Developed by:** Conygre Training  
**Contact:** Nick Todd (nick.todd@conygre.com)  
**Website:** http://www.conygre.com

---

## License

This project is part of the Neueda Generative AI JAM training exercise.

---

**Last Updated:** September 11, 2026  
**Application Version:** 0.0.1-SNAPSHOT  
**Java Version:** 11+
