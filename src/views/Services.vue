<template>
  <keep-alive>
    <div>
      <Banner>
        <h1 slot="title">Our Pricing <span>& Services</span></h1>
        <p slot="text">
          Simply add your laundry to the basket, choose a timeslot that suits
          you, we'll collect your laundry and return your clean and pressed
          items within 48 hours. Or SKIP the item selection and we'll do the
          itemising for you..
        </p>
      </Banner>

      <section class="services">
        <div class="services__inner wrapper">
          <div class="services__inner__error-container" v-if="error">
            <p class="error">{{ this.error }}</p>
          </div>
          <ServiceCategory v-for="(service, index) in services" :key="index" :service="service" :tabindex="index" />
          <div class="services__inner__next-container">
            <BaseButton @click.native="skipItems" v-if="getCartLength == 0">
              <span slot="text">Skip Item Selection</span>
            </BaseButton>

            <BaseButton v-else @click.native="toPayment">
              <span slot="text">Proceed to payment</span>
            </BaseButton>
            <p>
              <i class="fas fa-info-circle"></i>Minimum order £20. 48h turn
              around.
            </p>
          </div>
        </div>
      </section>
    </div>
  </keep-alive>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";

import ServiceCategory from "@/components/ServiceCategory";
import Banner from "@/components/Banner";
import BaseButton from "@/components/BaseButton";
export default {
  components: { ServiceCategory, BaseButton, Banner },
  data() {
    return {
      services: [],
      error: "",
    };
  },
  computed: {
    ...mapState(["location"]),
    ...mapGetters(["getCartLength", "calculateTotalPrice"]),
  },
  methods: {
    ...mapActions(["addItemToCart", "setisPostcodePopUpOpen"]),
    openCategory() {
      this.$emit("open");
    },
    skipItems() {
      this.error = "";
      let orderItem = {
        category_id: 5,
        category_name: "Skip Items",
        detergent: 0,
        item_id: 1,
        item_name: "Skip Items",
        price: 20.0,
        quantity: 1,
      };
      this.addItemToCart(orderItem);

      if (!this.location.postCode) {
        this.setisPostcodePopUpOpen(true);
      } else {
        this.$router.push("/checkout");
      }
    },
    toPayment() {
      this.error = "";
      if (this.calculateTotalPrice >= 20) {
        if (!this.location.postCode) {
          this.setisPostcodePopUpOpen(true);
        } else {
          this.$router.push("/checkout");
        }
      } else {
        this.error = "Minimum order is £20";
        window.scrollTo(0, 0);
      }
    },
  },
  async created() {
    this.$Progress.start();
    try {
      let res = await fetch(`${process.env.VUE_APP_URL}api/v1/service_list`);
      let data = await res.json();
      let images = [
        "/laundry.svg",
        "/laundry-and-ironing.svg",
        "/dry-cleaning.svg",
        "/home-and-bed.svg",
        "/shirt.svg",
      ];

      let newData = data.response.data.map((item, i) => {
        item.image = images[i];
        return item;
      }).filter(item => item.image !== undefined);

      this.services = newData;
    } catch (error) {
      this.error = "Something went wrong, please try again later!";
      this.$Progress.fail();
    } finally {
      this.$Progress.finish()
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

.services__inner {
  min-height: 400px;

  &__error-container {
    text-align: center;
    width: 100%;
    margin: 2rem 0;
  }

  &__next-container {
    max-width: 350px;
    margin: 2rem auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    p {
      margin-top: 1em;
      font-size: 0.9rem;
      font-weight: 400;
      color: grey;
    }
  }
}
</style>
