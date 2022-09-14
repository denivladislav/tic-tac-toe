install:
	npm install

lint:
	npx eslint . --ext js,jsx

develop:
	npx webpack serve

build:
	npm run build