<template>
  <section class="services">
    <div class="services__inner wrapper">
      <div class="services__title">
        <h2>Affordable Prices</h2>
        <p>
          We provide a high-quality service for everyone, which is convenient,
          fast, and good to the environment from as little as £2 per item.
        </p>
      </div>
      <div class="services__content">
        <div class="services__content__cards">
          <PricingCard
            v-for="(item, index) in pricingCards"
            :key="index"
            :img="item.img"
            :text="item.text"
            :title="item.title"
            :hoverImg="item.hover"
          />
        </div>
        <router-link to="/pricing">
          <BaseButton>
            <span slot="text">View Pricing</span>
          </BaseButton>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import PricingCard from "@/components/PricingCard";
import BaseButton from "@/components/BaseButton";
export default {
  components: { PricingCard, BaseButton },
  data() {
    return {
      pricingCards: [
        {
          title: "Shirt Service",
          text: "From £2.50 per shirt ",
          img: "pricing_first.png",
          hover: "pricing_first_hover.png",
        },
        {
          title: "Laundry",
          text: "£14.95 per 8kg Of",
          img: "pricing_second.png",
          hover: "pricing_second_hover.png",
        },
        {
          title: "Dry Cleaning",
          text: "From £2 per item",
          img: "pricing_third.png",
          hover: "pricing_third_hover.png",
        },
      ],
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
@import "@/styles/_variables.scss";

section {
  // min-height: 100vh;
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
  text-align: center;
}

.services__inner {
  padding: 2.5rem 0;
  .services__title {
    margin: 2.5rem auto;
    text-align: center;
    max-width: 800px;
    h2 {
      font-weight: 300;
      font-size: 3.5rem;
      margin: 2rem 0;
      position: relative;
      @media (max-width: $mobile) {
        font-size: 2.25rem;
      }
      &::after {
        position: absolute;
        content: "";
        bottom: -15px;
        left: 50%;
        transform: translate(-50%);
        border-radius: 10px;
        height: 3px;
        width: 45px;
        background: $primary;
      }
    }
    p {
      font-size: 1.2rem;
      color: grey;
      line-height: 160%;
      @media (max-width: $mobile) {
        font-size: 1rem;
      }
    }
  }
  .services__content {
    &__cards {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      @media (max-width: $tablet) {
        flex-wrap: wrap;
      }
    }
    button {
      margin: 2rem 0;
      width: 180px;
    }
  }
}
</style>
