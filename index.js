"use strict";

const random = require("random-seed");

/*
  * `config`: _Object_
    * `random`: _Object_ Initialized instance of `random-seed` generator.
        Mutually exclusive with `config.seed`.
    * `seed`: _String_ Seed to use to initialize a new instance of `random-seed`
        generator. Mutually exclusive with `config.random`.
*/
const Generator = module.exports = function(config)
{
    const self = this;

    config = config || {};

    if (config.random && config.seed)
    {
        throw new Error("Providing initialized random generator (config.random) and a seed (config.seed) is not supported.");
    }
    if (!config.random && !config.seed)
    {
        throw new Error("Missing one of: initialized random generator (config.random) or a seed (config.seed).");
    }
    self._seed = config.seed;
    self._random = config.random || random.create(self._seed);
};

/*
  * `size`: _Integer_ Number of bytes to generate.
  * `callback`: _Function_ _(Default: undefined)_ `(error, buffer) => {}`
      Callback to invoke once bytes are generated.
*/
Generator.prototype.randomBytes = function(size, callback)
{
    const self = this;
    if (callback && typeof callback != "function")
    {
        throw new Error("Callback must be a function.");
    }
    size = parseInt(size);
    if (isNaN(size) || size <= 0)
    {
        const error = new Error(`Invalid size: ${size}`);
        if (callback)
        {
            callback(error);
            return;
        }
        throw error;
    }
    const buffer = Buffer.alloc(size);
    for (let i = 0; i < size; i++)
    {
        buffer[i] = self._random.intBetween(0, 255);
    }
    if (callback)
    {
        callback(undefined, buffer);
        return;
    }
    return buffer;
};
