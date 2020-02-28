import React, { PureComponent } from "react";
import { inject, observer } from "mobx-react";
import { Button } from "antd";
import { bind } from "lodash-decorators";
import ButtonGroup from "antd/lib/button/button-group";
import navigationStore from "../../store/navigationStore";

interface Props {
  navigationStore?: navigationStore;
}

@inject("navigationStore")
@observer
class Buttons extends PureComponent<Props> {
  componentDidMount() {}

  @bind
  private reset() {
    const { resetState } = this.props.navigationStore!;
    resetState();
  }

  render() {
    const navigationStore = this.props.navigationStore!;
    const { hasNext, hasPrev, nextElement, prevElement } = navigationStore;
    return (
      <ButtonGroup className="button-group">
        <Button
          onClick={prevElement}
          icon="left"
          shape="round"
          disabled={!hasPrev}
          ghost
        />
        <Button onClick={this.reset} icon="undo" shape="round" ghost />
        <Button
          onClick={nextElement}
          icon="right"
          shape="round"
          disabled={!hasNext}
          ghost
        />
      </ButtonGroup>
    );
  }
}

export default Buttons;
