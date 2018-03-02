const fs         = require("fs");
const path       = require("path");
const csv        = require("fast-csv");
const changeCase = require("change-case");
const { Utils }  = require("pogobuf-vnext");

const createFile = require("./create-file");
const split      = require("./split");

const rawInventory = require("../raw/inventory.json");
const rawTemplates = require("../raw/item-templates.json");
const rawPlayer    = require("../raw/player.json");

module.exports = {
  inventory : loadInventory,
  library   : loadLibrary,
  player    : loadPlayer,
  pokedex   : loadPokedex,
  templates : loadTemplates,
}

function loadInventory(done) {
  const inventory = Utils.splitInventory(rawInventory);
  const output    = path.join(__dirname, "..", "inventory");
  
  inventory.eggs = findInventoryEggs(inventory);
  
  console.log("creating inventory files...");
  createModule(inventory, output, done);
}

function loadLibrary(done) {
  const templates = split.itemTemplates(rawTemplates);
  const output    = path.join(__dirname, "..", "library");
  const library   = {
    items : {},
    moves : {},
    types : {},
  };
  
  console.log("loading item settings...");
  for (let item of templates.item_settings) {
    library.items[item.item_id] = item;
  }
  
  console.log("loading move settings...");
  for (let move of templates.move_settings) {
    move.name = parseMoveName(move);
    library.moves[move.movement_id] = move;
  }

  console.log("loading type settings...");
  for (let type of templates.type_settings) {
    library.types[type.attack_type] = type;
  }

  console.log("creating library files...");
  createModule(library, output, done);
}

function loadPlayer(done) {
  console.log("loading player...");
  const filepath = path.join(__dirname, "..", "player", "index.js");
  createFile(filepath, rawPlayer, false, done);
}

function loadPokedex(done) {
  console.log("loading regions...")
  loadRegions((err, filepath) => {
    if (err) {
      console.error(err);
      return done(err);
    }
    const pokedex = require(filepath);
    const { pokemon_settings } = split.itemTemplates(rawTemplates);
    for (let item of pokemon_settings) {
      let id = item.pokemon_id;
      let pokemon = pokedex[id];
      pokedex[id] = Object.assign(pokemon, item);
    }
    createFile(filepath, pokedex, false, done);
  });
}

function loadTemplates(done) {
  console.log("creating item template files...");
  const output    = path.join(__dirname, "..", "templates");
  const templates = Utils.splitItemTemplates(rawTemplates);
  createModule(templates, output, done);
}

function loadRegions(done) {
  const pokedex = {};
  const regions = scanDirectory(
    path.normalize(path.join(__dirname, "..", "pokedex")),
    (filepath) => filepath.endsWith(".csv")
  );

  let filesRead = 0;

  for (let p of regions) {
    console.log(`loading ${p}`)
    csv.fromPath(p, { headers : true })
      .on("data", addPokemon)
      .on("err", (err) => onError(err, p))
      .on("end", onEnd);
  }

  function addPokemon(data) {
    pokedex[data.id] = data;
  }

  function onError(err, filepath) {
    console.err(`An error occurred in ${filepath}: ${err.message}`);
  }

  function onEnd() {
    filesRead++;
    if (filesRead === regions.length) {
      const filepath = path.join(__dirname, "..", "pokedex", "index.js");
      createFile(filepath, pokedex, false, (err) => done(err, filepath));
    }
  }
}

function findInventoryEggs(inventory) {
  const eggs = [];
  const pokemon = inventory.pokemon;
  for (let i = pokemon.length - 1; i >= 0; --i) {
    let mon = pokemon[i];
    if (mon.is_egg) {
      eggs.push(mon);
      pokemon.splice(i, 1);
    }
  }
  return eggs;
}

function parseMoveName(move) {
  return changeCase.titleCase(
    move.vfx_name.replace('_', ' ').replace('fast', '')
  );
}

/**
 * Scan a directory and its subdirectories for files that
 * match the criteria specified by `validator`
 *
 * @param {String}   dir        Path to directory
 * @param {Function} validate   Used to validate each file
 * 
 * @return {Array} Array of paths
 */
function scanDirectory(dir, validate) {
  let results = [];
  let nodes = fs.readdirSync(dir);
  for (let node of nodes) {
      let nodePath = path.join(dir, node);
      let nodeInfo = fs.statSync(nodePath);

      if (nodeInfo.isDirectory()) {
          Array.prototype.push.apply(
            results,
            scanDirectory(nodePath, validate)
          );
      } else if (nodeInfo.isFile() && validate(nodePath)) {
          results.push(nodePath)
      }
  }
  return results;
}

function createModule(object, dir, done) {
  const totalFiles = Object.keys(object).length;
  console.log(dir, totalFiles);
  let filesCreated = 0;
  for (let key in object) {
    let filename = `${key}.js`;
    let filepath = path.join(dir, filename);
    console.log(`creating ${filepath}`);
    createFile(filepath, object[key], false, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`created ${filename} successfully`);
      }
      filesCreated++;
      if (filesCreated === totalFiles) createIndex();
    });
  }

  function createIndex() {
    const index  = path.join(dir, "index.js");
    let contents = "module.exports = {";
    for (key in object) {
      let filepath = `./${key}.js`;
      contents += `\n\t${key}: require("${filepath}"),`;
    }
    contents += "\n};";
    fs.writeFile(index, contents, "utf8", done);
  }
}

