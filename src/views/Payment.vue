<template>
  <div class="bg">
    <Banner>
      <h1 slot="title">Check <span>Out</span></h1>
      <p slot="text">Please confirm your order and enter your details.</p>
    </Banner>

    <div class="checkout">
      <div class="checkout__inner wrapper">
        <div class="checkout__inner__container">
          <h2>Basket</h2>
          <div class="basket__container">
            <div class="basket__container__column">
              <div class="basket__container__row">
                <h4 class="items-text">Items</h4>
                <div class="basket__items">
                  <div class="item" v-for="(item, index) in cart" :key="index">
                    <p>{{ item.quantity }}x {{ item.item_name }}</p>
                    <span>£{{ item.price }}</span>
                  </div>
                </div>
              </div>
              <div class="basket__container__row">
                <h4>Price</h4>
                <span>£{{ calculateTotalPrice }}</span>
              </div>
              <div class="basket__container__row">
                <h4>Voucher</h4>
                <div class="voucher__container">
                  <BaseInput :placeholder="'Voucher'" :modelValue="voucherInput"
                    @update:modelValue="(v) => voucherInput = v" label="Voucher" />
                  <BaseButton @click.native="applyVoucher" class="btn-small" :disabled="isVoucherLoading">
                    <span v-if="!voucher.isApplied" slot="text">Apply</span>
                    <span v-else slot="text">Applied</span>
                  </BaseButton>
                </div>
              </div>
              <div class="basket__container__row" v-if="voucherError.length">
                <p class="error">
                  {{ voucherError }}
                </p>
              </div>
              <div class="basket__container__row">
                <h4>Total</h4>
                <span class="primary"> £{{ calculateTotalPrice }}</span>
              </div>
            </div>

            <!-- <div class=""> -->
            <div class="basket__container__column basket__container__textbox">
              <div class="form__container__title">
                <i class="fas fa-pencil-alt"></i>
                <h3>Cleaning and Delivery Instructions</h3>
              </div>
              <form action="" class="stripe-form" ref="form"></form>
              <textarea name="instructions" placeholder="Write here..." aria-label="Instruction Area"
                v-model="instruction"></textarea>
              <!-- </div> -->
            </div>
          </div>

          <h2>Payment</h2>

          <div class="payment__container">
            <div class="form__container__title">
              <i class="far fa-credit-card"></i>
              <h3>Enter card details</h3>
            </div>
            <div class="card" ref="card"></div>
            <BaseButton class="btn-secondary" @click.native="send" :disabled="isLoading || isPayButtonDisabled">
              <span slot="text" v-if="isLoading">Complete Booking</span>
              <span slot="text" v-else>Complete Booking</span>
            </BaseButton>
          </div>

          <TermsAndConditions @onSubscribeToggle="(v) => isSubscribeChecked = v"
            @onTermsToggle="(v) => isAgreedToTerms = v" :error="termsError" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";
import { mapState, mapGetters, mapActions } from "vuex";
import Banner from "@/components/Banner";
import BaseInput from "@/components/BaseInput";
import BaseButton from "@/components/BaseButton";
import TermsAndConditions from "@/components/checkout/TermsAndConditions";
export default {
  components: {
    TermsAndConditions,
    BaseButton,
    BaseInput,
    Banner,
  },

  data() {
    return {
      isSubscribeChecked: false,
      isAgreedToTerms: false,
      isLoading: false,
      voucherError: "",
      isVoucherLoading: false,
      termsError: "",
      stripe: "",
      elements: "",
      card: "",
      voucherInput: "",
      instruction: "",
      style: {
        base: {
          color: "grey",
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a",
        },
      },
    };
  },

  computed: {
    ...mapState([
      "location",
      "cart",
      "details",
      "voucher",
    ]),
    ...mapGetters(["calculateTotalPrice"]),
    isPayButtonDisabled() {
      return !this.isAgreedToTerms
    }
  },

  methods: {
    ...mapActions(["emptyCart", "subscribeToNewsLetter", "setVoucher"]),
    stripeTokenHandler(token) {
      var form = this.$refs.form;
      var hiddenInput = document.createElement("input");
      hiddenInput.setAttribute("type", "hidden");
      hiddenInput.setAttribute("name", "stripeToken");
      hiddenInput.setAttribute("value", token.id);
      form.appendChild(hiddenInput);

      this.payment(token.id);
    },
    async applyVoucher() {
      this.isVoucherLoading = true;
      this.voucherError = "";
      this.$Progress.start();
      if (!this.voucherInput) {
        this.$Progress.fail();
        this.voucherError = "Please enter promo code";
        this.isVoucherLoading = false;
      } else {
        let url = new URL(`${process.env.VUE_APP_URL}/website/promocode`);
        url.search = new URLSearchParams({
          promocode: this.voucherInput,
          id: this.$route.params.id,
        }).toString();
        let res = await fetch(url);
        let data = await res.json();
        if (data.error) {
          this.isVoucherLoading = false;
          this.$Progress.fail();
          this.voucherError = data.error.message;
          this.setVoucher({
            isApplied: false,
            discount: 0
          })
        } else {
          this.setVoucher({
            isApplied: true,
            discount: +data.response.discount,
          });
        }
        this.isVoucherLoading = false;
        this.$Progress.finish();
      }
    },
    send() {
      this.stripe.createToken(this.card).then((result) => {
        if (result.error) {
          const { message } = result.error
          this.termsError = message;

        } else {
          this.stripeTokenHandler(result.token);
        }
      });
    },
    async payment(token) {
      this.termsError = '';
      let obj = new FormData();


      obj.set("id", this.$route.params.id);
      obj.set("token", token);
      obj.set("amount", this.calculateTotalPrice);
      obj.set("net_amount", (this.calculateTotalPrice * 100).toFixed(0));
      obj.set("discount_percentage", 0);
      obj.set("discount_amount", 0.0);
      obj.set("full_name", this.details.name);
      obj.set("email", this.details.email);
      obj.set("phone_number", this.details.phone);
      obj.set("country_code", "+44");
      obj.set("address", this.details.address);
      obj.set("landmark", this.location.city);
      obj.set("postcode", this.location.postCode);
      obj.set("pickup_time", this.details.pickup.slot);
      obj.set("pickup_date", this.details.pickup.date);
      obj.set("deliver_date", this.details.delivery.date);
      obj.set("deliver_time", this.details.delivery.slot);
      obj.set("latitude", this.location.lat);
      obj.set("longitude", this.location.lon);
      obj.set("instruction", this.instruction);

      if (!this.isAgreedToTerms) {
        this.termsError = "Please accept our terms and conditions!";
        return
      }

      if (this.isSubscribeChecked) {
        this.subscribeToNewsLetter(this.details.email);
      }

      this.isLoading = true;
      this.$Progress.start();
      let res = await fetch(
        `${process.env.VUE_APP_URL}/website/homes/create_payment`,
        {
          method: "POST",
          body: obj,
        }
      );

      let data = await res.json();

      if (data.error) {
        this.$Progress.fail();
        this.isLoading = false;
        const { message } = data.error
        this.termsError = message;


      } else {
        this.cart;
        this.$Progress.finish();
        this.isLoading = false;
        let id = data.response.order.id;
        this.emptyCart();

        let details = {
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
        };
        this.$store.commit("SET_LOCATION", {});
        this.$store.commit("SET_DETAILS", details);
        this.$router.push(`/track-order/${id}`);
      }
    },
  },

  async created() {
    await loadStripe(`${process.env.VUE_APP_PK_STRIPE_KEY}`)
      .then((result) => {
        this.stripe = result;
        this.elements = result.elements();
        this.card = this.elements.create("card", {
          style: this.style,
          hidePostalCode: true,
        });
        this.card.mount(this.$refs.card);
      })
      .catch((err) => {
        console.error(err);
      });

  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

.checkout {
  background: url("../images/checkout-bg.svg") no-repeat;
  background-position: bottom;
  background-size: 100%;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg,
        rgba(255, 255, 255, 0.7) 0%,
        rgba(247, 247, 247, 0) 100%);
  }
}

.checkout__inner {
  padding: 2.5rem 0;
}

.checkout__inner__container {
  position: relative;
  z-index: 2;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  // max-width: 70%;
  height: 100%;
  margin: 2rem auto;
  padding: 0 1.5rem;
  padding-bottom: 2rem;
  background-color: white;
  border-radius: 4px;
  overflow-y: hidden;

  h2 {
    margin: 1rem 0;
    font-weight: 300;
    font-size: 1.95rem;
    position: relative;

    &::after {
      position: absolute;
      content: "";
      bottom: -5px;
      left: 0%;
      border-radius: 10px;
      height: 3px;
      width: 45px;
      background: $primary;
    }
  }

  @media (max-width: $tablet) {
    max-width: 90%;
  }

  @media (max-width: $mobile) {
    max-width: 95%;
  }
}

.basket__container {
  display: flex;
  align-items: flex-start;
  // justify-content: flex-end;
  // min-height: 250px;
  height: 100%;
  border-radius: 4px;

  h4 {
      font-weight: 300;
    }

    p,
    span {
      font-weight: 400;
    }

  @media (max-width: $desktop) {
    flex-direction: column;
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    min-height: 65px;
    padding: 0 1rem;
    border-bottom: 1px solid darken($light-grey, 5);

    .items-text {
      align-self: flex-start;
      padding: 1em 0;
    }

    &:last-child {
      border-bottom: none;
    }

    .basket__items {
      display: flex;
      width: 65%;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .item {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        margin: 0.5em 0;
        p {
          font-weight: 200;
        }

        // border-bottom: 1px solid grey;
      }
    }


  }

  textarea {
    min-height: 120px;
    border-radius: 4px;
    border: 1px solid darken($light-grey, 5);
    width: 95%;
    padding: 0.25rem 0.5rem;
    margin: 1.25rem auto;
    resize: none;
  }
}

.basket__container__column {
  // min-height: 300px;
  height: 100%;
  width: 100%;
  background-color: $light-grey;
  border-radius: 4px;
  border: 1px solid darken($light-grey, 5);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  &:last-child {
    margin-left: 2rem;
  }

  @media (max-width: $desktop) {
    &:last-child {
      margin-top: 1rem;
      margin-left: 0rem;
    }
  }
}

.form__container__title {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5em;

  h3 {
    font-weight: 400;
  }

  i {
    margin-right: 0.75em;
    color: white;
    background: $primary;
    height: 35px;
    width: 35px;
    padding: 0.5em;
    display: grid;
    place-items: center;
    border-radius: 50%;
  }
}

.voucher__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 1rem;
  height: 40px;

  .container {
    margin: 0 1rem;
    height: 100%;
  }

  input {
    border: 1px solid darken($light-grey, 5);
  }

  button {
    margin-left: 0.5em;
  }
}

.payment__container {
  margin: 0.75rem 0;
  padding: 0.5em;
  background-color: $light-grey;
  border-radius: 4px;
  border: 1px solid darken($light-grey, 5);
  text-align: center;

  button {
    height: 45px;
    margin: 1rem 0;
  }
}

.StripeElement {
  height: 45px;
  width: 100%;
  border: 1px solid $light-grey;
  border-radius: 4px;
  padding: 0.875em 0.5em;
  margin: 1rem 0;
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  background-color: white;
  margin-right: 1.5rem;
  position: relative;

  &:focus {
    border: 1px solid $primary;
    outline: none;
  }

  &--focus {
    border: 1px solid $primary;
    outline: none;
  }

  &--invalid {
    border: 1px solid $error;
  }
}
</style>
