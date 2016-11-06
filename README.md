# deterministic-pseudorandombytes

_Stability: 1 - [Experimental](https://github.com/tristanls/stability-index#stability-1---experimental)_

[![NPM version](https://badge.fury.io/js/deterministic-pseudorandombytes.png)](http://npmjs.org/package/deterministic-pseudorandombytes)

Node.js [crypto.randomBytes(size\[, callback\])](https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback) API compatible deterministic pseudorandom implementation.

## Usage

```javascript
const Generator = require("deterministic-pseudorandombytes");

const generator1 = new Generator({seed: "foo"});
const bytes1 = generator1.randomBytes(42);

const generator2 = new Generator({seed: "foo"});
const bytes2 = generator2.randomBytes(42);

const random = require("random-seed");
const generator3 = new Generator({random: random.create("foo")});
const bytes3 = generator3.randomBytes(42);

console.log(bytes1.equals(bytes2));
console.log(bytes1.equals(bytes3));
```

## Overview

This module uses [random-seed](https://github.com/skratchdot/random-seed) in order to generate deterministic pseudorandom bytes. The primary use-case for this is to support deterministic testing.

## Documentation

### Generator

  * [new Generator(config)](new-generatorconfig)
  * [generator.randomBytes(size\[, callback\])](generatorrandombytessize-callback)

### new Generator(config)

  * `config`: _Object_
    * `random`: _Object_ Initialized instance of `random-seed` generator. Mutually exclusive with `config.seed`.
    * `seed`: _String_ Seed to use to initialize a new instance of `random-seed` generator. Mutually exclusive with `config.random`.

Creates a new Generator instance ready to serve random bytes.

### generator.randomBytes(size[, callback])

  * `size`: _Integer_ Number of bytes to generate.
  * `callback`: _Function_ _(Default: undefined)_ `(error, buffer) => {}` Callback to invoke once bytes are generated.

Generates deterministic pseudorandom bytes. If `callback` is not provided, bytes will returned synchronously as a Buffer.
