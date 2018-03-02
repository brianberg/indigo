import * as React from "react";

import { InventoryService } from "./services/Inventory";

import { Toolbar }     from "./components/Toolbar";
import { Sidebar }     from "./components/Sidebar";
import { PokemonList } from "./components/PokemonList";

import "./app.scss";

const Inventory = new InventoryService();

export class App extends React.Component<any, {}> {
  render() {
    const pokemon = Inventory.getPokemon();
    return (
      <div className="app">
        <Toolbar />
        <div className="content">
          <PokemonList data={pokemon} />
        </div>
      </div>
    );
  }
}