import * as React from "react";

import PokedexService from "../../services/pokedex";

import { PokedexEntry } from "../PokedexEntry";

export class PokedexEntries extends React.Component<any, {}> {

  entries : any[];

  constructor(props : any) {
    super(props);
    const Pokedex = PokedexService.getInstance();
    this.entries  = Pokedex.getAllEntries();
  }

  render() {
    const entries = this.entries.map((entry) => {
      return (
        <li key={entry.id} className="mdc-grid-tile">
          <PokedexEntry data={entry} />
        </li>
      );
    });
    return (
      <div className="pokemon-list">
        <div className="mdc-grid-list">
          <ul className="mdc-grid-list__tiles">{entries}</ul>
        </div>
      </div>
    )
  }

}