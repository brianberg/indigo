import * as library from "../../../data/library";

export default class LibraryService {

  private static instance : LibraryService;

  private items : any = library.items;
  private moves : any = library.moves;
  private types : any = library.types;

  private constructor() {}

  static getInstance() : LibraryService {
    if (!LibraryService.instance) {
      LibraryService.instance = new LibraryService();
    }
    return LibraryService.instance;
  }

  getItem(id : string) : any {
    return this.items[id];
  }

  getMove(id : string) : any {
    return this.moves[id];
  }

  getType(id : string) : any {
    return this.types[id];
  }
  
}