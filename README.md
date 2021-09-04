# pretty_bytes v1.0.3

[![ci](https://github.com/kt3k/pretty_bytes/actions/workflows/ci.yml/badge.svg)](https://github.com/kt3k/pretty_bytes/actions/workflows/ci.yml)

> Convert bytes to a human readable string: 1337 → 1.34 kB

A utility for displaying file sizes for humans.

Note: This module was ported from
[pretty-bytes](https://github.com/sindresorhus/pretty-bytes).

# Usage

```ts
import { prettyBytes } from "https://deno.land/x/pretty_bytes@v1.0.3/mod.ts";

prettyBytes(1337); // => 1.34 kB
```

See [the API doc](https://doc.deno.land/https/deno.land%2Fx%2Fpretty_bytes%40v1.0.3%2Fmod.ts) for more details.

# License

MIT
