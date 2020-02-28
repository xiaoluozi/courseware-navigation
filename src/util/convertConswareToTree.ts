export type CoursewareTreePart = CoursewareTreeScene & {
  children: CoursewareTreeScene[];
};

export type CoursewareTreeBlock = CoursewareTreePart & {
  children: CoursewareTreePart[];
};

export type CoursewareTreeScene = CoursewareTreeElement & {
  children: CoursewareTreeElement[];
};

export type CoursewareTreeElement = ManifestBasicNode & {
  children: ManifestBasicNode[];
};

export type ManifestBasicNode = {
  name: string;
  level: string;
  type: string;
  title: string;
  parent: string | null;
  children: string[] | null;
};

export interface CoursewareTree {
  children: CoursewareTreeBlock[];
}

function getPart(Manifests: Array<ManifestBasicNode>, key: string) {
  return Manifests.filter(p => {
    return p.level === "PART" && p.name === key;
  })[0];
}

function getScene(Manifests: Array<ManifestBasicNode>, key: string) {
  return Manifests.filter(p => {
    return p.level === "SCENE" && p.name === key;
  })[0];
}

function getElement(Manifests: Array<ManifestBasicNode>, key: string) {
  return Manifests.filter(p => {
    return p.level === "ELEMENT" && p.name === key;
  })[0];
}

function convertCoursewareToTree(manifests: Array<ManifestBasicNode>) {
  const tree: CoursewareTree = {
    children: []
  };
  manifests
    .filter(b => b.level === "BLOCK")
    .forEach(b => {
      const block: CoursewareTreeBlock = Object.assign({}, b, {
        children: []
      } as { children: CoursewareTreeBlock[] });
      b.children!.forEach(k => {
        const p = getPart(manifests, k);
        const part: CoursewareTreeBlock = Object.assign({}, p, {
          children: []
        } as {
          children: CoursewareTreeBlock[];
        });
        p.children!.forEach(k => {
          const s = getScene(manifests, k);
          const scene: CoursewareTreeBlock = Object.assign({}, s, {
            children: []
          } as {
            children: CoursewareTreeBlock[];
          });
          s.children!.forEach(k => {
            const e = getElement(manifests, k);
            const element: CoursewareTreeBlock = Object.assign({}, e, {
              children: []
            } as {
              children: CoursewareTreeBlock[];
            });
            scene.children!.push(element);
          });
          part.children!.push(scene);
        });
        block.children!.push(part);
      });
      tree.children.push(block);
    });
  return tree;
}

export default convertCoursewareToTree;
