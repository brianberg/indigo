import * as pokedex from "../../../data/pokedex";

export default class PokedexService {

  private static instance : PokedexService;

  private pokedex : any = pokedex;
  private entries : any = [];

  private constructor() {
    for (let key in this.pokedex) {
      this.entries.push(this.pokedex[key]);
    }
  }

  static getInstance() : PokedexService {
    if (!PokedexService.instance) {
      PokedexService.instance = new PokedexService();
    }
    return PokedexService.instance;
  }

  getAllEntries() : any {
    return this.entries;
  }

  getPokemon(num : number) : any {
    return this.pokedex[num];
  }

}