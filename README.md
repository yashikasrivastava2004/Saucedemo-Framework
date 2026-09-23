# SauceDemo Playwright Framework

End-to-end UI automation for the [SauceDemo](https://www.saucedemo.com/) application using [Playwright Test](https://playwright.dev/docs/test-intro).

The framework follows the Page Object Model (POM) and uses custom Playwright fixtures to keep page interactions separate from test assertions.

## Prerequisites

- Node.js LTS or a compatible current Node.js release
- npm
- Internet access to `https://www.saucedemo.com`

## Installation

Clone the repository, move into the project directory, and install the dependencies:

```bash
npm ci
npx playwright install
```

On Linux CI runners, install browser dependencies as well:

```bash
npx playwright install --with-deps
```

## Running the tests

Run the complete test suite:

```bash
npx playwright test
```

Run the main SauceDemo purchase-flow test:

```bash
npx playwright test tests/sauceDemo.spec.js
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run with the Playwright UI mode:

```bash
npx playwright test --ui
```

The configured browser project is Chromium. The test configuration uses the SauceDemo URL as the base URL, captures screenshots on failure, and records traces for test runs.

## Test coverage

The complete purchase-flow test in [`tests/sauceDemo.spec.js`](./tests/sauceDemo.spec.js) verifies that a user can:

1. Open SauceDemo and log in as `standard_user`.
2. Confirm that the inventory page contains six products.
3. Sort products from low to high price.
4. Select the two least expensive products.
5. Add both products to the shopping cart.
6. Verify the cart contents, names, and prices.
7. Enter checkout details and continue to the order summary.
8. Validate the item total, tax, and final total.
9. Complete the purchase and verify the confirmation message.
10. Return to the inventory page and confirm that the cart is empty.

The test uses the standard SauceDemo credentials:

```text
Username: standard_user
Password: secret_sauce
```

## Project structure

```text
.
├── .github/
│   └── workflows/
│       └── playwright.yml       # GitHub Actions workflow
├── fixtures/
│   └── fixture.js               # Custom page-object fixtures
├── pages/
│   ├── basePage.js              # Shared page behavior
│   ├── cartPage.js              # Shopping cart interactions
│   ├── checkOutPage.js          # Checkout interactions and totals
│   ├── loginPage.js             # Login interactions
│   └── pdtPage.js               # Inventory/product interactions
├── tests/
│   ├── example.spec.js          # Playwright example test
│   └── sauceDemo.spec.js        # End-to-end purchase-flow test
├── package.json
├── package-lock.json
└── playwright.config.js
```

## Reports and debugging

The test runner uses the HTML reporter. Open the generated report after a run with:

```bash
npx playwright show-report
```

Test artifacts are written to:

- `playwright-report/` — HTML report and trace assets
- `test-results/` — screenshots, traces, and other per-test artifacts

These generated directories are excluded from version control. When a test fails, inspect the screenshot and trace from `test-results/` or open the HTML report for step-by-step diagnostics.

## Continuous integration

The workflow at [`.github/workflows/playwright.yml`](./.github/workflows/playwright.yml) runs on pushes and pull requests targeting `main` or `master`. It:

1. Checks out the repository.
2. Installs the Node.js LTS version.
3. Installs npm dependencies with `npm ci`.
4. Installs Playwright browsers and their system dependencies.
5. Runs the Playwright suite.
6. Uploads the HTML report as a workflow artifact.

## Adding tests

1. Add or update a page object in `pages/` for reusable UI interactions.
2. Register new page objects in [`fixtures/fixture.js`](./fixtures/fixture.js) when tests need fixture-based access.
3. Add test specifications under `tests/`.
4. Prefer Playwright locators and web-first assertions so tests wait for the application state rather than relying on fixed delays.
5. Run the targeted test locally before running the full suite.

## Useful Playwright commands

```bash
# List discovered tests
npx playwright test --list

# Run a specific test by title
npx playwright test -g "SauceDemo complete purchase flow"

# Run with a visible browser and pause for inspection
npx playwright test --headed --debug

# Remove generated test artifacts
# PowerShell:
Remove-Item -Recurse -Force playwright-report, test-results
```

