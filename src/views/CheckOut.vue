<template>
  <div class="bg">
    <Banner>
      <h1 slot="title">Check <span>Out</span></h1>
      <p slot="text">Please confirm your order and enter your details.</p>
    </Banner>

    <div class="checkout">
      <div class="checkout__inner wrapper">
        <div class="checkout__inner__container">
          <div class="flex-container">
            <div class="container-item">
              <h2>Address</h2>
              <div class="form__container">
                <div class="form__container__title">
                  <i class="fas fa-map-marker-alt"></i>
                  <h3>Enter shipping details</h3>
                </div>

                <form action>
                  <div class="form__row">
                    <BaseInput
                      :placeholder="'Full name'"
                      :type="'text'"
                      v-model="form.name"
                      :error="errors.name"
                      label="Name"
                    />
                    <BaseInput
                      :placeholder="'Phone'"
                      type="tel"
                      v-model="form.phone"
                      :error="errors.phone"
                      label="Phone number"
                      pattern="^\d{11}$"
                      max="11"
                    />
                  </div>

                  <BaseInput
                    :placeholder="'Email'"
                    :type="'email'"
                    v-model="form.email"
                    :error="errors.email"
                    label="Email"
                  />
                  <BaseInput
                    :placeholder="'Address Line 1'"
                    :type="'text'"
                    v-model="location.landmark"
                    :value="location.landmark"
                    :error="errors.address"
                    label="Address Line 1"
                  />
                  <BaseInput
                    :placeholder="'Address Line 2'"
                    :type="'text'"
                    v-model="form.address_two"
                    label="Address Line 2"
                  />
                  <BaseInput
                    readonly
                    :placeholder="'Post Code'"
                    :type="'text'"
                    v-model="location.postCode"
                    :value="location.postCode"
                    :name="'checkoutPostCode'"
                    :error="errors.postCode"
                    label="Post Code"
                    @change.native="sendZipCode"
                    @input.native="sendZipCode"
                  />
                </form>
                <p :class="postCodeError.type">{{ postCodeError.msg }}</p>
              </div>
            </div>
            <div class="container-item">
              <h2>Time Slot</h2>
              <div class="time__container">
                <div class="collection">
                  <h3>Collection Time:</h3>

                  <div class="loader" v-if="isLoading">
                    <ClipLoader
                      :size="65"
                      :sizeUnit="'px'"
                      :color="'#13b0a7'"
                    />
                  </div>
                  <div class="collection__times" v-else>
                    <div v-for="(item, index) in pickUpTimes" :key="index">
                      <p>{{ item.subtitle }}</p>
                      <TimeSlotCheckBox
                        v-for="(slot, slotIndex) in item.time"
                        :key="slotIndex"
                        :date="item.title"
                        :hour="slot.hour"
                        :value="`${item.value}-${slot.title}`"
                        :name="'pickUpTime'"
                        v-model="activePickUpTime"
                        :active="activePickUpTime"
                        @click.native="getDeliveryTimes"
                      />
                    </div>
                  </div>
                </div>
                <div class="delivery">
                  <h3>Delivery Time:</h3>
                  <div class="loader" v-if="isLoading">
                    <ClipLoader
                      :size="65"
                      :sizeUnit="'px'"
                      :color="'#13b0a7'"
                    />
                  </div>
                  <div class="collection__times" id="delivery-container" v-else>
                    <div
                      v-for="(item, index) in filteredDeliveryTimes"
                      :key="index"
                    >
                      <p>{{ item.subtitle }}</p>
                      <TimeSlotCheckBox
                        v-for="(slot, slotIndex) in item.time"
                        :key="slotIndex"
                        :date="item.title"
                        :hour="slot.hour"
                        :value="`${item.value}-${slot.title}`"
                        :name="'deliveryTime'"
                        v-model="activeDeliveryTime"
                        :active="activeDeliveryTime"
                        tabindex="0"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="errors" v-if="collectionError">
                <p
                  class="error"
                  v-for="(i, index) in collectionError"
                  :key="index"
                >
                  {{ i }}
                </p>
              </div>
            </div>
          </div>
          <div class="button__container">
            <BaseButton class="btn-secondary" @click.native="backToPricing">
              <span slot="text">Back to services</span>
            </BaseButton>
            <BaseButton class="btn-secondary" @click.native="procceedToPayment">
              <span slot="text">Proceed to payment</span>
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { ClipLoader } from "@saeris/vue-spinners";
import TimeSlotCheckBox from "@/components/checkout/TimeSlotCheckBox";
import Banner from "@/components/Banner";
import BaseInput from "@/components/BaseInput";
import BaseButton from "@/components/BaseButton";
export default {
  components: {
    ClipLoader,
    BaseInput,
    BaseButton,
    TimeSlotCheckBox,
    Banner,
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        phone: "",
        address: this.$store.state.location.landmark || "",
        address_two: "",
        post_code: this.$store.state.location.postCode || "",
      },
      errors: {
        name: "",
        email: "",
        phone: "",
        postCode: "",
        address: "",
      },
      isLoading: false,
      deliveryTimes: [],
      pickUpTimes: [],
      activePickUpTime: {},
      activeDeliveryTime: {},
      filteredDeliveryTimes: [],
      collectionError: [],
    };
  },
  methods: {
    ...mapActions([
      "validEmail",
      "checkPostCode",
      "setDetails",
      "setPostCodeError",
      "removeCartItem",
      "isSkipItemInTheCart",
    ]),
    sendZipCode() {
      if (!this.location.postCode) {
        this.setPostCodeError("Please enter a post code");
      } else {
        this.checkPostCode(this.location.postCode);
        this.errors.address = "";
      }
    },
    isTimeSlotsPicked() {
      this.collectionError = [];
      if (!this.activePickUpTime.value) {
        this.collectionError.push("Please select a collection date");
      }
      if (!this.activeDeliveryTime.value) {
        this.collectionError.push("Please select a delivery date");
      }
      if (!this.collectionError.length) {
        return true;
      }
      return false;
    },
    isDetailsValid() {
      for (let p in this.errors) {
        this.errors[p] = "";
      }

      if (!this.form.name) {
        this.errors.name = "Name required!";
      }
      if (this.form.email.length < 1) {
        this.errors.email = "Email required";
      } else if (!this.validEmail(this.form.email)) {
        this.errors.email = "Valid email required!";
      }
      if (this.form.phone.length < 10) {
        this.errors.phone = "Valid phone number required!";
      }
      if (this.location.postCode.length < 1) {
        this.errors.postCode = "Post code required!";
      }
      if (this.location.landmark.length < 1) {
        this.errors.address = "Address required!";
      }

      return Object.values(this.errors).every((field) => field == "");
    },
    procceedToPayment() {
      if (this.isDetailsValid() && this.isTimeSlotsPicked()) {
        this.createOrder();
      } else {
        window.scrollTo(0, 0);
      }
    },

    backToPricing() {
      this.$store.commit("SET_LOCATION", {});
      this.isSkipItemInTheCart();
      this.$router.push("/pricing");
    },

    async createOrder() {
      let data = new FormData();
      data.set("postal_code", this.location.postCode);
      data.set("pickup_location", this.location.landmark);
      data.set("pickup_latitude", this.location.lat);
      data.set("pickup_longitude", this.location.lon);
      data.set("pickup_postcode", this.location.postCode);
      data.set("pickup_time", this.activePickUpTime.slot);
      data.set("pickup_date", this.activePickUpTime.date);
      data.set("delivery_location", this.location.landmark);
      data.set("delivery_latitude", this.location.lat);
      data.set("delivery_longitude", this.location.lon);
      data.set("delivery_postcode", this.location.postCode);
      data.set("delivery_time", this.activeDeliveryTime.slot);
      data.set("delivery_date", this.activeDeliveryTime.date);
      data.set("items", JSON.stringify(this.cart));

      let res = await fetch(`${process.env.VUE_APP_URL}/website/homes`, {
        method: "POST",
        body: data,
      });

      let response = await res.json();

      if (response.error) {
        console.log(response);
      } else {
        let details = {
          name: this.form.name,
          email: this.form.email,
          phone: this.form.phone,
          address: this.location.landmark,
          pickup: {
            slot: this.activePickUpTime.slot,
            date: this.activePickUpTime.date,
          },
          delivery: {
            slot: this.activeDeliveryTime.slot,
            date: this.activeDeliveryTime.date,
          },
        };
        this.setDetails(details);
        this.$router.push({
          name: "Payment",
          params: { id: response.response.id },
        });
      }
    },

    getDeliveryTimes() {
      let currentPickUpTime;
      let delivery = this.deliveryTimes.map((item) => {
        item.value = item.value.toString().split("-").reverse().join("-");
        item.value = new Date(item.value);
        return item;
      });

      if (!this.activePickUpTime.value) {
        currentPickUpTime = new Date();
      } else {
        currentPickUpTime = new Date(
          this.activePickUpTime?.value
            .substring(0, 10)
            .toString()
            .split("-")
            .reverse()
            .join("-")
        );
      }

      currentPickUpTime.setHours(currentPickUpTime.getHours() + 48);

      let res = delivery.filter((item) => item.value > currentPickUpTime);

      this.filteredDeliveryTimes = "";

      let div = document.querySelector("#delivery-container");

      if (div) {
        div.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }

      this.filteredDeliveryTimes = res;
    },
  },
  computed: {
    ...mapState(["location", "postCodeError", "cart", "details"]),
    ...mapGetters(["calculateTotalPrice"]),
  },
  async mounted() {
    this.isLoading = true;
    // let input = document.querySelector("#checkoutPostCode");
    // this.initGoogleAutoComplete(input);

    let arr = document.cookie.split(";");
    let filtered = arr.find((item) => item.includes("TimeZone"));
    let timeZone = filtered.match(/=.*/)[0].substring(1);

    let pickUpResponse = await fetch(
      `${process.env.VUE_APP_URL}/api/v1/pickup_time?time_zone=${timeZone}&postcode=${this.location.postCode}}`
    );
    let json = await pickUpResponse.json();
    this.pickUpTimes = json.response.data;
    let deliveryResponse = await fetch(
      `${process.env.VUE_APP_URL}/api/v1/delivery_time?time_zone=${timeZone}&postcode=${this.location.postCode}}`
    );
    let data = await deliveryResponse.json();
    this.deliveryTimes = data.response.data;

    let firstPicKUpTime = this.pickUpTimes[0];
    this.activePickUpTime = {
      date: firstPicKUpTime.title,
      slot: firstPicKUpTime?.time[0]?.hour,
      value: `${firstPicKUpTime.value}-${firstPicKUpTime.time[0]?.title}`,
    };
    this.getDeliveryTimes();
    this.isLoading = false;
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

.checkout {
  background: url("../assets/checkout-bg.svg") no-repeat;
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
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.7) 0%,
      rgba(247, 247, 247, 0) 100%
    );
  }
}

.checkout__inner {
  padding: 5rem 0;
}

.checkout__inner__container {
  position: relative;
  z-index: 2;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  height: 100%;
  background-color: white;
  border-radius: 4px;
  overflow-y: hidden;
  padding: 0 1rem;
  margin: 0 auto;
  h2 {
    margin: 1.5rem 0;
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

.form__container {
  background-color: $light-grey;
  padding: 0 1.5rem;
  border-radius: 4px;
  border: 1px solid darken($light-grey, 5);
  &__title {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 1rem 0;
    img {
      margin-right: 0.5em;
    }
    h3 {
      font-size: 1.25rem;
      font-weight: 400;
    }
  }
}

form {
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  .form__row {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  div {
    margin: 0.5rem 0;
    &:first-child {
      margin-right: 0.75em;
    }
    .container {
      border: 1px solid darken($light-grey, 5);
    }
  }
}

.form__container__title {
  margin-left: 0.5rem;
  i {
    margin-right: 0.75em;
    color: white;
    background: $primary;
    // padding: 0.5em;
    height: 35px;
    width: 35px;
    display: grid;
    place-items: center;
    border-radius: 50%;
  }
}

// New Layout
.flex-container {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  .container-item {
    width: 100%;
    flex-basis: 100%;
    &:last-child {
      margin-left: 1.5rem;
    }
  }

  @media (max-width: $tablet) {
    flex-direction: column;
    .container-item {
      &:last-child {
        margin-left: 0rem;
      }
    }
  }
}

.collection__times {
  height: 100%;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
}

.time__container {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  .collection,
  .delivery {
    width: 100%;
    max-height: 200px;
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none;
    }
    h3 {
      font-weight: 400;
    }
  }
  .delivery {
    margin: 0.75rem 0;
  }
  @media (max-width: $tablet) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.loader {
  min-height: 200px;
  width: 100%;
  display: grid;
  place-items: center;
  text-align: center;
}

.button__container {
  margin: 1.5rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: $mobile) {
    flex-direction: column;
    a {
      margin: 1rem 0;
    }
    button,
    a {
      margin: 0.5rem 0;
      width: 100%;
    }
  }
}
</style>
