import * as React from "react";

import LibraryService from "../../services/Library";

import { PokemonImage } from "../PokemonImage";
// TODO move these up
import { Type }         from "../Pokemon/components/Type";
import { Stat }         from "../Pokemon/components/Stat";
import { Move }         from "../Pokemon/components/Move";

import "./styles.scss";

export class PokedexEntry extends React.Component<any, {}> {

  id              : number;
  number          : string;
  name            : string;
  identifier      : string;
  rarity          : number;

  primaryType     : any;
  secondaryType   : any;

  fastMoves       : any;
  chargeMoves     : any;

  candyToEvolve   : number;
  buddyDistance   : number;

  // Stats
  baseAttack      : number;
  baseDefense     : number;
  baseStamina     : number;

  // Encounter
  baseCaptureRate : number;
  baseFleeRate    : number;
  cameraDistance  : number;

  constructor(props : any) {
    super(props);
    
    const Library        = LibraryService.getInstance();
    const data           = props.data;
    
    this.id              = data.id;
    this.name            = data.name;
    this.identifier      = data.identifier;
    this.rarity          = data.rarity;

    const length         = this.id.toString().length;
    this.number          = length === 3 ?
      this.id.toString() : new Array(3 - length + 1).join('0') + this.id;
    
    // Types
    this.primaryType     = Library.getType(data.type);
    this.secondaryType   = data.type_2 ? Library.getType(data.type_2) : null;
    
    // Moves
    const getMoveData    = (id : string) => Library.getMove(id);
    const moveSort       = (a : any, b : any) => a.power - b.power;
    this.fastMoves       = data.quick_moves.map(getMoveData).sort(moveSort);
    this.chargeMoves     = data.cinematic_moves.map(getMoveData).sort(moveSort);
   
    this.candyToEvolve   = data.candy_to_evolve;
    this.buddyDistance   = data.km_buddy_distance;
    
    // Stats
    const stats          = data.stats;
    this.baseAttack      = stats.base_attack;
    this.baseDefense     = stats.base_defense;
    this.baseStamina     = stats.base_stamina;
    
    // Encounter
    const encounter      = data.encounter;
    this.baseCaptureRate = encounter.base_capture_rate;
    this.baseFleeRate    = encounter.base_flee_rate;
    this.cameraDistance  = encounter.camera_distance;
  }

  render() {
    // Stats
    const statItems = [
      {
        label : "Capture Rate",
        value : ('' + Math.floor(this.baseCaptureRate * 100) + '%'),
      }, {
        label : "Flee Rate",
        value : ('' + Math.floor(this.baseFleeRate * 100) + '%'),
      }, {
        label : "Buddy Distance",
        value : ('' + this.buddyDistance + " km"),
      },
    ];
    const stats = statItems.map((item : any, index: number) => {
      return (
        <div key={index} className="pokedex-stat">
          <span className="pokedex-stat__label">{item.label}</span>
          <span className="pokedex-stat__value">{item.value}</span>
        </div>
      )
    });

    // Moves
    const createMoveElement = (move : any) => {
      return (
        <div key={move.id} className="pokemon__content--move mdc-typography--subheading1">
          <Move data={move} />
        </div>
      )
    };
    const fastMoves   = this.fastMoves.map(createMoveElement);
    const chargeMoves = this.chargeMoves.map(createMoveElement);

    return (
      <div className="pokemon mdc-elevation--z1">
        <div className="pokemon__main-stats">
          <div className="pokemon__main-stats--type mdc-elevation--z2">
            <Type primary={this.primaryType} secondary={this.secondaryType} />
          </div>
          <div className="pokemon__main-stats--cp mdc-elevation--z2 mdc-typography--subheading1">
            #{this.number}
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
            <Stat label="Attack" value={this.baseAttack} />
            <div className="divider--vertical"></div>
            <Stat label="Defense" value={this.baseDefense} />
            <div className="divider--vertical"></div>
            <Stat label="Stamina" value={this.baseStamina} />
          </div>
          <div className="pokedex-stats">
            {stats}
          </div>
          <div className="pokedex-moves">
            <h3 className="mdc-typography--subheading2">Fast Moves</h3>
            {fastMoves}
          </div>
          <div className="pokedex-moves">
            <h3 className="mdc-typography--subheading2">Charge Moves</h3>
            {chargeMoves}
          </div>
        </div>
      </div>
    );
  }

}