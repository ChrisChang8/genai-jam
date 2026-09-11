# Compact Disc REST API - Development Guide

A comprehensive guide for developers setting up and working on the Compact Disc REST API in a local development environment.

## Table of Contents

- [Quick Start](#quick-start)
- [Prerequisites](#prerequisites)
- [Development Environment Setup](#development-environment-setup)
- [IDE Configuration](#ide-configuration)
- [Running in Development Mode](#running-in-development-mode)
- [Database Development Setup](#database-development-setup)
- [Testing](#testing)
- [Debugging](#debugging)
- [Development Workflow](#development-workflow)
- [Code Structure](#code-structure)
- [Making Changes](#making-changes)
- [Common Development Tasks](#common-development-tasks)
- [Hot Reload Setup](#hot-reload-setup)
- [Troubleshooting Development](#troubleshooting-development)
- [Contributing Guidelines](#contributing-guidelines)

## Quick Start

Get the application running locally in under 5 minutes:

```bash
# 1. Clone/navigate to the project
cd challenges/no-readme

# 2. Start MySQL (must already be running)
mysql -u root -p

# 3. Create database in another terminal
mysql -u root -p < sql/createTables.sql

# 4. Start the application in development mode
mvn spring-boot:run

# 5. Access the app
# API: http://localhost:8080/api/compactdiscs
# Swagger UI: http://localhost:8080/swagger-ui.html
```

## Prerequisites

### Required

- **Java Development Kit (JDK) 11+**
  ```bash
  java -version
  javac -version
  ```

- **Apache Maven 3.6+**
  ```bash
  mvn -version
  ```

- **MySQL Server 5.7 or 8.0** (running locally)
  ```bash
  mysql -u root -p -e "SELECT VERSION();"
  ```

- **Git** (recommended for version control)
  ```bash
  git --version
  ```

### Recommended

- **IDE: VS Code, IntelliJ IDEA, or Eclipse**
  - IntelliJ IDEA Community Edition (free) - Best for Spring Boot
  - VS Code with Spring Boot Extension Pack
  - Eclipse with Spring Tools 4

- **REST Client for testing**
  - Postman (GUI application)
  - REST Client extension for VS Code
  - cURL or Wget (command line)

- **Git GUI** (optional but helpful)
  - GitKraken
  - GitHub Desktop
  - Sourcetree

- **Database Client**
  - MySQL Workbench
  - DataGrip
  - HeidiSQL (Windows)
  - DBeaver (cross-platform)

## Development Environment Setup

### Step 1: Install Java Development Kit (JDK)

**Windows:**
1. Download from [oracle.com](https://www.oracle.com/java/technologies/downloads/#java11) or use [OpenJDK](https://jdk.java.net/)
2. Run installer and follow defaults
3. Verify installation:
   ```bash
   java -version
   javac -version
   ```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install openjdk-11-jdk
java -version
```

**macOS:**
```bash
# Using Homebrew
brew install openjdk@11
java -version
```

### Step 2: Install Maven

**Windows:**
1. Download from [maven.apache.org](https://maven.apache.org/download.cgi)
2. Extract to `C:\Program Files\apache-maven`
3. Add to PATH environment variable
4. Restart terminal and verify:
   ```bash
   mvn -version
   ```

**Linux (Ubuntu/Debian):**
```bash
sudo apt install maven
mvn -version
```

**macOS:**
```bash
brew install maven
mvn -version
```

### Step 3: Install MySQL

**Windows:**
1. Download from [mysql.com](https://dev.mysql.com/downloads/mysql/)
2. Run MSI installer
3. Configure MySQL Server as Windows Service
4. Set root password: `c0nygre1` (default for this project)
5. Verify:
   ```bash
   mysql -u root -p -e "SELECT VERSION();"
   ```

**Linux (Ubuntu/Debian):**
```bash
sudo apt install mysql-server
sudo mysql_secure_installation
mysql -u root -p -e "SELECT VERSION();"
```

**macOS:**
```bash
# Using Homebrew
brew install mysql
brew services start mysql
mysql -u root -e "SELECT VERSION();"
```

### Step 4: Clone/Navigate to Project

```bash
cd path/to/genai-jam/challenges/no-readme
```

### Step 5: Create Development Database

```bash
# Create database and tables
mysql -u root -p < sql/createTables.sql

# Verify database created
mysql -u root -p -e "USE conygre; SHOW TABLES; SELECT COUNT(*) as album_count FROM compact_discs;"
```

## IDE Configuration

### VS Code Setup

**Installation & Extensions:**

1. Install VS Code from [code.visualstudio.com](https://code.visualstudio.com/)

2. Install recommended extensions:
   - **Extension Pack for Java** (Microsoft)
   - **Spring Boot Extension Pack** (Microsoft)
   - **REST Client** (Huachao Mao)
   - **Maven for Java** (Microsoft)
   - **Debugger for Java** (Microsoft)

**Steps:**
1. Open Extensions (Ctrl+Shift+X)
2. Search for "Extension Pack for Java"
3. Click "Install" to install all recommended extensions

**Configure for Project:**
1. Open folder: `File > Open Folder > select no-readme`
2. VS Code auto-detects pom.xml
3. Maven dependencies auto-load
4. Create `.vscode/launch.json` for debugging:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "java",
      "name": "Spring Boot App",
      "request": "launch",
      "mainClass": "com.conygre.spring.boot.AppConfig",
      "projectName": "CompactDiscRestDataBoot",
      "cwd": "${workspaceFolder}",
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

### IntelliJ IDEA Setup

**Installation:**
1. Download Community Edition from [jetbrains.com](https://www.jetbrains.com/idea/)
2. Install and launch

**Open Project:**
1. `File > Open`
2. Navigate to `challenges/no-readme`
3. Select `pom.xml` as project file
4. IntelliJ auto-configures Maven and dependencies

**Configure JDK:**
1. `File > Project Structure`
2. Ensure Project SDK is set to JDK 11+
3. Module SDK matches project SDK

**Maven Configuration:**
1. `File > Settings > Build, Execution, Deployment > Build Tools > Maven`
2. Verify Maven home path
3. Check JDK for importer

### Eclipse Setup

**Installation:**
1. Download Eclipse IDE for Enterprise Java Developers
2. Install and launch

**Open Project:**
1. `File > Open Projects from File System`
2. Navigate to `challenges/no-readme`
3. Import as existing Maven project

**Configure:**
1. Right-click project > Properties
2. Set JRE to Java 11+
3. Update Maven settings if needed

## Running in Development Mode

### Method 1: Maven Spring Boot Plugin (Recommended)

Simplest method with automatic recompilation:

```bash
cd challenges/no-readme
mvn spring-boot:run
```

**Features:**
- Automatic class recompilation on file save
- Full debug output to console
- Simple startup/shutdown (Ctrl+C)
- Perfect for development

**Expected output:**
```
[INFO] Attaching agents: []
Starting AppConfig v0.0.1-SNAPSHOT using Java 11.x.x...
Tomcat started on port(s): 8080
Started AppConfig in 3.452 seconds
```

### Method 2: Run from IDE (VS Code)

1. Open Explorer (Ctrl+Shift+E)
2. Expand `CompactDiscRestDataBoot` under Maven
3. Expand `Plugins > spring-boot > spring-boot:run`
4. Right-click and select "Run"
5. Output appears in Terminal tab

### Method 3: Run from IDE (IntelliJ IDEA)

1. Right-click `AppConfig.java` in file tree
2. Select `Run 'AppConfig.main()'`
3. Application starts in Run tab
4. Can also debug (see Debugging section)

### Method 4: JAR Build and Run

For testing the actual packaged application:

```bash
# Build JAR
mvn clean package

# Run JAR
java -jar target/CompactDiscRestDataBoot-0.0.1-SNAPSHOT.jar
```

**Note:** JAR doesn't support hot reload; restart required for code changes.

### Method 5: Custom Port (if 8080 is in use)

```bash
mvn spring-boot:run -Dspring-boot.run.arguments="--server.port=9090"
```

Then access at `http://localhost:9090`

### Verifying Application Started

```bash
# Test API endpoint
curl http://localhost:8080/api/compactdiscs

# Should return JSON array of albums
# Or open browser: http://localhost:8080/swagger-ui.html
```

## Database Development Setup

### Quick Setup

```bash
# Run schema script
mysql -u root -p < sql/createTables.sql

# Verify
mysql -u root -p -e "USE conygre; SELECT * FROM compact_discs LIMIT 1;"
```

### Manual Setup (for understanding)

```bash
# Connect to MySQL
mysql -u root -p

# Execute these commands:
CREATE DATABASE IF NOT EXISTS conygre;
USE conygre;

CREATE TABLE compact_discs (
  id int PRIMARY KEY AUTO_INCREMENT,
  title varchar(50),
  artist varchar(30),
  tracks int,
  price double
);

CREATE TABLE tracks (
  id int PRIMARY KEY AUTO_INCREMENT,
  cd_id int NOT NULL,
  title varchar(50),
  FOREIGN KEY (cd_id) REFERENCES compact_discs(id)
);

-- Insert sample data
INSERT INTO compact_discs VALUES
  (9, 'Is This It', 'The Strokes', 11, 13.99),
  (10, 'Parachutes', 'Coldplay', 10, 11.99);

-- Verify
SELECT * FROM compact_discs;
```

### Reset Development Database

To start fresh during development:

```bash
# Drop and recreate
mysql -u root -p -e "DROP DATABASE conygre;"
mysql -u root -p < sql/createTables.sql

# Verify reset
mysql -u root -p -e "USE conygre; SELECT COUNT(*) FROM compact_discs;"
```

### Using a Database Client GUI

**MySQL Workbench:**
1. Open MySQL Workbench
2. Click "Local instance 3306" or create new connection
3. Enter password
4. Double-click `conygre` database
5. Browse tables and data visually

**Benefits:**
- Visual schema browsing
- Query editor with autocomplete
- Data viewer
- No command-line needed

## Testing

### Run Tests

```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=CompactDiscControllerTest

# Run specific test method
mvn test -Dtest=CompactDiscControllerTest#testFindAll

# Run with verbose output
mvn test -X
```

### Testing the API Manually

**Using REST Client (VS Code):**

Create `test.rest` file in project root:

```http
### Get all albums
GET http://localhost:8080/api/compactdiscs

### Get single album
GET http://localhost:8080/api/compactdiscs/9

### Create album
POST http://localhost:8080/api/compactdiscs
Content-Type: application/json

{
  "title": "Test Album",
  "artist": "Test Artist",
  "price": 9.99,
  "tracks": 5
}

### Delete album
DELETE http://localhost:8080/api/compactdiscs/9
```

**Using cURL:**

```bash
# List all
curl http://localhost:8080/api/compactdiscs

# Get one
curl http://localhost:8080/api/compactdiscs/9

# Create
curl -X POST http://localhost:8080/api/compactdiscs \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","artist":"Test","price":9.99,"tracks":5}'

# Delete
curl -X DELETE http://localhost:8080/api/compactdiscs/9
```

**Using Postman:**
1. Create new request
2. Select method (GET, POST, DELETE)
3. Enter URL (e.g., http://localhost:8080/api/compactdiscs)
4. Add headers/body as needed
5. Click Send

### Testing HTML Clients Locally

```bash
# Application running at http://localhost:8080
# Access HTML clients:
http://localhost:8080/index.html
http://localhost:8080/listcds.html
http://localhost:8080/constructorfunctionajax.html
http://localhost:8080/promisefetch.html
```

## Debugging

### Debug Mode in IDE

**VS Code:**
1. Set breakpoint (click line number)
2. Launch debugger (F5 or click Run and Debug)
3. Select "Spring Boot App"
4. Application pauses at breakpoints
5. Inspect variables in Variables panel

**IntelliJ IDEA:**
1. Set breakpoint (click line number)
2. Click Debug icon (bug symbol) or press Shift+F9
3. Application pauses at breakpoints
4. Variables shown in debugger panel
5. Use Step Over (F10), Step Into (F11), etc.

### Console Logging

Add debug logs to understand flow:

```java
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class CompactDiscController {
    private static Logger logger = LogManager.getLogger(CompactDiscController.class);

    public Iterable<CompactDisc> findAll() {
        logger.debug("findAll() called");  // Debug level
        logger.info("Retrieving all albums");  // Info level
        return service.getCatalog();
    }
}
```

### Enable Debug Logging

Edit `src/main/resources/log4j2.properties`:

```properties
logger.conygre.level=debug
```

Then rebuild and run. Much more detailed output in console.

### View Request/Response

Enable Spring logging:

```properties
logging.level.org.springframework.web=DEBUG
logging.level.org.hibernate=DEBUG
```

Shows HTTP requests, parameters, and database queries.

## Development Workflow

### Typical Development Cycle

1. **Start application**
   ```bash
   mvn spring-boot:run
   ```

2. **Make code changes** (in IDE)
   ```
   - Edit Java file
   - Save (Ctrl+S)
   - Maven auto-recompiles
   - No restart needed (usually)
   ```

3. **Test changes**
   ```bash
   # Test via REST client or Swagger UI
   # Changes appear immediately
   ```

4. **If changes not reflected**
   ```
   - Stop app (Ctrl+C)
   - Run mvn clean
   - Restart: mvn spring-boot:run
   ```

5. **Commit changes**
   ```bash
   git add .
   git commit -m "Feature description"
   git push
   ```

### Branch Workflow (Git)

```bash
# Create feature branch
git checkout -b feature/new-endpoint

# Make changes and commit
git add .
git commit -m "Add new endpoint"

# Push to remote
git push -u origin feature/new-endpoint

# Create Pull Request (GitHub/GitLab)
# After review, merge to main
```

## Code Structure

### Architecture Overview

```
HTTP Request → Controller → Service → Repository → Database
                   ↓           ↓          ↓           ↓
             HTTP handling  Business    CRUD      MySQL
             & routing      logic       ops       queries
```

### Key Packages

| Package | Purpose | Main Classes |
|---------|---------|--------------|
| `rest` | REST API endpoints | `CompactDiscController` |
| `services` | Business logic | `CompactDiscServiceImpl` |
| `repos` | Data access (JPA) | `CompactDiscRepository` |
| `entities` | Domain models | `CompactDisc`, `Track` |

### Adding a New Feature

**Example: Add sorting to list endpoint**

1. **Update Repository:**
   ```java
   // CompactDiscRepository.java
   List<CompactDisc> findAllOrderByTitleAsc();
   ```

2. **Update Service:**
   ```java
   // CompactDiscServiceImpl.java
   public List<CompactDisc> getCatalogSorted() {
       return repository.findAllOrderByTitleAsc();
   }
   ```

3. **Update Controller:**
   ```java
   // CompactDiscController.java
   @RequestMapping(method = RequestMethod.GET, value = "/sorted")
   public Iterable<CompactDisc> findAllSorted() {
       return service.getCatalogSorted();
   }
   ```

4. **Test:**
   ```bash
   curl http://localhost:8080/api/compactdiscs/sorted
   ```

## Making Changes

### Modifying an Entity

**Add new field to CompactDisc:**

1. **Add to Entity:**
   ```java
   // CompactDisc.java
   @Column(name="release_year")
   private Integer releaseYear;
   
   public Integer getReleaseYear() { return releaseYear; }
   public void setReleaseYear(Integer releaseYear) { this.releaseYear = releaseYear; }
   ```

2. **Update Database Schema:**
   ```sql
   ALTER TABLE compact_discs ADD COLUMN release_year INT;
   ```

3. **Update API** - No code change needed! JPA automatically handles new field
   ```bash
   # Test - new field appears in JSON
   curl http://localhost:8080/api/compactdiscs/9
   ```

### Adding a New Endpoint

**Add update endpoint:**

1. **Service Interface:**
   ```java
   // CompactDiscService.java
   void updateCompactDisc(CompactDisc disc);
   ```

2. **Service Implementation:**
   ```java
   // CompactDiscServiceImpl.java
   @Override
   public void updateCompactDisc(CompactDisc disc) {
       repository.save(disc);
   }
   ```

3. **Controller:**
   ```java
   // CompactDiscController.java
   @RequestMapping(method = RequestMethod.PUT)
   public void updateCd(@RequestBody CompactDisc disc) {
       service.updateCompactDisc(disc);
   }
   ```

4. **Test:**
   ```bash
   curl -X PUT http://localhost:8080/api/compactdiscs \
     -H "Content-Type: application/json" \
     -d '{"id":9,"title":"Updated Title","artist":"The Strokes","tracks":11,"price":14.99}'
   ```

## Common Development Tasks

### Update Dependencies

Check for updates:
```bash
mvn versions:display-dependency-updates
```

Update specific dependency:
```bash
mvn versions:use-dep-version -Dincludes=com.example:example-lib -DdepVersion=2.0.0
```

### Clean Build

```bash
mvn clean
mvn install
```

### Check Code Compile

```bash
mvn compile
```

Catches errors without running full build.

### View Project Dependencies

```bash
mvn dependency:tree
```

Shows all dependencies and transitive dependencies.

### Generate JavaDoc

```bash
mvn javadoc:javadoc
open target/site/apidocs/index.html
```

Browse code documentation in browser.

### Format Code

Using spotless (if configured):

```bash
mvn spotless:apply
```

Automatically formats code to project style.

## Hot Reload Setup

### Enable Spring Boot DevTools

Add to `pom.xml`:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <scope>runtime</scope>
    <optional>true</optional>
</dependency>
```

### Enable IDE Auto-Build

**IntelliJ IDEA:**
1. `File > Settings > Build, Execution, Deployment > Compiler`
2. Check "Build project automatically"
3. `File > Settings > Advanced Settings`
4. Check "Allow auto-make to start even if developed application is currently running"

**Eclipse:**
1. `Project > Build Automatically`

**VS Code:**
1. No additional config needed with Spring Boot DevTools

### How Hot Reload Works

1. Save file in IDE
2. IDE auto-compiles changed classes
3. DevTools detects changes
4. Application context reloads
5. No server restart needed
6. Takes ~2-3 seconds

**Note:** Hot reload works best for:
- Java code changes
- Property file changes
- Resource file changes

**Requires restart for:**
- JPA entity changes (database schema)
- Adding new beans
- Configuration annotation changes

## Troubleshooting Development

### Issue: "Port 8080 already in use"

**Solution 1: Kill process using port**
```bash
# Find process
lsof -i :8080

# Kill it
kill -9 <PID>

# Or use different port
mvn spring-boot:run -Dspring-boot.run.arguments="--server.port=9090"
```

### Issue: "MySQL connection refused"

**Solution:**
```bash
# Verify MySQL is running
mysql -u root -p -e "SELECT 1"

# If fails, restart MySQL
# Windows: Services > Restart MySQL Service
# Linux: sudo systemctl restart mysql
# Mac: brew services restart mysql
```

### Issue: "Table not found" / "Database does not exist"

**Solution:**
```bash
# Recreate database
mysql -u root -p < sql/createTables.sql

# Verify
mysql -u root -p -e "USE conygre; SHOW TABLES;"
```

### Issue: "Changes not appearing after edit"

**Solution:**
```bash
# Full clean rebuild
mvn clean install
mvn spring-boot:run

# Or if using IDE, do Project > Clean Build
```

### Issue: IDE not recognizing Maven project

**Solution:**
```bash
# Regenerate IDE project files
mvn clean eclipse:clean eclipse:eclipse

# Then refresh IDE (F5 in Eclipse)
```

### Issue: "Maven not found" or "mvn command not recognized"

**Solution:**
1. Verify Maven installation
   ```bash
   mvn -version
   ```

2. If not found, add to PATH:
   - Windows: Add `C:\apache-maven\bin` to PATH
   - Linux/Mac: Add `/usr/local/maven/bin` to PATH

3. Restart terminal and verify again

### Issue: Tests failing in IDE but passing on command line

**Solution:**
```bash
# Run tests from command line to verify
mvn test

# In IDE, check:
# - JDK version matches project settings
# - Test framework properly recognized
# - Run > Edit Configurations (set JDK correctly)
```

## Contributing Guidelines

### Before Starting

1. **Create feature branch:**
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Review existing code** in the class you'll modify

3. **Check for similar functionality** already implemented

### Code Style

**Naming Conventions:**
- Classes: `PascalCase` (e.g., `CompactDiscController`)
- Methods/variables: `camelCase` (e.g., `getCatalog`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `MAX_PRICE`)

**Formatting:**
- Use spaces (not tabs), 4 spaces per indent
- Keep lines under 100 characters
- Add space around operators

**JavaDoc:**
```java
/**
 * Retrieves all compact discs from the catalog.
 *
 * @return Iterable collection of all CompactDisc objects
 */
public Iterable<CompactDisc> getCatalog() {
    // implementation
}
```

### Testing Your Changes

```bash
# Run all tests
mvn test

# Run specific test for your changes
mvn test -Dtest=CompactDiscControllerTest

# Test manually via API
curl http://localhost:8080/api/compactdiscs
```

### Committing Changes

**Write clear commit messages:**

```bash
# Good
git commit -m "Add sorting to album list endpoint"
git commit -m "Fix null pointer in price validation"

# Avoid
git commit -m "fixed stuff"
git commit -m "changes"
```

**Commit frequently:**
- One logical change per commit
- Makes reviewing easier
- Easier to revert if needed

### Before Submitting

1. Run full test suite: `mvn test`
2. Clean build: `mvn clean package`
3. Verify application runs: `mvn spring-boot:run`
4. Test changes manually
5. Review your own code for issues
6. Check for console warnings/errors

### Pushing Changes

```bash
# Push branch to remote
git push -u origin feature/my-feature

# Create Pull Request on GitHub/GitLab
# - Describe what changed and why
# - Reference any related issues
# - Wait for code review
```

---

## Quick Reference

### Common Commands

| Task | Command |
|------|---------|
| Start app | `mvn spring-boot:run` |
| Run tests | `mvn test` |
| Clean build | `mvn clean package` |
| Check code | `mvn compile` |
| See deps | `mvn dependency:tree` |
| Generate docs | `mvn javadoc:javadoc` |

### Test the API Quickly

```bash
# List all
curl http://localhost:8080/api/compactdiscs

# Get one
curl http://localhost:8080/api/compactdiscs/9

# Create
curl -X POST -H "Content-Type: application/json" \
  -d '{"title":"Test","artist":"Test","price":9.99,"tracks":5}' \
  http://localhost:8080/api/compactdiscs

# Update
curl -X PUT -H "Content-Type: application/json" \
  -d '{"id":9,"title":"Updated","artist":"Test","price":15.99,"tracks":5}' \
  http://localhost:8080/api/compactdiscs

# Delete
curl -X DELETE http://localhost:8080/api/compactdiscs/9

# With 404 handling
curl http://localhost:8080/api/compactdiscs/404/999
```

### IDE Keyboard Shortcuts

**VS Code:**
- F5 - Start debugging
- Ctrl+Shift+D - Debug view
- Ctrl+Shift+E - Explorer
- Ctrl+` - Toggle terminal

**IntelliJ IDEA:**
- Shift+F9 - Debug
- F10 - Step over
- F11 - Step into
- Ctrl+F9 - Build project
- Ctrl+Shift+F10 - Run current class

---

**Last Updated:** September 11, 2026  
**For Questions:** See README_PRODUCTION.md for additional information
