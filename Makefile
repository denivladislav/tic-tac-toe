install:
	npm install

lint:
	npx eslint . --ext js,jsx

develop:
	npx webpack serve

build:
	npm run build

test:
	npm test

testcoverage:
	npm run test:coverage