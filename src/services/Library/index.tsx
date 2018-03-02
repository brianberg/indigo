import { items, moves, types } from "../../../data/library";

export class LibraryService {

  getItem(id : string) : any {
    return items[id];
  }

  getMove(id : string) : any {
    return moves[id];
  }

  getType(id : string) : any {
    return types[id];
  }
  
}