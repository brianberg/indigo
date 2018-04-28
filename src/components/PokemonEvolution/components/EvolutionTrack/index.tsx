import * as React from "react";

import { PokemonImage } from "../../../PokemonImage";

import "./styles.scss";

export class EvolutionTrack extends React.Component<any, {}> {

  familyId : number;
  track    : any[];

  constructor(props : any) {
    super(props);
    this.familyId = props.familyId;
    this.track    = props.track;
  }

  render() {
    const imageSize  = 40;
    const index      = this.track[0].id;
    const evolutions = this.track.map((evolution) => {
      return (
        <div key={evolution.evolution} className="evolution">
          <div className="evolution__arrow">--></div>
          <PokemonImage
              pokemonId={evolution.evolution}
              width={imageSize}
              height={imageSize}
              />
        </div>
      );
    });
    return (
      <div className="evolution-track">
        <PokemonImage
            pokemonId={index}
            width={imageSize}
            height={imageSize}
            />
        {evolutions}
      </div>
    );
  }
}