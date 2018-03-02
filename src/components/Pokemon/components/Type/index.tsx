import * as React from "react";

import "./styles.scss";

export class Type extends React.Component<any, {}> {

  size      : number = 24;
  primary   : any;
  secondary : any;

  constructor(props : any) {
    super(props);
    if (props.size) this.size = props.size;
    this.primary   = props.primary;
    this.secondary = props.secondary;
  }

  render() {
    const primaryIcon   = buildIconElement(this.primary, this.size);
    const secondaryIcon = buildIconElement(this.secondary, this.size);
    const icons         = secondaryIcon ? 
      [primaryIcon, secondaryIcon] :
      primaryIcon;
    return (
      <div className="pokemon-type">
        {icons}
      </div>
    );

    function buildIconElement(type : any, size : number) {
      if (!type) return null;
      const imageSrc = `./src/assets/types/type_${type.name}.png`;
      return (
        <img key={type.attack_type}
             src={imageSrc}
             height={size}
             width={size}/>
      );
    }
  }

}
