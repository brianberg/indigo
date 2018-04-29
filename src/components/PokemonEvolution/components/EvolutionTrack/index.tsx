import * as React from "react";

import { PokemonImage } from "../../../PokemonImage";

import "./styles.scss";

export class EvolutionTrack extends React.Component<any, {}> {

  familyId  : number;
  track     : any[];
  shift     : number;
  highlight : number;

  constructor(props : any) {
    super(props);
    this.familyId  = props.familyId;
    this.track     = props.track;
    this.shift     = props.shift;
    this.highlight = props.highlight;
  }

  render() {
    const imageSize = 56;
    const index     = this.track[0].id;
    const items     = [
      <div key={'p' + index} 
          className={index === this.highlight ? "highlight" : ''}>
        <PokemonImage
          pokemonId={index}
          width={imageSize}
          height={imageSize}
        />
      </div>
    ];
    // Add each evolution in the track
    for (let i in this.track) {
      const item = this.track[i];
      const distance = item.km_buddy_distance_requirement;
      // Evolution elements
      const candyElement = (
        <div className="evolution__candy">
          {item.candy_cost}
        </div>
      );
      const distanceElement = (
        <div className="evolution__distance">
          {distance > 0 ? distance + " km" : ''}
        </div>
      );
      // Add evolution
      items.push(
        <div key={'e' + i} className="evolution">
          {candyElement}
          <i className="material-icons">keyboard_backspace</i>
          {distanceElement}
        </div>
      );
      // Add next pokemon image
      items.push(
        <div key={'p' + (i + 1)}
            className={item.evolution === this.highlight ? "highlight" : ''}>
          <PokemonImage
            pokemonId={item.evolution}
            width={imageSize}
            height={imageSize}
          />
        </div>
      );
    }
    // Shift track a certain number of pokemon evolution widths
    const styles : any   = {};
    if (this.shift) {
      const evolutionWidth = 172;
      styles.marginLeft = '' + (evolutionWidth * this.shift) + "px";
    }
    return (
      <div className="evolution-track" style={styles}>
        {items}
      </div>
    );
  }
}