import * as React from "react";

import LibraryService from "../../services/Library";

import { PokemonImage } from "../PokemonImage";
import { BarStat }      from "../BarStat";
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

  buddyDistance   : number;
  avgHeight       : number;
  avgWeight       : number;
  
  // TODO
  // region          : string;
  // species         : string;
  // habitat         : string;
  // description     : string; 

  description     : string; 
  primaryType     : any;
  secondaryType   : any;

  fastMoves       : any;
  chargeMoves     : any;

  candyToEvolve   : number;

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

    this.buddyDistance   = data.km_buddy_distance;
    this.avgHeight       = data.pokedex_height_m;
    this.avgWeight       = data.pokedex_weight_kg;

    // TODO
    // this.region          = data.region || "???";
    // this.species         = data.species || "???";
    // this.habitat         = data.habitat || "???";
    // this.description     = data.flavor_text || "???";

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
    const createStatElement = (item : any, index : number) => {
      return (
        <div key={index} className="pokedex-stat">
          <span className="pokedex-stat__label">{item.label}</span>
          <span className="pokedex-stat__value">{item.value}</span>
        </div>
      );
    };
    const createMoveElement = (move : any) => {
      return (
        <div key={move.movement_id} className="mdc-typography--subheading1">
          <Move data={move} />
        </div>
      )
    };

    // Average Size
    const generalStats = [
      {
        label: "Type",
        value: (
          <Type primary={this.primaryType} secondary={this.secondaryType} />
        )
      }, {
        label : "Height",
        value : `${this.avgHeight.toFixed(1)} m`,
      }, {
        label : "Weight",
        value : `${this.avgWeight.toFixed(1)} kg`,
      }
    ].map(createStatElement);

    // Encounter stats
    const encounterStats = [
      {
        label : "Capture Rate",
        value : `${Math.floor(this.baseCaptureRate * 100)}%`,
      }, {
        label : "Flee Rate",
        value : `${Math.floor(this.baseFleeRate * 100)}%`,
      }, {
        label : "Buddy Distance",
        value : `${this.buddyDistance} km`,
      },
    ].map(createStatElement);

    // Moves
    const fastMoves   = this.fastMoves.map(createMoveElement);
    const chargeMoves = this.chargeMoves.map(createMoveElement);

    return (
      <div className="pokedex-entry mdc-elevation--z1">
        <div className="pokemon-overview">
          <div className="pokemon-image">
            <PokemonImage pokemonId={this.id}/>
          </div>
          <div className="mdc-card pokemon-info">
            <h2 className="pokemon-name">
              {this.name}
              <small className="pokemon-number">
                #{this.number}
              </small>
            </h2>
          </div>
        </div>
        <div className="mdc-card pokemon-details">
          <div className="pokemon-base-stats">
            <BarStat name="Attack" value={this.baseAttack} max={300} />
            <BarStat name="Defense" value={this.baseDefense} max={300} />
            <BarStat name="Stamina" value={this.baseStamina} max={300} />
          </div>
          <div className="mdc-grid-list">
            <ul className="mdc-grid-list__tiles">
              <li className="mdc-grid-tile">
                <h3>General</h3>
                {generalStats}
              </li>
              <li className="mdc-grid-tile">
                <h3>Encounter</h3>
                {encounterStats}
              </li>
              <li className="mdc-grid-tile">
                <div className="pokedex-moves">
                  <h3>Fast Moves</h3>
                  {fastMoves}
                </div>
              </li>
              <li className="mdc-grid-tile">
                <div className="pokedex-moves">
                  <h3>Charge Moves</h3>
                  {chargeMoves}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

}