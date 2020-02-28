import React, { PureComponent } from "react";
import { observer } from "mobx-react";

@observer
class Control extends PureComponent {
  render() {
    return <div className="content"></div>;
  }
}

export default Control;
