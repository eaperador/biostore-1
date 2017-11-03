import axios from 'axios';
import {BASE_URL} from './constants';

//Constants
const CHANGE_USER = 'CHANGE_USER';
const LOGIN_FAILED = 'LOGIN_FAILED';
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
const GET_PRODUCERS_BY_OFFER = 'GET_PRODUCERS_BY_OFFER';
const CHANGE_PRODUCT_DETAIL = 'CHANGE_PRODUCT_DETAIL';
const UPDATE_USER_POSITION = 'UPDATE_USER_POSITION';
const NOTIFICATION = 'NOTIFICATION';

export const login = (authData) => async dispatch => {
  const object = authData;
  await axios.post(BASE_URL + '/login/', object).then(response => {
    if (response.data.estado === 'ok') {
      dispatch({
        type: CHANGE_USER,
        payload: response.data.data
      });
    }
    else {
      dispatch({
        type: NOTIFICATION,
        payload: 'El servidor ha rechazado los datos.'
      });
    }
  }).catch(error => {
    dispatch({
      type: NOTIFICATION,
      payload: 'No se pudo conectar con el servidor, no se han guardado los datos.'
    });
  });
};

export const signUp = (newUser) => async dispatch => {
  const object = newUser;
  await axios.post(BASE_URL + '/user/', object).then(response => {
    if (response.data.estado === 'ok') {
      dispatch({
        type: CHANGE_USER,
        payload: object
      });
    }
    else {
      dispatch({
        type: NOTIFICATION,
        payload: 'El servidor ha rechazado los datos.'
      });
    }
  }).catch(error => {
    dispatch({
      type: NOTIFICATION,
      payload: 'No se pudo conectar con el servidor, no se han guardado los datos.'
    });
  });
};

export const addProductToCart = (product) => {
  return {
    type: ADD_PRODUCT_TO_CART,
    payload: product
  }
};

export const createOrder = (idClient, shippingAddress, delivery_at, items) => async dispatch => {
// //created_at, delivery_at, shipping_address, consumer_id, order_items, (count, offer_id)
  const object = {
    create_at: Date.now(),
    delivery_at: delivery_at,
    shipping_address: shippingAddress,
    consumer_id: 1,
    order_items: items
  };
  await axios.post(BASE_URL + '/createorder/', object).then(response => {
    if (response.data.estado === 'ok') {
      dispatch({
        type: NOTIFICATION,
        payload: 'Exitoso'
      });
    }
    else {
      dispatch({
        type: NOTIFICATION,
        payload: 'El servidor ha rechazado los datos.'
      });
    }
  }).catch(error => {
    //console.log(error);
    dispatch({
      type: NOTIFICATION,
      payload: 'No se pudo conectar con el servidor, no se han guardado los datos.'
    });
  });
};

export const getProducersByOffer = (idOffer) => async dispatch => {
  const object = idOffer;
  await axios.post(BASE_URL + '/producersById/', object).then(response => {
    if (response.data.estado === 'ok') {
      dispatch({
        type: GET_PRODUCERS_BY_OFFER,
        payload: response.data
      });
    }
    else {
      dispatch({
        type: NOTIFICATION,
        payload: 'El servidor ha rechazado los datos.'
      });
    }
  }).catch(error => {
    dispatch({
      type: NOTIFICATION,
      payload: 'No se pudo conectar con el servidor, no se han guardado los datos.'
    });
  });
};

export const updateUserPosition = () => async dispatch => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  await window.navigator.geolocation.watchPosition((position => {
        let newPosition = {lat: position.coords.latitude, lng: position.coords.longitude};
        dispatch({
          type: UPDATE_USER_POSITION,
          payload: newPosition
        });
        console.log(position);
      }),
      ((error) => {
        console.log(error);
        dispatch({
          type: NOTIFICATION,
          payload: 'No se ha podido acceder a la ubicación:'+error
        });
      }),
      options);
};

export const changeProductDetail = (newProduct) => {
  return {
    action: CHANGE_PRODUCT_DETAIL,
    payload: newProduct
  }
};

//Reducer's Initial state
const INITIAL_STATE = {
  user: null,
  userPosition:null,
  cart: {
    products: []
  },
  productDetail: {
    producers: []
  },
};
//Reducer
export default function common(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_USER: {
      //console.log('user',action.payload);
      return {...state, user: action.payload};
    }
    case ADD_PRODUCT_TO_CART:
      return Object.assign({}, state, {cart: {products: [...state.cart.products, action.payload]}});
    case GET_PRODUCERS_BY_OFFER: {
      let newProductDetail = Object.assign({}, state.productDetail);
      newProductDetail.producers = action.payload;
      return {...state, productDetail: newProductDetail};
    }
    case CHANGE_PRODUCT_DETAIL: {
      return {...state, productDetail: action.payload};
    }
    case UPDATE_USER_POSITION: {
      return {...state, userPosition: action.payload};
    }
    case NOTIFICATION: {
      return state;
    }
    default:
      return state;
  }
};
