# Welcome to the Neueda Generative AI JAM Session

## Repository guide for agents and teammates

This is a hands-on GenAI training repository: seven independent maintenance exercises and a final finance application challenge. It is not a single deployable system. Run commands inside the relevant challenge directory; there is no root build, shared dependency manager, or repository-wide test runner.

The plans below describe work still to do, based on source inspection. They are not completed solutions or verified runtime results. Read the linked challenge brief before making changes; it contains the exercise constraints and marking criteria. The original workshop introduction and schedule follow this guide.

### Repository map

| Directory / brief | Current implementation | Objective | Points |
| --- | --- | --- | --- |
| [no-readme](challenges/no-readme/readme.md) | Java 11, Spring Boot 2.5.3, Maven, JPA, MySQL, Springfox | Document a compact-disc catalog API | 100 |
| [no-tests](challenges/no-tests/readme.md) | Separate copy of the catalog API; test dependencies but no tests | Add meaningful unit tests only | 400 |
| [find-and-fix-a-bug](challenges/find-and-fix-a-bug/README.md) | Java 8 compilation target, Maven, JUnit 5 | Repair ISBN validation and explain the bug | 200 |
| [upgrade-required](challenges/upgrade-required/readme.md) | Another copy of the Java 11 / Boot 2.5.3 catalog API | Upgrade Java, framework, and affected integrations | 400 |
| [improve-performance](challenges/improve-performance/Readme.md) | Standalone Java sources, no Maven/Gradle build | Speed up large probable-prime generation | 200 |
| [fix-an-unresponsive-website](challenges/fix-an-unresponsive-website/README.md) | React 19, React Router 7, TypeScript, Vite 6 | Keep navigation responsive while rendering credits | 400 |
| [perl](challenges/perl/readme.md) | Perl CSV-to-MySQL-SQL generator and sample data/output | Reimplement in Python with unit tests | 500 |
| [new app](new%20app/readme.md) | Brief only; no application scaffold | Build a useful finance-related application | 1000 |

The three catalog directories are separate exercise copies, not shared modules. Do not automatically propagate changes between them. Website points here follow its challenge brief (400); the previous root overview said 300. Confirm scoring with the instructor if needed. The No Tests brief has a misleading “Upgrade Required” heading; its task is testing.

### Plans and acceptance criteria

#### 1. No Readme — explain the catalog API

Trace `AppConfig` through `CompactDiscController`, `CompactDiscServiceImpl`, `CompactDiscRepository`, and the `CompactDisc` / `Track` entities under `src/main/java/com/conygre/spring/boot`. Inspect `sql/createTables.sql`, the two application property files, static HTML clients, and `rest/` examples.

Plan: document prerequisites, database initialization, configuration overrides, build/run commands, API requests and responses, troubleshooting, deployment, and logging. The controller exposes list/get/create/delete operations under `/api/compactdiscs`, including a separate `/404/{id}` lookup. The service has an update method but the controller does not expose an update endpoint. Verify missing-record behavior instead of assuming all lookups return 404.

Done when another teammate can follow the README to start the app against a disposable MySQL database and exercise the documented API. Explain that the Docker profile references host `cddb` but no Dockerfile or Compose setup is supplied. Log4j2 currently configures console logging; do not claim file logging or health/metrics endpoints work without verification. Preserve the exercise brief when adding application documentation.

#### 2. No Tests — establish behavior with unit tests

Plan: inventory service and controller branches, then add JUnit/Mockito tests with mocked collaborators. Cover populated/empty catalogs, found/missing IDs, ID reset to zero on create, update delegation, both delete methods, and the controller's explicit 200/404 response branch. Characterize the service's current missing-ID deletion behavior (`Optional.get()`), and record any proposed behavior change separately.

Done when `mvn test` runs the added tests without MySQL or a running Spring application, and assertions verify results, mutations, and relevant collaborator interactions. Keep this exercise to unit tests: do not introduce full-context, database, or end-to-end tests. Use coverage to find missed behavior, not to justify tests of trivial implementation details.

#### 3. Find and Fix a Bug — correct ISBN checksums

Plan: run the existing tests first. Inspect arithmetic in `ValidateISBN`: it multiplies character codes instead of numeric digit values. Explain why numeric ISBN-10 examples can mask this mistake while the terminal `X` case exposes it. Make the smallest justified correction, then review the 13-character path's missing character validation and clarify accepted input and exception messages.

Done when existing tests and focused regressions pass, including terminal `X`, invalid checksums, invalid characters in both lengths, and invalid lengths. Decide and document null, whitespace, lowercase `x`, and non-ASCII digit handling before adding expectations. Explain why each change is needed rather than rewriting unrelated code.

#### 4. Upgrade Required — modernize the catalog stack

Plan: establish the existing build/API baseline, then verify current Java and Spring Boot releases and their compatibility using official documentation at implementation time. Record the chosen versions and date; this guide does not pin a “latest” target. Review the POM, `javax.persistence` imports, Springfox configuration/annotations, MySQL driver coordinates and both datasource profiles, logging properties, and pinned test dependencies. Follow the selected framework's migration guide and replace or adapt incompatible API documentation support.

Done when the selected JDK builds the app, tests pass, startup succeeds against disposable MySQL, and catalog CRUD operations, missing-record behavior, static clients, and API documentation have been checked. Record intentional behavior changes and exact commands. Keep modernization in this directory so the other exercises retain their baselines.

#### 5. Improve Performance — measure prime generation

Plan: benchmark `PrimeGenerator.getPrimes(100)` repeatedly on the same JDK and hardware, including warm-up. Evaluate candidate-generation strategy, random-source reuse, and bounded parallelism one change at a time. Preserve the required **2000-bit setting** and requested output count. The current `BigInteger(2000, random)` produces values with up to 2000 bits; explicitly verify output bit lengths against the brief instead of assuming the constructor guarantees an exact length.

Done when output count, bit lengths, and probable primality are checked and repeatable before/after timings demonstrate improvement. Record CPU/thread settings and variability. Because the brief mentions security use, explain the random-source choice and any suitability limitations; speed alone is insufficient.

#### 6. Fix an Unresponsive Website — keep the menu usable

Plan: reproduce About → show credits and capture a browser performance trace while navigating. `AboutPage.tsx` triggers rendering of 15 credits; each `DisplayCredit` in `Credits.tsx` busy-waits for 100 ms. Investigate scheduling the credits update as non-urgent work with React transitions, preserving urgent navigation, and measure the actual interaction result.

The intentional delay **must not be removed or edited**. A transition cannot interrupt JavaScript inside an individual busy-wait; React can yield between units of rendering work. Verify responsiveness rather than claiming a scheduling change eliminates every delay.

Done when menu navigation remains usable while credits render, all credits still display, rapid toggles/navigation behave correctly, and `npm run build` and `npm run lint` pass. Include a manual interaction check and trace or timing evidence; compilation alone cannot establish responsiveness.

#### 7. Perl to Python — preserve the ETL contract

Plan: inspect `etl.pl`, `prices.csv`, and both SQL outputs. The script reads a CSV, normalizes column names, infers SQL types and lengths, substitutes zero for empty values, and emits a `nasdaq_prices` table definition plus INSERT statements; it does not connect to MySQL. Run the legacy program only in a scratch copy because it overwrites the supplied SQL files.

Define intended compatibility before porting: the script uses naive comma splitting, fragile `chop` operations, and suspicious length comparisons. Capture observed output and distinguish required behavior from legacy defects. Build small Python functions for parsing, inference, escaping, and emission, using a CSV parser and explicit input/output paths. Check the actual fixture format before assuming a parser alone provides compatibility.

Done when unit tests cover the sample plus quoted commas, apostrophes, blanks, integers/decimals, mixed types, line endings, and malformed rows. Compare generated schema and data semantics with the agreed contract, document deliberate corrections, and provide a reproducible CLI command. Keep generated experiments separate from committed fixtures.

#### 8. New App — deliver a focused finance application

Plan: agree on one user problem, a small demonstrable workflow, team roles, and acceptance criteria before choosing the firm's permitted technology. Scaffold under `new app/`, define data/API contracts, and use synthetic data where needed. Deliver a working vertical slice, then unit tests, deployment instructions, observability, and appropriate security controls.

Done when a teammate can run the app and tests from its README, demonstrate the core workflow, and explain the implementation and GenAI tools used. Clearly distinguish implemented deployment/monitoring features from future plans.

### Local setup and validation

These are starting commands derived from repository configuration, not a record of commands successfully executed. Install only the tools needed for your assigned exercise. Dependency resolution requires network access on the first build.

| Exercise | Prerequisites | Commands from that exercise directory |
| --- | --- | --- |
| Catalog API copies | JDK 11 for the baseline, Maven, MySQL for application execution | `mvn test`, `mvn package`, `mvn spring-boot:run` |
| ISBN | JDK supporting Java 8 compilation, Maven or supplied wrapper | `mvn test` (Windows wrapper: `.\mvnw.cmd test`; Unix: `./mvnw test`) |
| Prime generation | JDK with `javac` | `javac -d out src/Main.java src/PrimeGenerator.java`, then `java -cp out Main` |
| React website | Node.js/npm compatible with the checked-in Vite dependencies | `npm ci`, `npm run dev`, `npm run build`, `npm run lint` |
| Perl ETL | Perl to characterize baseline; Python for the proposed port | In a scratch copy containing `prices.csv`: `perl etl.pl`; Python commands must be added with the implementation |
| New app | To be selected by the team | Document commands when scaffolding exists |

The React dev server normally serves `http://localhost:5173`; use the URL printed by Vite. Catalog apps use the default Spring Boot port 8080 unless overridden. Run one copy at a time or assign distinct `SERVER_PORT` values.

For a catalog app, review and run its `sql/createTables.sql` against a disposable database. It creates/seeds `conygre`; table creation and inserts are not safely repeatable. Override the checked-in training credentials with local `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, and `SPRING_DATASOURCE_PASSWORD` environment variables. Do not commit real credentials. The catalog API permits cross-origin requests broadly and supplies no explicit security setup; authentication and access policy need review before any deployment beyond the exercise environment.

There is no supplied repository-wide CI or deployment configuration. The React app has no test script, the prime exercise has no test harness, and the catalog copies initially have no tests. A successful build or a Maven run with zero discovered tests is not evidence that a challenge is solved.

### Collaboration protocol

1. Read this guide and the challenge brief, inspect `git status`, and establish baseline behavior before editing. Treat exercise defects as intentional learning material; work only on the assigned scope.
2. Claim a directory and acceptance criteria in the team's shared task tracker or chat. Record an owner, reviewer, status, and files being changed. Prefer one writer per challenge; coordinate edits to this root README explicitly.
3. Use a focused branch such as `codex/<challenge>-<change>` (or the team's agreed convention). Separate worktrees help when teammates need different branches; when sharing a checkout, never reset, overwrite, or revert someone else's changes.
4. Share discoveries about the catalog architecture across the documentation, testing, and upgrade owners, but review any code transfer explicitly. Keep fixture changes, dependency changes, and behavior changes visible in review.
5. Make small changes and run the relevant checks above. Record baseline failures, test counts, exact commands, manual checks, and blocked prerequisites. Do not report unrun checks as passing.
6. Hand off the result for teammate review with the template below. A challenge is complete when its acceptance criteria and brief are satisfied and the author can explain the generated code.

Suggested parallel team allocation: documentation/testing/upgrade owners can share catalog findings while working in separate directories; ISBN, prime performance, React, and Perl are independent. For the final app, agree on interfaces before splitting UI, backend/data, and tests/deployment work.

```text
Challenge / objective:
Owner / reviewer:
Status: unclaimed | in progress | blocked | ready for review | done
Branch and files changed:
Baseline behavior / evidence:
Changes and reasoning:
Validation commands and results (including test count):
Constraints preserved / intentional behavior changes:
Blockers, open questions, and next step:
```

### Repository-wide challenges and response plan

| Challenge | Team response |
| --- | --- |
| Several languages and independent build systems | Use per-directory setup and validation; record exact runtime versions in handoffs. |
| Duplicate catalog code can drift | Share findings, assign ownership by directory, and avoid broad cross-copy edits. |
| Sparse tests and intentional defects | Capture a baseline, add focused evidence for the assigned task, and preserve challenge constraints. |
| Legacy dependencies and environment assumptions | Upgrade in the designated exercise; externalize local configuration and verify startup with disposable services. |
| Performance fixes can appear successful without proof | Compare repeated measurements and verify output correctness or user interactions. |
| Briefs and navigation contain inconsistencies | Use the individual brief for constraints, record conflicts, and confirm scoring with the instructor. |

![Alt text](./images/genaijam.png)

## Introduction
In this JAM session, we will explore the exciting world of Generative AI and its
applications. In this session, we will be focusing on the use of Gen AI in the world of 
building, testing, and deploying applications.

Your session today will comprise of a series of challenges that will address different capabilities of Generative AI.

Your instructor will guide you through the challenges and provide you with the necessary resources and support to complete them successfully.

Each challenge can be found in a subfolder in the this Git repository.

## Pre-requisites
In order to complete this session, you will need to have the following:

- The ability to clone this repository to the machine you are using for the JAM session
- The ability to install and run different tools and applications (if you are using one of our VMs, then these will be pre-installed)
- Access to at least one Developer centric GenAI tool such as Github CoPilot, SourceGraph Cody, or Amazon Q. 

## Setting up your VM Environment
If you are using a VM, then complete the following steps:

### Clone the Repository
1. Using your virtual machine, open your preferred browser and navigate to this page http://go.neueda.com/jam. You have probably already done this since you are reading the instructions! But make sure you are doing this from the virtual machine browser, not your local machine.
2. At the top of this Web page in BitBucket, click the **Clone** button.
3. Click **Clone** again.
4. Copy the URL.
5. In your virtual machine, create a new folder called **C:\GenAIJam**.
6. Using **Windows Explorer**, right click on your **c:\GenAIJam** folder, and then click **Git Bash here**.
7. At the **Git bash terminal**, right click, and then click **Paste** to paste in the git clone command, and then press **Enter**.

### Set up GenAI Tools
1. If you do not already have one, create a PERSONAL Github account
2. Open VS Code
3. Follow the instructions here to sign in to Copilot:

[https://go.neueda.com/setup](https://go.neueda.com/setup)

4. Check the course website for details of how to use the other tools.


## Project Teams - Playing to win or playing to learn?

![Alt text](images/winning.jpeg)

You will be placed into groups of 3-4 people. This will be done relatively quickly, so please be prepared to work with people you don't know. Points will be awarded for each challenge that you complete. You can decide as a project team whether you want to work to win, or work to learn. You will learn either way, but your approach to the session will be different if you are just trying to win, vs, wanting to just learn together. There is no right or wrong approach, just different approaches. You will need to decide as a team which approach you want to take.

## Structure of the Day

Your instructor will guide you through the challenges and provide you with the necessary resources and support to complete them successfully. However, for those of you who would appreciate a heads up, the rough plan will be as follows:

Morning Session:

* Introduction to the session and the challenges
* Overview of the tools and the capabilities that they have
* Break out into teams for the first set of challenges

Break for lunch

Afternoon Session:

* The final challenge
* Scores will be calculated and announced
* Prizes (if you're lucky!) will be given out!

Note that your instructor may change this schedule based on the needs of the group. So please don't hold them to it!

## Morning JAM Session

### Challenge 1 - [No Readme](challenges/no-readme/readme.md)
This challenge involves an application that has no readme file. Your task is to create a suitable readme file for the application.

**100 points**

### Challenge 2 - [No Tests](challenges/no-tests/readme.md)
This challenge involves the same app as challenge 1. There are no tests however, so your challenge is to create a suitable set of unit tests for the application. Do not go beyond unit tests.

**400 points**

### Challenge 3 - [Find and Fix a Bug](challenges/find-and-fix-a-bug/README.md)
This application has a bug in it. Your task is to find the bug and fix it!

**200 points**

### Challenge 4 - [Upgrade Required](challenges/upgrade-required/readme.md)
This application was last touched in 2021 and is using an old version of the software. Can you upgrade it to the latest version?

**400 points**

### Challenge 5 - [Improve Performance](challenges/improve-performance/Readme.md)
This application is slow and inefficient. Your task is to improve the performance of the application.

**200 points**

### Challenge 6 - [Fix an Unresponsive Website](challenges/fix-an-unresponsive-website/README.md)
This is a problematic React application. It has a dodgy menu option. Can you sort it out?

**400 points**

### Challenge 7 - [Perl to Python](challenges/perl/readme.md)
This is an old Perl app that needs to be upgraded to Python. Can you take on the challenge with the help of AI?

**500 points**

## Afternoon JAM Session


### Challenge 8 - [I need an App!](new%20app/readme.md)
This is the final challenge of the day. In this challenge you will create an application from scratch!

**1000 points**
