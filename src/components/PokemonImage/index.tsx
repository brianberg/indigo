import * as React from "react";

import PokedexService from "../../services/Pokedex";

const imageDir = "./assets/pokemon/3d";

export class PokemonImage extends React.Component<any, {}> {
  
  id      : number;
  number  : string;
  pokemon : any;
  height  : number;
  width   : number;

  display : any;

  constructor(props : any) {
    super(props);
    
    const Pokedex        = PokedexService.getInstance();
    const defaultDisplay = {
      costume : 0,
      gender  : 0,
      shiny   : 0,
      form    : 0,
    };

    this.id      = props.pokemonId;
    this.pokemon = Pokedex.getPokemon(this.id);
    this.height  = props.height || 160;
    this.width   = props.width || 160;
    this.number  = this.padNumber(this.id, 3);
    this.display = props.pokemonDisplay || defaultDisplay;
  }

  render() {
    const imageUrl        = this.build3dImageUrl();
    const defaultImageUrl = `${imageDir}/pokemon_icon_000.png`;
    return (       
        <img
            className="pokemon-image"
            src={imageUrl}
            height={this.height}
            width={this.width}
            alt={this.pokemon.name}
            onError={(e: any) => e.target.src=defaultImageUrl}
          />
    )
  }

  private build3dImageUrl() : string {
    const { costume, gender, shiny, form }  = this.display;
    let filename = `pokemon_icon_${this.number}`;
    switch (this.id) {
      case 201:
        filename += `_${form ? form : 11}`;
        break;
      case 351:
        filename += `_${form ? form-18 : 11}`;
        break;
      default:
        filename += `_00`; // Default to the male gender
        if (costume) filename += `_${this.padNumber(costume)}`;
    }
    return `${imageDir}/${filename}.png`;
  }

  private padNumber(num: number, length: number = 2): string {
    const str = num.toString();
    if (str.length === length) return str;
    return new Array(length - str.length + 1).join('0') + num;
  }

}