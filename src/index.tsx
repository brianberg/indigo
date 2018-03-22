import * as React    from "react";
import * as ReactDOM from "react-dom";

import { App }       from "./App";

render();

// TODO add hot loader support
// if (module.hot) {
//   module.hot.accept("./App", render);
// }

function render() {
  ReactDOM.render(
    <App />,
    document.getElementById("root")
  );
}