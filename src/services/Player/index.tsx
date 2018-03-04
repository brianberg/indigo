import * as player from "../../../data/player";

export default class PlayerService {

  private static instance : PlayerService;

  private data : any = player.player_data;

  private constructor() {}

  static getInstance() : PlayerService {
    if (!PlayerService.instance) {
      PlayerService.instance = new PlayerService;
    }
    return PlayerService.instance;
  }

  get() : any {
    return this.data;
  }

}