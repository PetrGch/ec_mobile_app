import {Provider} from "react-redux";
import { Navigation } from "react-native-navigation";

import {goToExCurrency} from "./src/router/exCurrency";
import configureStore from "./src/store/configureStore";
import ExCurrencyOfficeContainer from "./src/screen/ExCurrencyOffice/ExCurrencyOfficeContainer";
import ExCurrencyRateContainer from "./src/screen/ExCurrencyRate/ExCurrencyRateContainer";
import ExCurrencyOfficeInfoContainer from "./src/screen/ExCurrencyOfficeInfo/ExCurrencyOfficeInfoContainer";
import ExCurrencyHomeContainer from "./src/screen/ExCurrencyHome/ExCurrencyHomeContainer";

const store = configureStore();

// Register component
Navigation.registerComponentWithRedux("excurrate.exCurrencyHome", () => ExCurrencyHomeContainer, Provider, store);
Navigation.registerComponentWithRedux("excurrate.exCurrencyList", () => ExCurrencyRateContainer, Provider, store);
Navigation.registerComponentWithRedux("excurrate.exCurrencyOffice", () => ExCurrencyOfficeContainer, Provider, store);
Navigation.registerComponentWithRedux("excurrate.exCurrencyOfficeInfo", () => ExCurrencyOfficeInfoContainer, Provider, store);
// Navigation.registerComponentWithRedux("udemy.findPlaceScreen", () => FindPlace, Provider, store);
// Navigation.registerComponentWithRedux("udemy.placeDetailScreen", () => PlaceDetail, Provider, store);
// Navigation.registerComponentWithRedux("udemy.sideDrawerScreen", () => SideDrawer, Provider, store);

// Start App
Navigation.events().registerAppLaunchedListener(() => {
  goToExCurrency()
});
