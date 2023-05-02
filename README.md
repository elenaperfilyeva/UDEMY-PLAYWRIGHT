# UDEMY-PLAYWRIGHT

###### This is [Udemy](https://www.udemy.com) [Automated Software Testing with Playwright](https://www.udemy.com/course/automated-software-testing-with-playwright/) course practice project..

---------------------------------------------------------------

#### Install
```
  npm install @playwright/test
  npx playwright install
```

#### Run tests
```
  npx playwright test    // default run headless chromium
  npx playwright test --headed    // headed browser mode
  npx playwright test --browser=firefox    // to specify browser
  npx playwright test --browser=all    // all browsers
  npx playwright test  tests/example.spec.ts    // specify test
  npx playwright test --grep=@myTag    // run tests with @myTag tag
  npx playwright test --grep-invert=@myTag    // run everything except tests with the tag
  npx playwright test --config=playwright.config.ts --project=Webkit    // run tests using the config

  // run tests and generate report
  npx playwright test --config=playwright.config.ts --project=Chromium --reporter=line
  npx playwright test --config=playwright.config.ts --project=Chromium --reporter=list
  npx playwright test --config=playwright.config.ts --project=Chromium --reporter=dot
  npx playwright test --config=playwright.config.ts --project=Chromium --reporter=junit
  npx playwright test --config=playwright.config.ts --project=Chromium --reporter=html-reporter

  // run using custom command from package.json
  npm run tests:chrome
  npm run tests:firefox
  npm run tests:webkit

  npm run tests:webkit -- --headed    // to overwright configuration for the custom command
  
  // run e2e tests
  npm run tests:e2e

  // run api tests
  npm run tests:api

  // run visual tests (screenshots)
  npm run tests:visual:chrome
  npm run tests:visual:firefox
  npm run tests:visual:webkit

  // update snapshots for visual tests
  npm run tests:visual:chrome:update
  npm run tests:visual:firefox:update
  npm run tests:visual:webkit:update
```
