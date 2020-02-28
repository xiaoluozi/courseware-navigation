import { inject, observer } from "mobx-react";

import { RouteComponentProps } from "react-router";
import { Layout } from "antd";
import PageHeader from "../block/PageHeader";
import React from "react";
import LayoutStore from "../store/LayoutStore";

interface Props extends RouteComponentProps {
  layoutStore?: LayoutStore;
}

@inject("layoutStore")
@observer
class Index extends React.Component<Props> {
  componentWillReceiveProps(props: Props) {}
  componentWillMount() {}

  componentDidMount() {}

  render() {
    return (
      <Layout className="indexpage">
        <Layout.Header className="header">
          <PageHeader />
        </Layout.Header>
      </Layout>
    );
  }
}

export default Index;
