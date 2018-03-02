import * as pokedex from "../../../data/pokedex";

export class PokedexService {

  entries : any = [];

  constructor() {
    for (let key in pokedex) {
      this.entries.push(pokedex[key]);
    }
  }

  getAllEntries() : any {
    return this.entries;
  }

  getPokemon(num : number) : any {
    return pokedex[num];
  }

}