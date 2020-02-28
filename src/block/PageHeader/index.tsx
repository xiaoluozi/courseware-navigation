import React, { PureComponent } from "react";
import { Row, Col } from "antd";
import { observer } from "mobx-react";
import Menu from "./Menu";
import Buttons from "./Buttons";
import { LOGO_PATH } from "../../constant";

@observer
class PageHeader extends PureComponent {
  render() {
    return (
      <Row type="flex" justify="space-between">
        <Col>
          <Row type="flex" align="middle" gutter={24}>
            <Col>
              <img src={LOGO_PATH} height={36} alt="火花思维"></img>
            </Col>
            <Col>
              <Menu />
            </Col>
          </Row>
        </Col>
        <Col>
          <Row gutter={24} type="flex" align="middle">
            <Buttons />
          </Row>
        </Col>
      </Row>
    );
  }
}

export default PageHeader;
