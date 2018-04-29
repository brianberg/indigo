import * as React from "react";

import PokedexService from "../../services/Pokedex";

import { PokemonImage }   from "../PokemonImage";
import { EvolutionTrack } from "./components/EvolutionTrack";

import "./styles.scss";

export class PokemonEvolution extends React.Component<any, {}> {

  familyId  : number;
  tracks    : any[];
  highlight : number;

  constructor(props : any) {
    super(props);
    const Pokedex  = PokedexService.getInstance();
    this.familyId  = props.familyId;
    this.tracks    = Pokedex.getFamily(this.familyId);
    this.highlight = props.highlight;
  }

  render() {
    const tracks = this.tracks.map((track, index) => {
      const styles : any = {};
      const diff = index > 0 ? this.tracks[index - 1].length - track.length : 0;
      return (
        <EvolutionTrack
            key={index}
            track={track}
            shift={diff}
            highlight={this.highlight}
            />
      );
    });
    if (tracks.length === 0) {
      const imageSize = 56;
      tracks.push(
        <PokemonImage
          key={0}
          pokemonId={this.familyId}
          width={imageSize}
          height={imageSize}
        />)
    }
    return (
      <div className="evolutions">
        {tracks}
      </div>
    )
  }
}