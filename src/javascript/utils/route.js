import overview from "../screen/overview";
import account from "../screen/account";
import transaction from "../screen/transaction";
import address from "../screen/address";
import bill from "../screen/bill";

const route = (state) => {
  switch (state.screen) {
    case "accounts":
    case "settings":
      overview(state);
      break;
    case "account":
      account(state);
      break;
    case "transaction":
      transaction(state);
      break;
    case "address":
      address(state);
      break;
    case "bill":
      bill(state);
      break;
  }
};

export default route;
