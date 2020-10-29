<template>
  <div>
    <h4>{{ item.name }}</h4>

    <span>£{{ item.price }}</span>

    <div class="counter">
      <input
        type="number"
        @change="counter = $event.target.value"
        min="0"
        :value="counter"
        aria-label="checkbox"
      />
      <div class="counter__button-container">
        <button @click="incrementCounter" aria-label="add item">
          <i class="fas fa-caret-up"></i>
        </button>
        <button @click="decrementCounter" aria-label="remove item">
          <i class="fas fa-caret-down"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["item", "serviceName", "ecoFriendly",],
  data() {
    return {
      counter: 0,
    };
  },
  computed: {
    ...mapGetters(["getCartItemById"]),

    isDeterget() {
      return this.ecoFriendly ? 1 : 0;
    },
  },
  methods: {
    ...mapActions(["addItemToCart", "removeCartItem"]),
    incrementCounter() {
      this.counter++;
    },
    decrementCounter() {
      if (this.counter > 0) {
        this.counter--;
      }
    },
    addService(counter, item, service_name) {
      let orderItem = {
        category_id: item.category_id,
        category_name: service_name,
        detergent: this.isDeterget,
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: counter,
      };
      if (counter == 0) {
        this.removeCartItem(orderItem);
      } else {
        this.addItemToCart(orderItem);
      }
    },
  },
  watch: {
    counter(newVal) {
      this.addService(newVal, this.item, this.serviceName);
    },
    ecoFriendly() {
      this.addService(this.counter, this.item, this.serviceName);
    },
  },
  mounted() {
    let item = this.getCartItemById(this.$props.item.id);
    if (item) {
      this.counter = item.quantity;
    }
  },
};
</script>

<style lang='scss' scoped>
@import "@/styles/_variables.scss";

h4 {
  font-weight: 300;
  width: 100%;
}
span {
  font-weight: 400;
  color: $primary;
  margin-right: 1rem;
}

.counter {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid lighten($medium-grey, 45);
  border-radius: 4px;
  background: white;
  padding: 0;
  margin: 0;
  max-width: 70px;
  height: 30px;
  input[type="number"] {
    padding-left: 0.5rem;
    max-width: 45px;
    border: none;
    -moz-appearance: textfield;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
  &__button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    max-width: 20px;

    padding: 0;
    margin: 0;
    button {
      display: grid;
      place-items: center;
      width: 20px;
      height: 15px;
       cursor: pointer;
      color: $primary;
      background-color: transparent;
      border: none;
    }
  }
}
</style>