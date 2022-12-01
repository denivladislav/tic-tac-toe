# tic-tac-toe

[![CI](https://github.com/denivladislav/tic-tac-toe/workflows/CI/badge.svg)](https://github.com/denivladislav/tic-tac-toe/actions/workflows/CI.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/f1a44e153090002109fc/maintainability)](https://codeclimate.com/github/denivladislav/tic-tac-toe/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/f1a44e153090002109fc/test_coverage)](https://codeclimate.com/github/denivladislav/tic-tac-toe/test_coverage)

A hot-seat game for two players (mobile or pc) that supports two languages (en, ru). 

After entering usernames, players pick the size of the game field. First player, who occupies three cells in a row, in a column or in a diagonal, wins. Any player may undo his last turn. Players swap turns after each game.

![result](https://user-images.githubusercontent.com/71961494/192490886-e34a6fe7-ea9e-43c7-998b-de09e14144d7.gif)

### Stack
- React, Redux Toolkit, React Bootstrap, Jest, React Testing Library, formik, i18next
- webpack, ESLint, Prettier, husky

### How To Use Locally:
```bash
# Install Dependencies.
$ make install

# Build Project.
$ make build

# Develop (localhost:8080).
$ make develop

# Lint.
$ make lint

# Test / Test With Coverage
$ make test
$ make testcoverage
```

### Deploy
This game is deployed to Vercel.

Follow <a href="https://tic-tac-toe-bice-eight.vercel.app/">this link</a> to play.