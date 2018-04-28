import * as pokedex from "../../../data/pokedex";

export default class PokedexService {

  private static instance : PokedexService;

  private pokemon  : any = pokedex.pokemon;
  private families : any = pokedex.families;
  private entries  : any = [];

  private constructor() {
    for (let key in this.pokemon) {
      this.entries.push(this.pokemon[key]);
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
    return this.pokemon[num];
  }

  getFamily(num : number) : any[] {
    return this.families[num];
  }

}