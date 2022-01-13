# Deprecated

This module is now merged to Deno's standard modules.

Use https://deno.land/std/fmt/bytes.ts instead.

# pretty_bytes v2.0.0

[![ci](https://github.com/kt3k/pretty_bytes/actions/workflows/ci.yml/badge.svg)](https://github.com/kt3k/pretty_bytes/actions/workflows/ci.yml)

> Convert bytes to a human readable string: 1337 → 1.34 kB

A utility for displaying file sizes for humans.

Note: This module was ported from
[pretty-bytes](https://github.com/sindresorhus/pretty-bytes).

# Usage

```ts
import { prettyBytes } from "https://deno.land/x/pretty_bytes@v2.0.0/mod.ts";

prettyBytes(1337);
//=> '1.34 kB'

prettyBytes(100);
//=> '100 B'

// Display with units of bits
prettyBytes(1337, { bits: true });
//=> '1.34 kbit'

// Display file size differences
prettyBytes(42, { signed: true });
//=> '+42 B'

// Localized output using German locale
prettyBytes(1337, { locale: "de" });
//=> '1,34 kB'
```

See
[the API doc](https://doc.deno.land/https/deno.land%2Fx%2Fpretty_bytes%40v2.0.0%2Fmod.ts)
for more details.

# License

MIT
