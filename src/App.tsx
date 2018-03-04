import * as React from "react";

import InventoryService from "./services/Inventory";

import { Toolbar }     from "./components/Toolbar";
import { Sidebar }     from "./components/Sidebar";
import { PokemonList } from "./components/PokemonList";

import "./app.scss";

export class App extends React.Component<any, {}> {

  inventory : InventoryService = InventoryService.getInstance();

  render() {
    const pokemon = this.inventory.getPokemon();
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