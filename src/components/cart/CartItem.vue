<template>
<transition name="fade">
  <div class="cart__item">
    <h4>{{ item.item_name }}</h4>
    <div class="cart__row">
      <p>£{{ item.price }}</p>
      <div class="cart__counter">
        <button
          class="cart__counter__button"
          @click="decrementCounter"
          v-if="this.item.quantity > 1"
        >
          -
        </button>
        <button class="cart__counter__button" @click="decrementCounter" v-else>
          <i class="fas fa-trash-alt"></i>
        </button>
        <input type="number" :value="this.item.quantity" aria-label="qty input" readonly />
        <button class="cart__counter__button" @click="incrementCounter" :disabled='item.item_name == "Skip Items"'>+</button>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["item"],
  data() {
    return {
      counter: this.$props.item.quantity,
    };
  },
  methods: {
    ...mapActions(["addItemToCart", "removeCartItem"]),
    incrementCounter() {
      this.item.quantity++;
      this.addItemToCart(this.item);
    },
    decrementCounter() {
      if (this.item.quantity <= 1) {
        this.removeCartItem(this.item);
      } else {
        this.item.quantity--;
        this.addItemToCart(this.item);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

.fade-enter-active, .fade-leave-active {
  transition: all 350ms;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(100%);
}

.cart__item {
  margin: 1.5rem 0;
  position: relative;
  h4 {
    font-size: 1.25rem;
    font-weight: 400;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -15px;
    height: 1px;
    width: 100%;
    background-color: $primary;
  }
  &:last-child::after {
    display: none;
  }
}

.cart__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  margin: 0.5em 0;
  p {
    font-size: 1.15rem;
    color: $primary;
    font-weight: 400;
  }
}

.cart__counter {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  input[type="number"] {
    border: 1px solid grey;
    border-radius: 4px;
    text-align: center;
    width: 40px;
    height: 25px;
    margin: 0 0.35em;
    -moz-appearance: textfield;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
  &__button {
    display: grid;
    place-items: center;
    width: 25px;
    height: 25px;
    background-color: $primary;
    border-radius: 4px;
    border: none;
    color: white;
    cursor: pointer;
    &:disabled{
      background-color: grey;
    }
  }
}
</style>
