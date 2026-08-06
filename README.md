# Calligraph

[![npm version](https://img.shields.io/npm/v/calligraph)](https://www.npmjs.com/package/calligraph)
[![npm downloads](https://img.shields.io/npm/dm/calligraph)](https://www.npmjs.com/package/calligraph)

Fluid text transitions powered by [Motion](https://motion.dev). Shared characters slide to their new positions while entering characters fade in and exiting ones fade out.

## Install

```bash
npm install calligraph
```

## Usage

```tsx
import { Calligraph } from "calligraph";
import { useState } from "react";

function App() {
  const [text, setText] = useState("Hello");

  return (
    <>
      <Calligraph>{text}</Calligraph>
      <button onClick={() => setText("World")}>Change</button>
    </>
  );
}
```

When `children` changes, characters common to both strings slide into their new positions. New characters fade in, removed characters fade out.

## Variants

```tsx
<Calligraph>Text</Calligraph>                  // LCS character diffing
<Calligraph variant="number">$35.99</Calligraph> // rolling digits
<Calligraph variant="slots">1204</Calligraph>    // slot-machine spin
```

## Animation presets

```tsx
<Calligraph animation="bouncy" trend={1} drift={{ x: 20, y: 8 }}>
  {text}
</Calligraph>
```

Presets: `default`, `smooth`, `snappy`, `bouncy`. Full prop reference in [llms.txt](packages/calligraph/llms-full.txt).

## Requirements

- React 18+
- Motion 11+

## AI & agents

The docs are plain markdown, following the [llms.txt convention](https://llmstxt.org):

- [`/llms.txt`](https://calligraph.raphaelsalaja.com/llms.txt) — concise index for assistants.
- [`/llms-full.txt`](https://calligraph.raphaelsalaja.com/llms-full.txt) — the full documentation in one file (also at [`/index.md`](https://calligraph.raphaelsalaja.com/index.md)).
- `node_modules/calligraph/llms-full.txt` — the same full documentation ships inside the npm package, so agents can read it straight from your project.
- [`AGENTS.md`](AGENTS.md) — guides coding agents contributing to this repo.

## Sponsors

If Calligraph is useful to you or your team, consider [sponsoring the project](https://github.com/sponsors/raphaelsalaja).

## See also

- [Torph](https://github.com/lochie/torph) — dependency-free animated text morphing
- [NumberFlow](https://github.com/barvian/number-flow) — animated number transitions
- [NumericText](https://github.com/shizukushq/numeric-text) — SwiftUI-style `.numericText` for the web

## Acknowledgments

- [Jace](https://github.com/jacethings) for pushing me to build this
- Inspired by [Family](https://family.co/)
