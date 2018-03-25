import * as React from "react";

import "./styles.scss";

export class BarStat extends React.Component<any, {}> {
  render() {
    const max = this.props.max ? this.props.max : 300;
    const barWidth = (this.props.value / max) * 100;
    const valWidth = `${max}`.length * 8;
    return (
      <div className="bar-stat">
        <span className="bar-stat__name">{this.props.name}</span>
        <div className="bar-stat__bar mdc-linear-progress">
          <div className="mdc-linear-progress__buffer"></div>
          <div
              className="mdc-linear-progress__bar mdc-linear-progress__primary-bar"
              style={{ width : `${barWidth}%` }}>
            <span className="mdc-linear-progress__bar-inner"></span>
          </div>
        </div>
        <span className="bar-stat__value" style={{ minWidth : `${valWidth}px` }}>
          {this.props.value}
        </span>
      </div>
    );
  }
}