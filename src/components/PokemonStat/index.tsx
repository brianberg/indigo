import * as React from "react";

import "./styles.scss";

export class PokemonStat extends React.Component<any, {}> {

  render() {
    return (
      <div className="pokemon-stat">
        <div className="pokemon-stat__value mdc-typography--subheading2">
          {this.props.value}
        </div>
        <div className="pokemon-stat__label mdc-typography--caption">
          {this.props.label}
        </div>
      </div>
    );
  }

}