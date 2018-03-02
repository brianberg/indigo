#!/usr/bin/env node

const path                                     = require("path");
const commander                                = require("commander");
const { Client, GoogleLogin, PTCLogin, Utils } = require("pogobuf-vnext");

const createFile = require("./create-file");

commander
  .version("0.1.0")
  .option("--google", "Use Google login")
  .option("--ptc", "Use PTC login")
  .option("-u, --username <username>", "Username")
  .option("-p, --password <password>", "Password")
  .option("-t, --token <token>", "Token")
  .option("-l, --location <location>", "Location <latitude,longitude>")
  .parse(process.argv);

fetch();

function fetch() {
  const useGoogle  = commander.google;
  const usePTC     = commander.ptc;
  const username   = commander.username;
  const password   = commander.password;
  const token      = commander.token;
  const location   = commander.location.split(',');
  const hashingKey = process.env.POGO_HASHING_KEY;
  
  if (!hashingKey) {
    console.error("Missing POGO_HASHING_KEY environment variable");
    return;
  }

  let authType;

  if (useGoogle) {
    authType = "google";
  } else if (usePTC) {
    authType = "ptc";
  } else {
    console.error("Must specify either Google or PTC authentication");
    return;
  }

  if (location.length < 2) throw Error("Must provide both latitude and longitude")
  
  let latitude;
  let longitude;

  try {
    latitude = parseFloat(location[0].trim());
    longitude = parseFloat(location[1].trim());
  } catch (e) {
    throw Error("Invalid location");
  }

  if (username || password) {

    if (!username) {
      console.error("Must provide username");
      return;
    } else if (!password) {
      console.error("Must provide password");
      return;
    }
    
    const auth = useGoogle ? new GoogleLogin() : new PTCLogin();

    console.log("logging in...")
    auth.login(username, password)
      .then((authToken) => {
        console.log("token", authToken);
        fetchData(authType, authToken, hashingKey, latitude, longitude);
      })
      .catch((err) => {
        console.error(err);
      });
  } else if (token) {
    fetchData(authType, token, hashingKey, latitude, longitude);
  }
}

function fetchData(authType, authToken, hashingKey, latitude, longitude) {
  console.log("fetching data...")
  const client = new Client({ authType, authToken, hashingKey });
  client.setPosition(latitude, longitude);
  client.init()
    .then(() => {
      return client.batchStart()
        .getPlayer()
        .getInventory(0)
        .batchCall();
    })
    .then((responses) => {
      const player    = responses[0];
      const inventory = responses[1];
      createRawFiles(player, inventory, () => {
        return;
      });
    });
}

function createRawFiles(player, inventory, done) {
  const playerPath    = path.join(__dirname, "..", "raw", "player.json");
  const inventoryPath = path.join(__dirname, "..", "raw", "inventory.json");

  let filesCreated = 0;
  
  console.log("creating raw player data file...");
  createFile(playerPath, player, true, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`created ${playerPath}`);
    }
    filesCreated++;
    if (filesCreated === 2) done();
  });

  console.log("creating raw inventory data file...");
  createFile(inventoryPath, inventory, true, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`created ${inventoryPath}`);
    }
    filesCreated++;
    if (filesCreated === 2) done();
  });
}