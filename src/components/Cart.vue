<template>
  <transition name="slide-in">
    <div class="cart" v-if="isCartOpen">
      <div class="cart__inner wrapper">
        <div class="cart__inner__header">
          <h3>Total item(s): {{ getCartLength || 0 }}</h3>
          <div class="close-btn" @click="toggleCart">
            <i class="fas fa-times"></i>
          </div>
        </div>
        <div class="cart__inner__container">
          <CartItem v-for="(item, index) in cart" :key="index" :item="item" />
        </div>

        <div class="cart__inner__footer" v-if="getCartLength != 0">
          <div class="total" v-if="voucher.isApplied">
            <h3>Discount:</h3>
            <h3>{{ 100 - voucher.discount * 100 }}%</h3>
          </div>
          <div class="total">
            <h3>Total:</h3>
            <h3>£{{ calculateTotalPrice }}</h3>
          </div>
          <div class="error-container" v-if="error">
            <p class="error">{{ this.error }}</p>
          </div>
          <div class="button">
            <BaseButton class="btn-secondary" @click.native="toPayment">
              <span slot="text">Proceed to Checkout</span>
            </BaseButton>
          </div>
        </div>
        <div class="cart__inner__footer" v-else>
          <div class="button" @click="toggleCart">
            <router-link to="/pricing">
              <BaseButton class="btn-secondary">
                <span slot="text">Check out our services</span>
              </BaseButton>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import CartItem from "@/components/cart/CartItem";
import BaseButton from "@/components/BaseButton";
export default {
  components: {
    CartItem,
    BaseButton,
  },
  data() {
    return {
      error: "",
    };
  },
  computed: {
    ...mapGetters(["calculateTotalPrice", "getCartLength"]),
    ...mapState(["isCartOpen", "cart", "voucher", "location"]),
  },
  methods: {
    ...mapActions(["toggleCart", "setisPostcodePopUpOpen"]),
    toPayment() {
      if (this.calculateTotalPrice >= 20) {
        this.toggleCart();
        if (!this.location.postCode) {
          this.setisPostcodePopUpOpen(true);
        } else {
          this.$router.push("/checkout");
        }
      } else {
        this.error = "Minimum order is £20";
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";

.cart {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: white;
  height: 100%;
  width: 30%;
  box-shadow: -8px 0px 10px rgba(0, 0, 0, 0.2);
  z-index: 15;
  @media (max-width: $tablet) {
    width: 80%;
  }
  @media (max-width: $mobile) {
    width: 100%;
  }
}

.close-btn {
  transform: scale(1.1);
}

.cart__inner {
  height: 100%;
  width: 90%;
  display: grid;
  grid-template-rows: 1fr 70% 1fr;
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3 {
      font-weight: 400;
    }
  }
  &__container {
    margin: 1.5rem 0;
    padding-right: 1em;
    overflow: scroll;
    scrollbar-width: none;
  }
  &__footer {
    position: relative;
    &::before {
      content: "";
      position: absolute;
      top: -10px;
      height: 1px;
      width: 100%;
      background-color: black;
    }
    .total {
      display: flex;
      align-items: center;
      justify-content: space-between;
      h3 {
        font-weight: 400;
        &:last-child {
          color: $primary;
          font-weight: 500;
        }
      }
    }
    .button {
      margin: 0.75rem 0;
      button {
        width: 100%;
      }
    }
  }
}

.close {
  position: absolute;
  right: 20px;
  top: 20px;
  bottom: 0;
}

.slide-in-enter-active,
.slide-in-leave-active {
  transition: all 0.5s;
}
.slide-in-enter, .slide-in-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(100%);
}
</style>
