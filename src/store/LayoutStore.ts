import { action, observable } from "mobx";
import { create, persist } from "mobx-persist";

import { localStorage } from "../util/storage";

class LayoutStore {
  @observable layouting = false;

  @persist @observable splitSize = 400;

  @action.bound
  setSplit(size: number) {
    this.splitSize = size;
  }

  @action.bound
  start() {
    this.layouting = true;
  }

  @action.bound
  end() {
    this.layouting = false;
  }
}
const layoutStore = new LayoutStore();

create({
  storage: localStorage,
  debounce: 500
})("courseware-dev-room:layoutStore", layoutStore);

export { layoutStore };
export default LayoutStore;
