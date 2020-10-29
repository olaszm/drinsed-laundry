<template>
  <section class="services">
    <div class="services__inner wrapper">
      <h2>Services We Provide</h2>
      <div class="services__content">
        <div class="services__content__services-list">
          <Service
            v-for="(service, index) in services"
            :key="index"
            :title="service.title"
            :body="service.body"
            :logo="service.logo"
            :class="service.title == activeService.title ? 'highlight' : ''"
            @click.native="changeActiveService(service)"
          />
        </div>
        <div class="services__content__img">
          <div class="services__content__img__details">
            <h3>{{ activeService.details_title }}</h3>
            <h4>
              {{ activeService.details_subtitle }}

              <span>{{ activeService.details_price }} </span>
            </h4>
            <p>{{ activeService.details_body }}</p>
            <router-link to="/pricing">
              <BaseButton class="btn-secondary">
                <span slot="text">View Pricing</span>
              </BaseButton>
            </router-link>
          </div>
          <img
            :src="require(`../assets/${activeService.details_img}`)"
            alt="Laundry Logo"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Service from "@/components/Service";
import BaseButton from "@/components/BaseButton";
export default {
  components: { BaseButton, Service },

  data() {
    return {
      activeService: {
        title: "Laundry Service",
        body: "Washed,Tumble Dried and folded. Pricing is based on weight.",
        logo: "services_laundry.svg",
        details_title: "Laundry Service",
        details_subtitle:
          "Flexible Pricing for your Laundry Starts from as little as",
        details_price: "£14.95",
        details_body:
          "Ironing only service requires your items to be pre-washed. We will press, pack and deliver them back to you on hangers.",
        // details_img: "laundry.png",
        details_img: "laundry-service.png",
      },
      services: [
        {
          title: "Laundry Service",
          body: "Washed, Tubmle Dried and folded. Pricing is based on weight.",
          logo: "services_laundry.svg",
          details_title: "Laundry Service",
          details_subtitle:
            "Flexible Pricing for your Laundry Starts from as little as",
          details_price: "£14.95",
          details_body:
            "Washed at 30◦, tumble dried at medium heat, packed together, and delivered to you. Max 8kg per laundry load.",
          // details_img: "laundry.png",
          details_img: "laundry-service.png",
        },
        {
          title: "Laundry With Ironing",
          body:
            "Items are individually cleaned, washed, pressed and delivered on hangers",
          logo: "services_laundry_ironing.svg",
          details_title: "Laundry With Ironing",
          details_subtitle: "Low prices for your Laundry and Ironing from:",
          details_price: "£1.00",
          details_body:
            "Laundry and Ironing for any garment, just a click away",
          // details_img: "laundry-with-ironing.png",
          details_img: "laundry-and ironing.png",
        },
        {
          title: "Dry Cleaning",
          body:
            "Items are individually cleaned, washed, pressed and delivered on hangers",
          logo: "services_dry_cleaning.svg",
          details_title: "Dry Cleaning",
          details_subtitle:
            "We Dry clean your items according to the care labels from as little as ",
          details_price: "£2.50",
          details_body:
            "Eco - friendly dry cleaning for your suits, dresses, coats, knitwear, and more.",
          // details_img: "dry-cleaning.png",
          details_img: "laundry-dry-cleaning.png",
        },
        {
          title: "Home and Bedding",
          body:
            "Large Home items do require a different cleaning process, therefore may take 72 hours.",
          logo: "services_home.svg",
          details_title: "Home and Bedding",
          details_subtitle:
            "We cater for all your Home and Bedding cleaning needs. Prices start from",
          details_price: "£3.00",
          details_body:
            "Home Bedding cleaned and pressed to a high quality, including duvets and blankets.",
          // details_img: "home-and-beding.png",
          details_img: "laundry-home-and-bedding.png",
        },
        {
          title: "Ironing Only",
          body:
            "All items are prewashed and only require ironing, priced per item.",
          logo: "services_ironing-.svg",
          details_title: "Ironing Only",
          details_subtitle:
            "Flexible Pricing for your Laundry Starts from as little as",
          details_price: "£14.95",
          details_body:
            "Ironing only service requires your items to be pre-washed. We will press, pack and deliver them back to you on hangers.",
          // details_img: "ironing-only.png",
          details_img: "laundry-ironing-only.png",
        },
      ],
    };
  },
  methods: {
    changeActiveService(item) {
      this.activeService = item;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

section {
  min-height: 100vh;
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
  text-align: center;
}

.services__inner {
  h2 {
    font-weight: 300;
    font-size: 3.5rem;
    margin-top: 3rem;
    margin-bottom: 1rem;
    position: relative;
    &::after {
      position: absolute;
      content: "";
      bottom: -10px;
      left: 50%;
      transform: translate(-50%);
      border-radius: 10px;
      height: 3px;
      width: 45px;
      background: $primary;
    }
    @media (max-width: $mobile) {
      font-size: 2.5rem;
    }
  }
  .services__content {
    margin-bottom: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .services__content__services-list {
      text-align: left;
    }
    .services__content__img {
      max-width: 650px;
      height: 100%;
      width: 100%;
      margin-left: 5rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      border-radius: 4px;
      box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      &__details {
        padding: 0 2rem;
        text-align: left;
        h3 {
          font-weight: 400;
          font-size: 2rem;
          margin: 2rem 0;
          position: relative;
          &::after {
            position: absolute;
            content: "";
            bottom: -15px;
            left: 0%;
            transform: translate(0%);
            border-radius: 10px;
            height: 3px;
            width: 45px;
            background: $primary;
          }
        }
        h4 {
          font-weight: 400;
          font-size: 1.2rem;
          margin: 1rem 0;
          span {
            color: $primary;
          }
        }
        p {
          color: grey;
          line-height: 150%;
          word-spacing: 2px;
        }
        button {
          height: 50px;
          width: 150px;
          margin: 1rem 0;
          font-weight: 400;
        }
      }
    }
    @media (max-width: $tablet) {
      justify-content: flex-start;
      flex-wrap: wrap;
      .services__content__img {
        margin-left: 0;
      }
    }
  }
}

.highlight {
  color: $primary;
}
</style>
