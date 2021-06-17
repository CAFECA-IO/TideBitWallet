// https://developers.google.com/web/fundamentals/web-components/customelements
class ScaffoldElement extends HTMLElement {
  // Can define constructor arguments if you wish.
  constructor() {
    // If you define a constructor, always call super() first!
    // This is specific to CE and required by the spec.
    super();
  }
  connectedCallback() {
    console.log("connectedCallback");
    this.className = "scaffold";
    // create an element with some default HTML:
    this.innerHTML = `
    <header></header>
    <main></main>
    <footer></footer>
    `;
    if (this.header) this.header.render(this.children[0]);
    if (this.body) {
      if (Array.isArray(this.body)) {
        this.body.forEach((element) => element.render(this.children[1]));
      } else {
        this.body.render(this.children[1]);
      }
    }
    if (this.footer) this.footer.render(this.children[2]);
  }
  updateHeader(newHeader) {
    this.header = newHeader;
    this.children[0].replaceChild();
    this.header.render(this.children[0]);
  }
  updateBody(newBody) {
    this.body = newBody;
    this.children[1].replaceChild();
    this.body.render(this.children[1]);
  }
  updateFooter(newFooter) {
    this.footer = newFooter;
    this.children[2].replaceChild();
    this.footer.render(this.children[2]);
  }
}

customElements.define("scaffold-widget", ScaffoldElement);

class Scaffold {
  constructor(header, body, footer) {
    this.element = document.createElement("scaffold-widget");
    this.element.header = header;
    this.element.body = body;
    this.element.footer = footer;
    document.body.replaceChildren();
    document.body.insertAdjacentElement("afterbegin", this.element);
  }
  // render(parentElement) {
  //   parentElement.replaceChildren();
  //   parentElement.insertAdjacentElement("afterbegin", this.element);
  // }
  // updateHeader(newHeader) {
  //   this.element.updateHeader(newHeader);
  // }
  // updateBody(newBody) {
  //   this.element.updateBody(newBody);
  // }
  // updateFooter(newFooter) {
  //   this.element.updateFooter(newFooter);
  // }
}

export default Scaffold;
