import * as React from "react";

import PokedexService from "../../services/Pokedex";

import { PokedexEntry } from "../PokedexEntry";

import "./styles.scss";

export class PokedexEntries extends React.Component<any, {}> {

  entries : any[];

  constructor(props : any) {
    super(props);
    const Pokedex = PokedexService.getInstance();
    this.entries  = Pokedex.getAllEntries();
    // this.entries  = Pokedex.getAllEntries().slice(0,9);
  }

  render() {
    const entries = this.entries.map((entry) => {
      return <PokedexEntry key={entry.id} data={entry} />;
    });
    return (
      <div className="pokedex">
        {entries}
      </div>
    )
  }

}