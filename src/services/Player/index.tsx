import * as player from "../../../data/player";

export class PlayerService {

  get() : any {
    return player.player_data;
  }

}