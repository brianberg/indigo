import * as React from "react";

import PokedexService from "../../services/Pokedex";

const dirFlatImages = "./src/assets/pokemon/flat";
const dir3dImages   = "http://www.pokemap.net/img/pokemon";

export class PokemonImage extends React.Component<any, {}> {
  
  id      : number;
  number  : string;
  pokemon : any;
  height  : number;
  width   : number;

  constructor(props : any) {
    super(props);
    
    const Pokedex = PokedexService.getInstance();

    this.id       = props.pokemonId;
    this.pokemon  = Pokedex.getPokemon(this.id);
    this.height   = props.height || 96;
    this.width    = props.width || 96;

    const length  = this.id.toString().length;
    this.number   = length === 3 ?
      this.id.toString() : new Array(3 - length + 1).join('0') + this.id;
  }

  render() {
    const imageUrl = this.buildFlatImageUrl();
    return (
      <svg height={this.height} width={this.width}>       
        <image
          xlinkHref={imageUrl}
          height={this.height}
          width={this.width}
          />    
      </svg>
    )
  }

  private build3dImageUrl() : string {
    return `${dir3dImages}/${this.number}.png`;
  }

  private buildFlatImageUrl() : string {
    const filename = `pokémon_${this.number}-${this.pokemon.identifier}`;
    return `${dirFlatImages}/${filename}.svg`;
  }

}