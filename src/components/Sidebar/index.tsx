import * as React  from "react";

import "./styles.scss";

interface Items {
  [key : string] : any,
}

export class Sidebar extends React.Component<any, {}> {

  items : Items = {
    pokemon : {
      label : "Pokemon",
      icon  : (
        <svg className="pokemon-icon">       
          <image xlinkHref="./src/assets/pokemon.svg" />    
        </svg>
      )
    },
    items : {
      label : "Items",
      icon  : (
        <svg className="bag-icon">       
          <image xlinkHref="./src/assets/bag.svg" />    
        </svg>
      )
    },
    pokedex : {
      label : "Pokedex",
      icon  : (
        <svg className="pokedex-icon">       
          <image xlinkHref="./src/assets/pokedex.svg" />    
        </svg>
      )
    },
  };

  state : any = {
    selected : "pokemon"
  }

  constructor(props : any) {
    super(props);
    if (props.selected) {
      this.state.selected = props.selected;
    }
  }

  onClick(key : string) {
    this.setState({
      selected : key,
    });
    this.props.handleClick(key);
  }

  render() {
    let items = []
    for (let key in this.items) {
      let item = this.items[key];
      let classes = "mdc-fab";
      if (key == this.state.selected) classes += " active";
      items.push(
        <button
            key={key}
            className={classes}
            aria-label={item.label}
            onClick={() => this.onClick(key)}
            >
          <span className="mdc-fab__icon">{item.icon}</span>
        </button>
      );
    }
    return (
      <div className="sidebar">
        <nav className="sidebar__content mdc-elevation--z2">
          {items}
        </nav>
      </div>
    );
  }

}