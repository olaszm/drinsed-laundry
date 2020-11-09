<template>
  <transition name="slide-in">
    <div class="nav__container mobile-menu" v-if="isMenuOpen">
      <div class="nav__header mobile-menu">
        <router-link to="/">
          <img src="@/assets/logo_big.svg" alt="" />
        </router-link>
      </div>
      <ul class="nav__container__inner mobile-menu">
        <button class="close" @click="toggleMenu" aria-label="close menu">
          <i class="fas fa-times"></i>
        </button>
        <router-link to="/#how">
          <li>How We Work</li>
        </router-link>
        <router-link to="/#services">
          <li>Services</li>
        </router-link>
        <!-- <li @click="navigateTo('#how')">How we work</li>
        <li @click="navigateTo('#services')">Services</li> -->
        <router-link to="/pricing">
          <li>Pricing</li>
        </router-link>
        <router-link to="/faq">
          <li>FAQ</li>
        </router-link>
        <!-- <li><router-link to="/services">Pricing</router-link></li> -->
      </ul>

      <div class="nav__content__social__links">
        <div class="logo">
          <a href="https://www.facebook.com/drinsed" aria-label="Facebook Logo">
            <i class="fab fa-facebook-f"></i>
          </a>
        </div>
        <div class="logo">
          <a href="#" aria-label="LinkedIn Logo">
            <i class="fab fa-linkedin"></i>
          </a>
        </div>
        <div class="logo">
          <a
            href="https://www.instagram.com/drinsed/"
            aria-label="Instagram Logo"
          >
            <i class="fab fa-instagram"></i>
          </a>
        </div>
        <div class="logo">
          <a href="https://twitter.com/drinsed" aria-label="Twitter Logo">
            <i class="fab fa-twitter"></i>
          </a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["isMenuOpen"]),
  },
  methods: {
    ...mapActions(["toggleMenu", "navigateTo"]),
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

.nav__container {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: white;
  height: 100%;
  width: 30%;
  z-index: 10;
  display: none;
  box-shadow: -8px 0px 10px rgba(0, 0, 0, 0.2);
  display: none;

  @media (max-width: $tablet) {
    display: block;
    width: 60%;
  }
  @media (max-width: $mobile) {
    display: block;
    width: 80%;
  }
}

.close {
  border: none;
  background-color: transparent;
  height: 20px;
  position: absolute;
  right: 20px;
  top: 20px;
  bottom: 0;
  transition: color 250ms;
  cursor: pointer;
  &:hover,
  &:focus {
    color: $secondary;
  }
}

.nav__container__inner {
  margin: 5rem 0;
  text-align: center;
  li {
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 50px;
    transition: background-color 250ms ease;
    cursor: pointer;
    &:hover,
    &:focus-within,
    &:active {
      background-color: rgba(211, 211, 211, 0.3);
    }
  }
}

.nav__header {
  img {
    margin: 1rem;
    height: 45px;
    width: 45px;
  }
}

.nav__content__social__links {
  display: flex;
  margin-top: 1rem;
  justify-content: center;
  .logo {
    color: white;
    display: grid;
    place-items: center;
    margin-right: 0.375rem;
    background-color: $primary;
    border-radius: 50%;
    height: 35px;
    width: 35px;
    transition: background-color 250ms ease;
    cursor: pointer;
    button {
      border: none;
      background-color: transparent;
      color: white;
    }
    &:hover,
    &:focus-within {
      background-color: $secondary;
    }
  }
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
