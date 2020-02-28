import React, { PureComponent } from "react";
import { Menu as AntdMenu } from "antd";
import { inject, observer } from "mobx-react";
import navigationStore from "../../store/navigationStore";
import convertCoursewareToTree, {
  CoursewareTreeBlock,
  CoursewareTreePart,
  CoursewareTreeScene,
  CoursewareTreeElement
} from "../../util/convertConswareToTree";

const { SubMenu, Item, ItemGroup } = AntdMenu;

interface Props {
  navigationStore?: navigationStore;
}

@inject("navigationStore")
@observer
class Menu extends PureComponent<Props> {
  componentDidMount() {
    const _this = this;
    window.addEventListener(
      "message",
      function(e) {
        if (!e.data.children) {
          return;
        }
        const { setNavigation, setElements } = _this.props.navigationStore!;
        setElements(e.data.children);
        setNavigation(convertCoursewareToTree(e.data.children));
      },
      false
    );
  }
  private to(name: string) {
    const { setElement } = this.props.navigationStore!;
    setElement(name);
  }
  private renderElement(elements: CoursewareTreeElement[]) {
    return elements.map(element => (
      <Item key={element.name} onClick={() => this.to(element.name)}>
        {`${element.title}(${element.name.replace(/^.*-/, "")})`}
      </Item>
    ));
  }
  private renderScene(scenes: CoursewareTreeScene[]) {
    return scenes.map(scene => (
      <ItemGroup
        title={`${scene.title}(${scene.name.replace(/^.*-/, "")})`}
        key={scene.name}
      >
        {this.renderElement(scene.children)}
      </ItemGroup>
    ));
  }
  private renderPart(parts: CoursewareTreePart[]) {
    return parts.map(part => (
      <SubMenu
        title={`${part.title}(${part.name.replace(/^.*-/, "")})`}
        key={part.name}
      >
        {this.renderScene(part.children)}
      </SubMenu>
    ));
  }
  private renderBlock(blocks: CoursewareTreeBlock[]) {
    return blocks.map(block => (
      <SubMenu
        title={`${block.title}(${block.name.replace(/^.*-/, "")})`}
        key={block.name}
      >
        {this.renderPart(block.children)}
      </SubMenu>
    ));
  }
  render() {
    const { navigation, currentElement } = this.props.navigationStore!;
    if (!navigation) return null;
    return (
      <AntdMenu mode="horizontal" theme="dark" selectedKeys={[currentElement]}>
        {this.renderBlock(navigation.children)}
      </AntdMenu>
    );
  }
}

export default Menu;
