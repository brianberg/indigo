import * as React                       from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import InventoryService from "./services/Inventory";

import { Toolbar }        from "./components/Toolbar";
import { Sidebar }        from "./components/Sidebar";
import { PokemonList }    from "./components/PokemonList";
import { PokedexEntries } from "./components/PokedexEntries";

import "./app.scss";

export class App extends React.Component<any, {}> {

  inventory : InventoryService = InventoryService.getInstance();

  render() {
    const pokemon = this.inventory.getPokemon();
    const Pokemon = () => <PokemonList data={pokemon} />;
    const Items   = () => <div>Items</div>;
    const Pokedex = () => <PokedexEntries />;
    return (
      <BrowserRouter>
        <div className="app">
          <Toolbar />
          <Sidebar />
          <div className="content">
            <Switch>
              <Route path="/pokemon" component={Pokemon} />
              <Route path="/items"   component={Items} />
              <Route path="/pokedex" component={Pokedex} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}