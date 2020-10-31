<template>
  <div class="bg__wrapper">
    <div class="bg__images">
      <img
        v-for="i in images"
        :key="i"
        :src="`./${i}`"
        alt="i"
        :class="currentImage == i ? 'show' : ''"
      />
    </div>
    <div class="slider-dots">
      <span
        v-for="(item, index) of imagesLength"
        :key="index"
        class="dots"
        @click="currentIndex = index"
        :class="index == currentIndex ? 'active-dot' : ''"
      ></span>
    </div>
    <section class="wrapper hero__section">
      <div class="hero__content">
        <h1>
          Dry Cleaning & Laundry
          <br />Direct To Your Door
        </h1>
        <p>
          We collect, clean & deliver your laundry & Ironing,
          <br />directly to your door.
        </p>
        <ul>
          <li>
            <i class="fas fa-arrow-circle-right"></i>Free Collection & Delivery
          </li>
          <li>
            <i class="fas fa-arrow-circle-right"></i>Expert Service Any day of
            the week
          </li>
          <li>
            <i class="fas fa-arrow-circle-right"></i>Late evening Collection &
            Delivery
          </li>
          <li>
            <i class="fas fa-arrow-circle-right"></i>From as little as £2.00 per
            item
          </li>
        </ul>

        <div class="hero__content__zipform">
          <BaseInput
            :placeholder="'Enter your post code'"
            :logo="'marker.svg'"
            :name="'postCodeInput'"
            :value="location.formatedAddress"
            :label="'Post Code'"
          />
          <BaseButton class="btn-secondary" @click.native="sendZipCode">
            <span slot="text">Book a Service</span>
          </BaseButton>
        </div>
        <p :class="postCodeError.type">{{ postCodeError.msg }}</p>

        <div class="hero__content__apps">
          <div>
            <img src="@/assets/play_store.svg" alt />
            <img src="@/assets/app_store.svg" alt />
          </div>
        </div>
      </div>
      <!-- <div class="hero-image">
        <img src="@/assets/hero-section-1-removebg-preview.png" alt="">
      </div> -->
    </section>

    <!-- <div class="scroll-indicator">
      <i class="fas fa-chevron-down"></i>
    </div> -->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import BaseButton from "@/components/BaseButton";
import BaseInput from "@/components/BaseInput";
export default {
  components: {
    BaseButton,
    BaseInput,
  },
  data() {
    return {
      images: [
        "hero-section-2.webp",
        "hero-section-3.webp",
        "hero-section-4.webp",
        "hero-section-5.png",
      ],
      time: null,
      currentIndex: 0,
    };
  },
  computed: {
    ...mapState(["location", "postCodeError"]),
    imagesLength() {
      return this.images.length;
    },
    currentImage() {
      return this.images[Math.abs(this.currentIndex) % this.images.length];
    },
  },
  methods: {
    ...mapActions([
      "initGoogleAutoComplete",
      "checkPostCode",
      "setPostCodeError",
    ]),
    sendZipCode() {
      if (!this.location.formatedAddress) {
        this.setPostCodeError({
          type: "error",
          msg: "Please enter a postcode",
        });
      } else {
        this.checkPostCode(this.location.postCode);
      }
    },
    startSlider() {
      this.time = setInterval(() => {
        this.nextImage();
      }, 3500);
    },
    nextImage() {
      if (this.currentIndex >= this.images.length - 1) {
        this.currentIndex = 0;
      } else {
        this.currentIndex++;
      }
    },
    previusImage() {
      if (this.currentIndex <= 0) {
        this.currentIndex = this.images.length - 1;
      } else {
        this.currentIndex--;
      }
      // clearInterval(this.time);
      // setTimeout(() => {
      //   this.startSlider();
      // }, 5000);
    },
  },
  mounted() {
    let input = document.querySelector("#postCodeInput");
    this.initGoogleAutoComplete(input);
    this.startSlider();
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

.bg__wrapper {
  position: relative;
  min-height: 85vh;
  display: flex;
  align-items: center;
  // overflow: hidden;
}

.bg__images {
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    object-fit: cover;
    object-position: left top;
    opacity: 0;
    transition: opacity 400ms ease-in-out;
  }
}

.slider-dots {
  position: absolute;
  bottom: 50%;
  right: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.dots {
  display: inline-block;
  position: relative;
  z-index: 20;
  opacity: 0.4;
  background-color: white;
  height: 0.75rem;
  width: 0.75rem;
  border-radius: 50%;
  margin: 0.5em 0em;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.4);
}
.active-dot {
  opacity: 1;
}

.show {
  opacity: 1 !important;
}

// .hero-image {
//   height: auto;
//   width: 100%;
// }

.hero__section {
  position: relative;
  z-index: 2;
  height: 100%;
}

.hero__content {
  height: 100%;
  flex-direction: column;
  display: flex;
  justify-content: center;
  max-width: 60%;
  // padding: 2.5rem 0;

  @media (max-width: $tablet) {
    max-width: 80%;
  }
  @media (max-width: $mobile) {
    max-width: 100%;
  }
  h1 {
    margin: 0.25em 0;
    font-size: 3.5rem;
    font-weight: 300;
    @media (max-width: $mobile) {
      font-size: 2.25rem;
    }
  }
  p {
    font-size: 1.3rem;
    margin: 0.5em 0;
    color: grey;
  }
  ul {
    li {
      font-size: 1rem;
      font-weight: 500;
      margin: 1.5rem 0;
      i {
        color: $primary;
        margin-right: 0.5rem;
      }
    }
  }
  &__zipform {
    padding: 0.3em;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 4px;
    @media (max-width: $mobile) {
      flex-direction: column;
      button {
        margin: 1rem 0 0 0;
        width: 100%;
      }
    }
  }
  &__apps {
    display: flex;
    align-items: center;
    margin: 1.25rem 0;
    width: 100%;
    span {
      font-size: 16px;
      font-weight: 500;
      margin-right: 0.5rem;
      white-space: nowrap;
    }
    div {
      margin: 1rem 0;
      max-height: 30px;
      img {
        display: inline-block;
        margin-right: 0.75rem;
        min-width: 100px;
      }
    }

    @media (max-width: $mobile) {
      flex-direction: column;
      align-items: flex-start;
      div {
        margin: 1rem 0;
      }
    }
  }
}

.scroll-indicator {
  position: relative;
  bottom: -20px;
  z-index: 10;
  display: grid;
  place-items: center;
  background-color: white;
  border-radius: 50%;
  height: 50px;
  width: 50px;
  transform: translateY(-45px);
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
  i {
    color: $primary;
  }
  @media (max-width: $mobile) {
    display: none;
  }

  display: none;
}
</style>
