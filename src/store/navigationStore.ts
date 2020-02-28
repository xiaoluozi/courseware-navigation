import { observable, action, computed } from "mobx";
import { bind } from "lodash-decorators";
import {
  CoursewareTree,
  ManifestBasicNode
} from "../util/convertConswareToTree";
import { jumpElement, resetState } from "../util/events";

class NavigationStore {
  @observable navigation?: CoursewareTree;
  @observable element = "";
  @observable elements: Array<string> = [];

  @bind @action setElement(element: string) {
    this.element = element;
    jumpElement(element);
  }

  @computed get currentElement() {
    return this.element || this.elements[0];
  }

  @computed get hasNext() {
    const index = this.elements.indexOf(this.currentElement);
    return index < this.elements.length - 1 && index > -1;
  }

  @computed get hasPrev() {
    const index = this.elements.indexOf(this.currentElement);
    return index > 0;
  }

  @bind @action nextElement() {
    const index = this.elements.indexOf(this.currentElement);
    this.element = this.elements[index + 1];
    jumpElement(this.element);
  }

  @bind @action prevElement() {
    const index = this.elements.indexOf(this.currentElement);
    this.element = this.elements[index - 1];
    jumpElement(this.element);
  }

  @bind @action resetState() {
    resetState();
  }

  @bind @action setElements(elements: ManifestBasicNode[]) {
    this.elements = elements
      .filter(element => {
        return element.level === "ELEMENT";
      })
      .map(e => {
        return e.name;
      });
  }

  @bind @action setNavigation(navigation: CoursewareTree) {
    this.navigation = navigation;
  }
}

export default NavigationStore;
