# Makefile for easy testing

test: all

all: prepare \
	test-mic

prepare:
	@./node_modules/.bin/grunt deploy

test-mic:
	@./node_modules/.bin/mocha --reporter spec --slow 500 --timeout 2000 test/core/mic.spec.js

.PHONY: test
