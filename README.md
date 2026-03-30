#
# Healthycloud Test Suite
XXXXXXXXXXXXX

## QA Automation Framework - Feature Overview
This QA automation framework is built on Playwright and designed for scalable, maintainable, and CI/CD-friendly end-to-end testing.
## 🚀 Key Features

# ✅ 1. Dual Reporting Support (Playwright + Allure)

Supports both default Playwright HTML and Allure reporting for comprehensive visibility:
Playwright HTML Report: Instant local reporting with traces, screenshots, and videos.
Allure Report: Enhanced metadata, step logs, failure diagnostics, and historical tracking.
Configured via:
```bash
reporter: [['html'], ['allure-playwright']]
```

# ✅ 2. Structured Logging with Pino

Implements high-performance structured logging using Pino:
Logs cover test metadata, execution steps, environment, and browser context.
Utility functions: logTestStart, logTestEnd, and logSuiteEnd standardize log output.

# ✅ 3. Screenshot & Video Capture (On Failure + Manual)

Automatic: Configured to capture only on test failure:
```bash
screenshot: 'only-on-failure',
video: 'retain-on-failure'
```
Manual Screenshots: Custom utility for in-test attachment:
```bash
await attachScreenshot(page, testInfo, 'Step Description');
```
All artifacts are attached in Allure and stored for CI investigation.

# ✅ 4. Environment-Driven Execution

Supports flexible configuration via environment variables:

Variables:
* TEST_ENV: test, pentest, prod
* BROWSER_NAME: chromium, firefox, webkit
* HEADLESS: true or false

Default: Executes across all 3 browsers unless filtered.
Run Example:
```bash
HEADLESS=false BROWSER_NAME=firefox TEST_ENV=pentest npx playwright test
```

# ✅ 5. Page Object Model (POM)

Pages implemented as reusable classes (e.g., LoginPage, DashboardPage).
Each class encapsulates selectors and actions for better maintainability and abstraction.

# ✅ 6. Data-Driven Testing

Input and expected values externalized in testData.json.
Allows input permutations without altering test logic.

# ✅ 7. GitLab CI/CD Integration

Designed to run headless tests across environments in GitLab CI.
Supports dynamic configuration via .gitlab-ci.yml:
Archives reports, videos, screenshots using CI artifacts.
```bash
variables:
  TEST_ENV: "pentest"
  BROWSER_NAME: "firefox"
  HEADLESS: "true"
```

## 📦 Project Structure

```
|__ Docs include the word file how i work and perioterized my work and enhancments
|
|__ Exploratory Testing  #Include everything for the Exploratory Testing 
|     
|   |
|   |__ xx.xlsx         #Test Charter , Exploratory Notes , performnace testing ,
|   |                     Risk based Analysis , | Automation test cases
|   |
|   |__ Screenshoots     # include all found issue as scrrenshoot
|
|
|__ Pages                 # Include all the page locatores and some helper methods
|
|__Utils
|  |__testdata         # Include the test data used in test cases
|  |
|  |__ logging         # Include the logging class using Pino Tool
|
|
├── tests
│   ├── UI                # UI test cases
|   |   |__               # envelops.spec.ts
|   |   |__               # login.spec.ts
|   |   |__               # transaction.spec.ts
|   |
│   └── api-tests         # API test cases
│       ├── auth-utils.ts     # Login utility
│       └── envelopes.test.ts # Add/Edit/Delete envelope tests
├── playwright.config.ts  # Global test config
├── package.json
└── .gitignore
```


## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://gitlab.endava.com/vwfs/vwfs-e2e-playwright.git
cd vwfs-e2e-playwright
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Install Playwright Browsers
```bash
npx playwright install
```

### 4. Run Tests

#### Run All Tests
```bash
npm run test
```

#### Run API Tests Only
```bash
npm run test:api
```

#### Run UI Tests Only
```bash
npm run test:ui
```

#### Run Report Playwright
```bash
npm run test:report:playwright
```
#### Run Report Allure
```bash
npm run test:report:allure
```


## ✍️ Author
- QA Engineer: Kareem Elhosseny

## 🛡️ License
This project is licensed under the MIT License.

## Naming Conventions

CamelCase for Variables and Methods:
Example: Profilemenu → profileMenu.

PascalCase for Classes and Page Objects:
Example: MeinDaten → PersonalDataPage.

Descriptive Names:
Use meaningful names that describe the purpose of the variable, class, or file.
