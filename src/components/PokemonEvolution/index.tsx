import * as React from "react";

import PokedexService from "../../services/Pokedex";

import { PokemonImage }   from "../PokemonImage";
import { EvolutionTrack } from "./components/EvolutionTrack";

export class PokemonEvolution extends React.Component<any, {}> {

  familyId : number;
  tracks   : any[];

  constructor(props : any) {
    super(props);
    const Pokedex = PokedexService.getInstance();
    this.familyId = props.familyId;
    this.tracks = Pokedex.getFamily(this.familyId);
  }

  render() {
    if (!this.tracks.length) {
      const imageSize = 40;
      return (
        <PokemonImage
          pokemonId={this.familyId}
          width={imageSize}
          height={imageSize}
          />
      );
    }
    const tracks = this.tracks.map((track, index) => {
      return (
        <EvolutionTrack key={index} track={track} />
      );
    });
    return (
      <div className="evolutions">
        {tracks}
      </div>
    )
  }
}