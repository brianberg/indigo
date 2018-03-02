#!/usr/bin/env node

const loaders = require("./utils/loaders");

loaders.inventory(() => console.log("finished loading inventory"));
loaders.pokedex(() => console.log("finished loading pokedex"));
loaders.library(() => console.log("finished loading library"));
loaders.player(() => console.log("finished loading player"));