import * as React from "react";

import * as Library from "../../../../../data/library";

import { Type } from "../Type";

import "./styles.scss";

export class Move extends React.Component<any, {}> {

  data : any;
  type : any;

  constructor(props : any) {
    super(props);
    this.data = props.data;
    this.type = Library.types[this.data.pokemon_type];
  }

  render() {
    return (
      <div className="pokemon-move">
        <Type primary={this.type} height={18}/>
        <span className="pokemon-move__name">{this.data.name}</span>
        <span className="pokemon-move__bars"></span>
        <span className="pokemon-move__power">{this.data.power}</span>
      </div>
    );
  }
}
