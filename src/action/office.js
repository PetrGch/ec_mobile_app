import {uiStartLoading, uiStopLoading} from "./ui";
import {SELECT_CURRENCY_TYPE, SET_ALL_OFFICES, SET_CURRENCY_AMOUNT} from "../constant/office";
import {prepopulateCurrencyType} from "./actionCalculation";

function setAllOffices(offices) {
  return {
    offices,
    type: SET_ALL_OFFICES,
    currencyTypes: prepopulateCurrencyType(offices)
  }
}

export function getAllOffices() {
  return (dispatch) => {
    dispatch(uiStartLoading());

    fetch("https://api.excurrate.com/exCompany")
      .then((response) => response.json(), (ex) => new Error(ex))
      .then((offices) => {
        dispatch(setAllOffices(offices))
      })
      .catch((ex) => {
        alert(ex.message)
      })
      .finally(() => {
        dispatch(uiStopLoading());
      })
  }
}

export function selectCurrencyType(currencyType) {
  return {
    currencyType,
    type: SELECT_CURRENCY_TYPE,
  }
}

export function setCurrencyAmount(currencyAmount) {
  return {
    currencyAmount,
    type: SET_CURRENCY_AMOUNT,
  }
}

// export function addPlace(placeName, location, image) {
//   return (dispatch) => {
//     dispatch(uiStartLoading());
//
//     dispatch(authGetToken())
//       .then((token) => {
//         return fetch("https://us-central1-udemyreactnative-227214.cloudfunctions.net/storeImage", {
//           method: "POST",
//           body: JSON.stringify({
//             image: image.base64
//           }),
//           headers: {
//             "Authorization": `Bearer ${token}`
//           }
//         })
//           .then((res) => res.json())
//           .then((data) => {
//             const placeData = {
//               placeName,
//               location,
//               image: data.imageUrl
//             };
//
//             return fetch(`https://udemyreactnative-227214.firebaseio.com/places.json?auth=${token}`, {
//               method: "POST",
//               body: JSON.stringify(placeData)
//             })
//           })
//           .then((res) => res.json())
//           .then((data) => {
//             console.log(data);
//             dispatch(placeAdded());
//           })
//           .catch((ex) => {
//             console.log(ex);
//           })
//       })
//       .catch(() => {
//         alert("No valid token found!");
//       })
//       .finally(() => {
//         dispatch(uiStopLoading());
//       })
//   }
// }
//
// export function placeAdded() {
//   return {
//     type: PLACE_ADDED
//   }
// }
//
// export function startAddPlace() {
//   return {
//     type: START_ADD_PLACE
//   }
// }
//
// export function setPlaces(places) {
//   return {
//     places,
//     type: SET_PLACES
//   }
// }
//
// export function getPlaces() {
//   return (dispatch) => {
//     dispatch(uiStartLoading());
//
//     dispatch(authGetToken())
//       .then((token) => {
//         return fetch(`https://udemyreactnative-227214.firebaseio.com/places.json?auth=${token}`)
//       })
//       .catch(() => {
//         alert("No valid token found!");
//       })
//       .then((res) => res.json())
//       .then((placesRes) => {
//         const places = [];
//         for (let key in placesRes) {
//           places.push({
//             ...placesRes[key],
//             image: {
//               uri: placesRes[key].image
//             },
//             id: key,
//             key
//           })
//         }
//         dispatch(setPlaces(places))
//       })
//       .catch((ex) => {
//         console.log(ex);
//       })
//       .finally(() => {
//         dispatch(uiStopLoading());
//       })
//   }
// }
//
// export function deletePlace(placeId) {
//   return (dispatch) => {
//     dispatch(authGetToken())
//       .then((token) => {
//         return fetch(`https://udemyreactnative-227214.firebaseio.com/places/${placeId}.json?auth=${token}`, {
//           method: "DELETE"
//         })
//       })
//       .catch(() => {
//         alert("No valid token found!");
//       })
//       .then((res) => res.json())
//       .then(() => {
//         dispatch({
//           placeId,
//           type: DELETE_PLACE
//         });
//       })
//       .catch((ex) => {
//         console.log(ex)
//       });
//   }
// }
