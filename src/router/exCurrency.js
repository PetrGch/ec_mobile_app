import { Navigation } from "react-native-navigation";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";

{/*<i className="fas fa-search-location"></i>*/}

export const goToExCurrency = () => {
  Promise.all([
    FontAwesome.getImageSource("building", 30),
    FontAwesome5.getImageSource("money-bill", 30),
  ]).then((images) => {
    Navigation.setDefaultOptions({
      bottomTabs: {
        backgroundColor: "#69c15b"
      },
      bottomTab: {
        selectedIconColor: "#fff",
        selectedTextColor: "#fff",
        textColor: "#fff",
        iconColor: "#fff"
      }
    });
    Navigation.setRoot({
      root: {
        bottomTabs: {
          children: [
            {
              stack: {
                children: [
                  {
                    component: {
                      id: "exCurrencyList",
                      name: 'excurrate.exCurrencyList',
                      options: {
                        bottomTab: {
                          fontSize: 12,
                          text: 'Currency',
                          icon: images[1],
                        },
                        topBar: {
                          title: {
                            text: 'Exchange Rates',
                            color: "#fff"
                          },
                          background: {
                            color: "#69c15b"
                          }
                        }
                      }
                    }
                  }
                ]
              }
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      id: "exCurrencyOffice",
                      name: "excurrate.exCurrencyOffice",
                      options: {
                        bottomTab: {
                          fontSize: 12,
                          text: "Office",
                          icon: images[0]
                        },
                        topBar: {
                          title: {
                            text: "Exchange Offices",
                            color: "#fff"
                          },
                          background: {
                            color: "#69c15b"
                          }
                        }
                      }
                    }
                  }
                ],
              }
            }
          ],
        },
      },
    });
  });
};
