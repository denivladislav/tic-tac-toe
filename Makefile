install:
	npm install

lint:
	npm run lint

develop:
	npx webpack serve

build:
	npm run build

test:
	npm test

testcoverage:
	npm run test:coverage