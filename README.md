# Indigo

> Pokemon GO Bag Viewer and Pokedex

### Installation

Install webpack globally via `npm install -g webpack`, then install dependencies via `npm install`

### Creating Local "Database"

This project currently requires local inventory, player, and pokedex data to be present in the `data` directory. The data can be acquired by fetching Pokemon GO inventory, player, and item templates and running a utility function `data/build.js` to parse the raw data.

#### Loading User Data

Caution: Running the following commands could result in your account getting banned.

```
$ mkdir data/raw
$ node data/utils/fetch.js --google -u <username> -p <password> -l <latitude,longitude>
```


#### Building Data

Run the following command to parse the raw API response into smaller, more digestible chunks

```
$ mkdir data/inventory
$ mkdir data/player
$ mkdir data/templates
$ node data/build.js 
```
