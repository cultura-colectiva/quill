import {BlockEmbed} from '../blots/block';

const {warn} = console;

class Instagram extends BlockEmbed {
  static create(id) {
    const node = super.create();
    Object.assign(node.dataset, {id});

    if (typeof instgrm === 'undefined') {
      warn('There is no Instagram Library. Add it!');
      node.insertAdjacentHTML('afterbegin', '[Tuvimos problemas para desplegar el contenido: ');
      node.insertAdjacentHTML('beforeend', `<a href="https://www.instagram.com/p/${id}">${id}</a>`);
      node.insertAdjacentHTML('beforeend', ' (Aquí se desplegará)]');
      node.setAttribute('style', 'text-align:center;');
    } else {
      fetch(`https://api.instagram.com/oembed?omitscript=true&url=http://instagr.am/p/${id}/`)
      .then((r) => r.json())
      .then(({html}) => {
        node.insertAdjacentHTML('afterbegin', html);
        // eslint-disable-next-line
        instgrm.Embeds.process();
        return node;
      })
    }
    return node;
  }

  static value(domNode) {
    const {id} = domNode.dataset;
    return id;
  }
}

Instagram.blotName = 'instagram';
Instagram.className = 'ql-instagram';
Instagram.tagName = 'DIV';

export default Instagram;
