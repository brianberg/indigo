import * as React from "react";

import LibraryService from "../../../../services/Library";

import { Type } from "../Type";

import "./styles.scss";

export class Move extends React.Component<any, {}> {

  data : any;
  type : any;

  constructor(props : any) {
    super(props);
    const Library = LibraryService.getInstance();
    this.data     = props.data;
    this.type     = Library.getType(this.data.pokemon_type);
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
