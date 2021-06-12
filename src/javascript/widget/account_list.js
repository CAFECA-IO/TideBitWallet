import AccountItem from "./account_item";

customElements.define("account-item", AccountItem);

const accountList = (state) => {
  const accountList = document.createElement("div");
  accountList.className = "account-list";
  state.user.accounts.forEach((account) => {
    const accountItem = document.createElement("account-item");
    accountItem.child = {
      state: state,
      account: account,
    };
    accountList.insertAdjacentElement("beforeend", accountItem);
  });
  return accountList;
};

export default accountList;
