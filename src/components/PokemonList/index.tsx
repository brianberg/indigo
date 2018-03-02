import * as React  from "react";

import { Pokemon } from "../Pokemon";

import "./styles.scss";

interface Fields {
  [key : string] : any,
}

export class PokemonList extends React.Component<any, {}> {

  state : any = {
    sort     : null,
    pokemon  : [],
    sortOpen : false,
  };

  private fields : Fields = {
    creation_time_ms : {
      label      : "Recent",
      icon       : <i className="material-icons">schedule</i>,
      comparator : (a : any, b : any) => {
        return this.numberComparator("creation_time_ms", a, b, true);
      },
    },
    cp : {
      label      : "CP",
      icon       : <span className="sort-text-icon">CP</span>,
      comparator : (a : any, b : any) => {
        return this.numberComparator("cp", a, b, true);
      },
    },
    // TODO
    // iv : {
    //   label      : "IV",
    //   comparator : (a : any, b : any) => {
    //     return numComparator("iv", a, b, true);
    //   },
    // },
    // name : {
    //   label      : "Name",
    //   comparator : (a : any, b : any) => {
    //     return strComparator("name", a, b);
    //   },
    // },
    pokemon_id : {
      label      : "Number",
      icon       : <span className="sort-text-icon">#</span>,
      comparator : (a : any, b : any) => {
        return this.numberComparator("pokemon_id", a, b, false);
      },
    },
  };

  constructor(props : any) {
    super(props);
    const sortBy       = props.sortBy ? props.sortBy : "creation_time_ms";
    const sort         = this.fields[sortBy];
    this.state.sort    = sort;
    this.state.pokemon = props.data.sort(sort.comparator);
  }

  render() {
    const pokemon = this.state.pokemon;
    const tiles   = pokemon.map((mon : any) => {
      return (
        <li key={mon.id} className="mdc-grid-tile">
          <Pokemon data={mon} />
        </li>
      );
    });

    let sortOptions = [];
    for (let key in this.fields) {
      let field = this.fields[key];
      sortOptions.push(
        <button
            key={key}
            className="mdc-fab mdc-fab--mini"
            aria-label="Sort"
            onClick={() => this.sortBy(key)}
            >
          {field.icon}
        </button>
      );
    }

    const closeIcon = <i className="material-icons">close</i>

    return (
      <div className="pokemon-list">
        <div className="mdc-grid-list">
          <ul className="mdc-grid-list__tiles">{tiles}</ul>
        </div>
        <div className="mdc-menu-anchor">
          <button
              className="mdc-fab"
              aria-label="Sort"
              onClick={() => this.toggleMenu()}
              >
            <span className="mdc-fab__icon">
              {this.state.sortOpen ? closeIcon : this.state.sort.icon}
            </span>
          </button>
          {
            this.state.sortOpen ?
              <div className="fab-speed-dial">{sortOptions}</div> :
              null
          }
        </div>
      </div>
    );
  }

  private sortBy(field : string) {
    const pokemon = this.state.pokemon;
    const sort    = this.fields[field];
    const sorted  = pokemon.sort(sort.comparator);
    this.setState({
      sort     : sort,
      pokemon  : sorted,
      sortOpen : false
    });
  }

  private toggleMenu() {
    this.setState({
      sortOpen : !this.state.sortOpen,
    });
  }

  private getFabClass() {
    return "mdc-fab" + (this.state.sortOpen ? " mdc-fab--mini" : ''); 
  }

  private getSortMenuClass() {
    return "mdc-menu" + (this.state.sortOpen ? " mdc-menu--open" : '');
  }

  private stringComparator(field : string, a : any, b :any, reverse : boolean) : number {
    const fieldA = a[field];
    const lowerA = a[field].toLowerCase();
    const lowerB = b[field].toLowerCase();
    if (lowerA < lowerB) return reverse ? 1 : -1;
    if (lowerA > lowerB) return reverse ? -1 : 1;
    return 0;
  }

  private numberComparator(field : string, a : any, b :any, desc : boolean) : number {
    if (desc) return b[field] - a[field];
    return a[field] - b[field];
  };

}
