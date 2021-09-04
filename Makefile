fmt:
	deno fmt

fmt-check:
	deno fmt --check

lint:
	deno lint

test:
	deno test

.PHONY: test fmt
