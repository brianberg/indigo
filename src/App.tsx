import * as React from "react";

import InventoryService from "./services/Inventory";

import { Toolbar }     from "./components/Toolbar";
import { Sidebar }     from "./components/Sidebar";
import { PokemonList } from "./components/PokemonList";

import "./app.scss";

export class App extends React.Component<any, {}> {

  inventory : InventoryService = InventoryService.getInstance();

  state : any = {
    state : "pokemon",
  };

  goTo(key : string) {
    this.setState({
      state : key,
    });
  }

  render() {
    const pokemon = this.inventory.getPokemon();
    const showPokemon = this.state.state === "pokemon";
    const showItems   = this.state.state === "items";
    const showPokedex = this.state.state === "pokedex";
    return (
      <div className="app">
        <Toolbar />
        <Sidebar
            selected={this.state.state}
            handleClick={(key : string) => this.goTo(key)} />
        <div className="content">
          {showPokemon && <PokemonList data={pokemon} />}
          {showItems && <div>Items</div>}
          {showPokedex && <div>Pokedex</div>}
        </div>
      </div>
    );
  }
}