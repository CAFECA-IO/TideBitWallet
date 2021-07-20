import viewController from "../controller/view";
import Button from "../widget/button";
class ThirdPartySigninContainerElement extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.className = "third-party-signin";
    this.innerHTML = `
    <div class="third-party-signin__logo"></div>
    <div class="third-party-signin__logo-text">${this.version}</div>
    <div class="third-party-signin__action">
        <div id="googleid-signin" class="third-party-signin__button">
            <div class="third-party-signin__icon">
                <img src='./image/btn_google_light_normal_ios.svg'/>
            </div>
            <div class="third-party-signin__text">Sign in with Google</div>
        </div>
        <div id="appleid-signin" class="third-party-signin__button signin-button" data-color="${this.colorMode}" data-border="true" data-type="sign-in"></div>
    </div>
    `;
    this.googleSignInButton = this.children[2].children[0];
    this.appleSignInButton = this.children[2].children[1];
    this.googleSignInButton.addEventListener("click", async () => {
      this.parent?.openPopover("loading");
      const response = await this.callback();
      if (!response[0]) this.parent?.openPopover("error");
    });
    this.mnemonicButton = new Button(
      "Recover Wallet",
      () => viewController.route("mnemonic"),
      {
        style: ["round", "fill-primary"],
      }
    );
    this.mnemonicButton.render(this.children[2]);
  }
  disconnectedCallback() {
    this.googleSignInButton.removeEventListener("click", async () => {
      this.parent?.openPopover("loading");
      const response = await this.callback();
      if (!response[0]) this.parent?.openPopover("error");
    });
  }
}

customElements.define("third-party-signin", ThirdPartySigninContainerElement);
class ThirdPartySigninContainer {
  constructor(version, colorMode, callback, debugMode) {
    this.version = version;
    this.element = document.createElement("third-party-signin");
    this.element.colorMode = colorMode;
    this.element.version = version;
    this.element.callback = callback;
    this.element.debugMode = debugMode;
  }
  set parent(element) {
    this.element.parent = element;
    if (this.element.debugMode !== undefined) {
      this.element.parent.openPopover("loading");
      this.element.callback();
    }
  }
  render(parentElement) {
    this.parentElement = parentElement;
    parentElement.insertAdjacentElement("afterbegin", this.element);
  }
}

export default ThirdPartySigninContainer;
