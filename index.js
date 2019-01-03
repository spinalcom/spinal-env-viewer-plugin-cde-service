import {
  SpinalNode,
  SPINAL_RELATION_PTR_LST_TYPE
} from 'spinal-model-graph';

import {
  SpinalURL,
  SpinalAttribute
} from 'spinal-models-documentation';

class DocumentationService {
  addNote(context, parentNode, note, name) {
    // this.getContext("Note");
    console.log(context, parentNode, note, name);
  }
  removeNode(node) {
    console.log(node);
  }

  async addURL(parentNode, nameURL, URL) {
    if (
      nameURL != undefined &&
      URL != undefined &&
      URL != '' &&
      nameURL != ''
    ) {
      let myChild = new SpinalURL(nameURL, URL);

      if (parentNode instanceof SpinalNode) {
        let node = await parentNode.addChild(
          myChild,
          'hasURL',
          SPINAL_RELATION_PTR_LST_TYPE
        );
        node.info.name.set("[URL] " + nameURL)
        node.info.type.set("SpinalURL")
      } else {
        console.log('bad request add url');
      }
    }
  }

  async getURL(BIMObject) {
    const urlNodes = await BIMObject.getChildren('hasURL');
    const urls = [];

    for (let url of urlNodes) {
      let element = url.getElement();
      urls.push(
        element.then(loadedURL => {
          return {
            element: loadedURL,
            node: url,
          };
        })
      );
    }

    return Promise.all(urls);
  }

  async addAttribute(parentNode, label, value) {
    if (
      label != undefined &&
      value != undefined &&
      value != '' &&
      label != ''
    ) {
      let myChild = new SpinalAttribute(label, value);

      if (parentNode instanceof SpinalNode) {
        let node = await parentNode.addChild(
          myChild,
          'hasAttributes',
          SPINAL_RELATION_PTR_LST_TYPE
        );
        node.info.name.set("[Attributes] " + label)
        node.info.type.set("SpinalAttributes")
      }
    } else {
      console.log('bad request add attributes');
    }
  }

  async getAttributes(BIMObject) {
    const attrNodes = await BIMObject.getChildren('hasAttributes');
    const attrs = [];

    for (let attr of attrNodes) {
      let element = attr.getElement();
      attrs.push(
        element.then(loadedElement => {
          return {
            element: loadedElement,
            node: attr,
          };
        })
      );
    }

    return Promise.all(attrs);
  }
}
export const serviceDocumentation = new DocumentationService();