import * as React from "react";

import { PokedexService } from "../../services/Pokedex";
import { LibraryService } from "../../services/Library";
import { UtilService }    from "../../services/Utils";

import { PokemonImage } from "../PokemonImage";
import { Type }         from "./components/Type";
import { Stat }         from "./components/Stat";
import { Move }         from "./components/Move";

import "./styles.scss";

const Pokedex = new PokedexService();
const Library = new LibraryService();
const Utils   = new UtilService();

export class Pokemon extends React.Component<any, {}> {

  id            : number;
  cp            : number;
  iv            : number;
  name          : string;
  nickname      : string;
  identifier    : string;

  primaryType   : any;
  secondaryType : any;
  
  // IVs
  attack        : number = 0;
  defense       : number = 0;
  stamina       : number = 0;

  // Moves
  fastMove      : any;
  chargeMove    : any;

  // Resources
  // image : string;

  constructor(props : any) {
    super(props);
    const data         = props.data;
    this.id            = data.pokemon_id;
    this.cp            = data.cp;
    this.nickname      = data.nickname;
    // IVs
    this.attack        = data.individual_attack;
    this.defense       = data.individual_defense;
    this.stamina       = data.individual_stamina;
    this.iv            = Utils.calculateIV(data);
    // Pokedex info
    const dexEntry     = Pokedex.getPokemon(this.id);
    this.name          = dexEntry.name;
    this.identifier    = dexEntry.identifier;
    this.primaryType   = Library.getType(dexEntry.type);
    this.secondaryType = dexEntry.type_2 ? Library.getType(dexEntry.type_2) : null;
    // Moves
    this.fastMove      = Library.getMove(data.move_1);
    this.chargeMove    = Library.getMove(data.move_2);
  }

  render() {
    return (
      <div className="pokemon mdc-elevation--z1">
        <div className="pokemon__main-stats">
          <div className="pokemon__main-stats--type mdc-elevation--z2">
            <Type primary={this.primaryType} secondary={this.secondaryType} />
          </div>
          <div className="pokemon__main-stats--cp mdc-elevation--z2 mdc-typography--subheading1">
            <span className="mdc-typography--caption">CP</span>{this.cp}
          </div>
        </div>
        <div className="pokemon__media">
          <PokemonImage pokemonId={this.id} />
        </div>
        <div className="mdc-card pokemon__content">
          <h2 className="pokemon__content--name mdc-typography--title">
            {this.name}
          </h2>
          <div className="pokemon__content--ivs">
            <Stat label="Attack" value={this.attack} />
            <div className="divider--vertical"></div>
            <Stat label="Defense" value={this.defense} />
            <div className="divider--vertical"></div>
            <Stat label="Stamina" value={this.stamina} />
          </div>
          <div className="pokemon__content--move mdc-typography--subheading1">
            <Move data={this.fastMove} />
          </div>
          <div className="pokemon__content--move mdc-typography--subheading1">
            <Move data={this.chargeMove} />
          </div>
        </div>
      </div>
    );
  }
}