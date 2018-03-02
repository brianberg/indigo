import * as React from "react";

import { PlayerService } from "../../services/Player";

import "./styles.scss";

const Player = new PlayerService();

export class Toolbar extends React.Component<any, {}> {

  render() {
    const player = Player.get();
    return (
      <header className="app-toolbar mdc-toolbar mdc-elevation--z3">
        <div className="mdc-toolbar__row">
          <section className="mdc-toolbar__section mdc-toolbar__section--align-start">
            <span className="mdc-toolbar__title">Title</span>
          </section>
          <section className="mdc-toolbar__section mdc-toolbar__section--align-end">
            <button className="mdc-button username">
             {player.username}
            </button>
          </section>
        </div>
      </header>
    );
  }

}