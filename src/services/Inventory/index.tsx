import * as inventory from "../../../data/inventory";

export default class InventoryService {

  private static instance : InventoryService;

  private candies       = inventory.candies;
  private eggIncubators = inventory.egg_incubators;
  private eggs          = inventory.eggs;
  private items         = inventory.items;
  private player        = inventory.player;
  private pokedex       = inventory.pokedex;
  private pokemon       = inventory.pokemon;

  private contructor() {}

  static getInstance() : InventoryService {
    if (!InventoryService.instance) {
      InventoryService.instance = new InventoryService();
    }
    return InventoryService.instance;
  }

  getCandies() : any[] {
    return this.candies;
  }

  getEggIncubators() : any[] {
    return this.eggIncubators;
  }

  getEggs() : any[] {
    return this.eggs;
  }

  getItems() : any[] {
    return this.items;
  }

  getPlayer() : any {
    return this.player;
  }
  getPokedex(skip : number = 0, limit : number = null) : any[] {
    if (limit) return this.pokedex.slice(skip, skip + limit);
    return this.pokedex.slice(skip, this.pokemon.length);
  }

  getPokemon(skip : number = 0, limit : number = null) : any[] {
    if (limit) return this.pokemon.slice(skip, skip + limit);
    return this.pokemon.slice(skip, this.pokemon.length);
  }

}