import Vue from "vue";
import Vuex from "vuex";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isMenuOpen: false,
    isCartOpen: false,
    isPostCodePopUpOpen: false,
    voucher: {
      isApplied: false,
      discount: 0,
    },
    cart: [],
    postCodeSuggestions: [],
    location: {
      latitude: 51.529521,
      longitude: -0.6641495,
      postcode: "SL1 7BG",
      town_or_city: "Slough",
      country: "England",
      line_1: "10 The Green",
      county: "Berkshire",
      formatedAddress: "10 The Green, Burnham, Slough, Berkshire",
    },
    postCodeError: {
      type: "",
      msg: "",
    },
    details: {
      name: "asdasd",
      email: "martin1olasz@gmasdm.com",
      phone: "07517237891",
      address: "",
      pickup: {
        slot: "",
        date: "",
      },
      delivery: {
        slot: "",
        date: "",
      },
    },
  },
  mutations: {
    SET_IS_POSTCODE_POPUP_OPEN(state, payload) {
      state.isPostCodePopUpOpen = payload;
    },
    SET_VOUCHER(state, payload) {
      state.voucher.isApplied = payload.isApplied;
      state.voucher.discount = payload.discount;
    },
    SET_IS_MENU_OPEN(state) {
      state.isMenuOpen = !state.isMenuOpen;
    },
    SET_IS_CART_OPEN(state) {
      state.isCartOpen = !state.isCartOpen;
    },
    ADD_ITEM_TO_CART(state, payload) {
      state.cart.push(payload);
    },
    UPDATE_CART(state, payload) {
      state.cart = payload;
    },
    SET_LOCATION(state, payload) {
      state.location = payload;
    },
    SET_POSTCODE_ERROR(state, msg) {
      state.postCodeError = msg;
    },
    SET_DETAILS(state, payload) {
      state.details = payload;
    },
    SET_POSTCODE_SUGGESTIONS(state, payload) {
      state.postCodeSuggestions = payload;
    },
  },
  actions: {
    setVoucher({ commit }, payload) {
      payload.discount = (100 - payload.discount) / 100;
      commit("SET_VOUCHER", payload);
    },
    setisPostcodePopUpOpen({ commit }, payload) {
      commit("SET_IS_POSTCODE_POPUP_OPEN", payload);
    },
    setDetails({ commit }, payload) {
      commit("SET_DETAILS", payload);
    },
    toggleCart({ commit }) {
      commit("SET_IS_CART_OPEN");
    },
    toggleMenu({ commit }) {
      commit("SET_IS_MENU_OPEN");
    },
    loadFromsessionStorage({ commit }) {
      let items = window.sessionStorage.getItem("drisdenCart");
      if (items) {
        commit("UPDATE_CART", JSON.parse(items));
      }
    },
    saveTosessionStorage({ state }) {
      window.sessionStorage.setItem("drisdenCart", JSON.stringify(state.cart));
    },
    isSkipItemInTheCart({ state, dispatch }) {
      const isInCart = state.cart.find(
        (cartItem) => cartItem.item_name === "Skip Items"
      );
      if (isInCart) {
        dispatch("removeCartItem", isInCart);
      }
    },
    addItemToCart({ commit, state, dispatch }, item) {
      let isItemExist = state.cart.find(
        (cartItem) => cartItem.item_id == item.item_id
      );

      dispatch("isSkipItemInTheCart");
      if (isItemExist) {
        let newCart = state.cart.map((cartItem) => {
          if (cartItem.item_id == item.item_id) {
            cartItem.detergent = item.detergent;
            cartItem.quantity = item.quantity;
          }
          return cartItem;
        });
        commit("UPDATE_CART", newCart);
        dispatch("saveTosessionStorage");
      } else {
        commit("ADD_ITEM_TO_CART", item);
        dispatch("saveTosessionStorage");
      }
    },
    emptyCart({ commit, dispatch }) {
      commit("UPDATE_CART", []);
      dispatch("saveTosessionStorage");
    },
    removeCartItem({ commit, state, dispatch }, item) {
      let newCart = state.cart.filter(
        (cartItem) => cartItem.item_id != item.item_id
      );
      commit("UPDATE_CART", newCart);
      dispatch("saveTosessionStorage");
    },
    async checkPostCode({ commit }, postCode) {
      let data = new FormData();
      data.append("postcode", postCode);

      commit("SET_POSTCODE_ERROR", {});
      try {
        let res = await fetch(
          `${process.env.VUE_APP_URL}api/v1/availability/postcode`,
          {
            method: "POST",
            body: data,
          }
        );
        // TODO: Check response here
        const resp = await res.json();

        return resp;
      } catch (error) {
        const { name } = error;

        if (name === "SyntaxError") {
          commit("SET_POSTCODE_ERROR", {
            type: "error",
            msg: "Something went wrong, try again later!",
          });
          return;
        }

        commit("SET_POSTCODE_ERROR", { type: "error", msg: error.message });
      }
    },
    setPostCodeError({ commit }, msg) {
      commit("SET_POSTCODE_ERROR", msg);
    },
    validEmail(_, email) {
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    async subscribeToNewsLetter(_, email) {
      try {
        let data = new FormData();
        data.append("email", email);

        let res = await fetch(
          `${process.env.VUE_APP_URL}website/homes/subscribe`,
          {
            method: "POST",
            body: data,
          }
        );

        let d = await res.json();

        return [d, undefined];
      } catch (error) {
        return [undefined, error];
      }
    },
    async initGetAddress({ commit }, payload) {
      try {
        const resp = await fetch(
          `https://api.getAddress.io/autocomplete/${payload}?api-key=${process.env.VUE_APP_GETADDRESS_KEY}`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ all: true }),
          }
        );
        const data = await resp.json();
        const { suggestions } = data;

        if (suggestions) commit("SET_POSTCODE_SUGGESTIONS", suggestions);

        return undefined;
      } catch (error) {
        return error;
      }
    },

    async pickAddress({ commit }, { id }) {
      if (!id) return;

      try {
        const resp = await fetch(
          `https://api.getAddress.io/get/${id}?api-key=${process.env.VUE_APP_GETADDRESS_KEY} `
        );
        const data = await resp.json();

        if (data) {
          const {
            country,
            latitude,
            longitude,
            postcode,
            town_or_city,
            line_1,
            county,
            formatted_address,
          } = data;

          let location = {
            latitude,
            longitude,
            postcode,
            town_or_city,
            country,
            line_1,
            county,
            formatedAddress:
              formatted_address?.filter((data) => data !== "").join(", ") ?? [],
          };

          commit("SET_LOCATION", location);
          return location;
        }
      } catch (error) {
        console.log("Something went wrong", error);
      }
    },
    navigateTo({ commit }, hash) {
      commit;
      let { name } = router.history.current;

      if (name === "Home") {
        let item = document.querySelector(`${hash}`);

        item.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push("/");
        setTimeout(() => {
          let item = document.querySelector(`${hash}`);
          item.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    },
    getTimeZone() {
      const cookies = document.cookie
        .split(";")
        .find((v) => v.includes("TimeZone"));
      const timeZone = cookies.match(/=.*/)[0].substring(1);
      return timeZone;
    },
    async getPickupTimes({ dispatch }, payload) {
      try {
        const timeZone = await dispatch("getTimeZone");
        const resp = await fetch(
          `${process.env.VUE_APP_URL}/api/v1/pickup_time?time_zone=${timeZone}&postcode=${payload}}`
        );
        const { response } = await resp.json();
        const { data } = response;
        return data;
      } catch (error) {
        return error;
      }
    },
    async getDeliveryTimes({ dispatch }, payload) {
      const timeZone = await dispatch("getTimeZone");

      try {
        const resp = await fetch(
          `${process.env.VUE_APP_URL}/api/v1/delivery_time?time_zone=${timeZone}&postcode=${payload}}`
        );
        const { response } = await resp.json();
        const { data } = response;

        return data;
      } catch (error) {
        return error;
      }
    },

    async getPickUpAndDeliveryTime({ dispatch }, payload) {
      try {
        const promises = await Promise.all([
          dispatch("getPickupTimes", payload),
          dispatch("getDeliveryTimes", payload),
        ]);

        return [promises, undefined];
      } catch (error) {
        return [undefined, error];
      }
    },
  },
  modules: {},
  getters: {
    calculateTotalPrice: (state) => {
      if (state.voucher.isApplied) {
        const totalPrice = state.cart
          .reduce((acc, curr) => {
            return (acc += curr.price * curr.quantity);
          }, 0)
          return  (totalPrice * state.voucher.discount).toFixed(2)
      } else {
        return state.cart
          .reduce((acc, curr) => {
            return (acc += curr.price * curr.quantity);
          }, 0)
          .toFixed(2);
      }
    },
    getCartLength: (state) => {
      return state.cart.length;
    },

    getCartItemById: (state) => (id) => {
      return state.cart.find((item) => item.item_id === id);
    },
  },
});
