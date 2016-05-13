# Contribution Guidelines

## Setup for Contributing

- Make sure you are running [node.js >= v6](https://nodejs.org/en/).
- Make sure you have an [editorconfig plugin](http://editorconfig.org/#download) installed for your text editor
- Make sure you have a [standard js linter](http://standardjs.com/index.html#usage) installed, tests will not pass if linting fails
- Make sure you are familiar with [ES6](https://medium.com/sons-of-javascript/javascript-an-introduction-to-es6-1819d0d89a0f)
- Make sure you are familiar with [test-driven development](https://www.wikiwand.com/en/Test-driven_development)

## Linting & Code Style

> **NOTE:** This project uses [Standard.js](/feross/standard) to check for code consistency.

Badly formatted code is; under no circumstance; allowed to hit the remote repo. We have precautions in place to prevent this, namely:

1. Automated tests will first lint the code. If the code is badly formatted, the tests will fail.
2. We use [Husky](/typicode/husky) to run a linting step before every `git commit`

In the case of badly formatted code, we might ask you to [squash your commits](#squashing-commits)

## Writing Tests

When submitting a pull request, please be sure to add passing tests for any new
logic.

We have chosen [AVA](/sindresorhus/ava) as our test harness. Since AVA runs tests concurrently, and runs individual test files in parallel ([What's the difference?](http://stackoverflow.com/questions/1050222/concurrency-vs-parallelism-what-is-the-difference)), there are some conventions we've established to prevent
any errors when running asynchronous tests:

1. If you have two tests that each test their own fixture, those tests should be placed in different files.
2. AVA tests are flat in nature. If you feel the need to use `describe`-like nesting functionality (from the likes of Mocha, for example) then create a new test file and pretend it is your `describe` block.
