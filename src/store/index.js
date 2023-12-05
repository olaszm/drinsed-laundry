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
    isAgreedToTerms: false,
    isSubscribeChecked: false,
    cart: [],
    postCodeSuggestions: [],
    location: {
      lat: "",
      lon: "",
      postCode: "",
      landmark: "",
      city: "",
      country: "",
      formatedAddress: "",
    },
    postCodeError: {
      type: "",
      msg: "",
    },
    details: {
      name: "",
      email: "",
      phone: "",
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
    SET_AGREED_TO_TERMS(state) {
      state.isAgreedToTerms = !state.isAgreedToTerms;
    },
    SET_SUBSCRIBE_CHECKED(state) {
      state.isSubscribeChecked = !state.isSubscribeChecked;
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
    setAgreedToTerms({ commit }) {
      commit("SET_AGREED_TO_TERMS");
    },
    setIsSubscribeChecked({ commit }) {
      commit("SET_SUBSCRIBE_CHECKED");
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
    loadFromLocalStorage({ commit }) {
      let items = window.localStorage.getItem("drisdenCart");
      if (items) {
        commit("UPDATE_CART", JSON.parse(items));
      }
    },
    saveToLocalStorage({ state }) {
      window.localStorage.setItem("drisdenCart", JSON.stringify(state.cart));
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
        dispatch("saveToLocalStorage");
      } else {
        commit("ADD_ITEM_TO_CART", item);
        dispatch("saveToLocalStorage");
      }
    },
    emptyCart({ commit, dispatch }) {
      commit("UPDATE_CART", []);
      dispatch("saveToLocalStorage");
    },
    removeCartItem({ commit, state, dispatch }, item) {
      let newCart = state.cart.filter(
        (cartItem) => cartItem.item_id != item.item_id
      );
      commit("UPDATE_CART", newCart);
      dispatch("saveToLocalStorage");
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
        await res.json();
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
    validEmail({ commit }, email) {
      commit;
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    async subscribeToNewsLetter({ commit }, email) {
      commit;

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

      return d;
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
      } catch (error) {
        console.log("Something went wrong", error);
      }
    },

    async pickAddress({ commit, dispatch }, { id }) {
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
            formatedAddress,
          } = data;

          let location = {
            latitude,
            longitude,
            postcode,
            town_or_city,
            country,
            line_1,
            county,
            formatedAddress,
          };

          console.log(formatedAddress);
          commit("SET_LOCATION", location);
          dispatch("checkPostCode", postcode);
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
  },
  modules: {},
  getters: {
    calculateTotalPrice: (state) => {
      if (state.voucher.isApplied) {
        return (
          state.cart
            .reduce((acc, curr) => {
              return (acc += curr.price * curr.quantity);
            }, 0)
            .toFixed(2) * state.voucher.discount
        );
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
