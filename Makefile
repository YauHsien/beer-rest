
all: test run

devnew: localnew
	npm i -D nodemon

localnew:
	npm i -D typescript
	npm i express
	npm i -D @types/express

run:
	npm run start

test:
	#npm run test
