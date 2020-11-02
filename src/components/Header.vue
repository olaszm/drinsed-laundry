<template>
  <header>
    <div class="header__inner wrapper">
      <div class="logo">
        <router-link to="/">
          <img src="@/assets/drinsed-v1b-large.png" alt="Logo" />
        </router-link>
      </div>
      <nav class="nav">
        <mq-layout :mq="['sm', 'md']">
          <ul class="nav_list nav__mobile">
            <li @click="toggleCart">
              <i
                class="fas fa-shopping-cart cart"
                :data-cartItems="getCartLength || 0"
              ></i>
            </li>
            <li @click="toggleMenu"><i class="fas fa-bars mobile-menu"></i></li>
          </ul>
        </mq-layout>
        <mq-layout mq="lg+">
          <ul class="nav_list nav__desktop">
            <li><router-link to="/#how">How We Work</router-link></li>
            <li><router-link to="/#services">Services</router-link></li>

            <li>
              <router-link to="/pricing">Pricing</router-link>
            </li>
            <li>
              <router-link to="/faq">FAQ</router-link>
            </li>
            <li @click="toggleCart">
              <i
                class="fas fa-shopping-cart cart"
                :data-cartItems="getCartLength || 0"
              ></i>
            </li>
          </ul>
        </mq-layout>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["toggleCart", "toggleMenu", "navigateTo"]),
  },

  computed: {
    ...mapGetters(["getCartLength"]),
    isMobileView() {
      var w = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      );
      return w <= 768 ? true : false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

header {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  width: 100%;
  background-color: white;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.3);
  z-index: 15;
}

.header__inner {
  padding: 0.45em 0;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  img {
    max-height: 55px;
  }
  @media (max-width: $desktop) {
    margin-right: 1rem;
    img {
      height: 40px;
    }
  }
}

.nav_list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  width: 100%;
  li {
    margin-right: 3rem;
    white-space: nowrap;
    &:last-child {
      margin-right: 0;
    }
  }
  @media (max-width: $desktop) {
    li {
      margin-right: 1rem;
    }
  }
}

.mobile-menu {
  font-size: 1.25rem;
  margin: 0 0.75rem;
}

.cart {
  position: relative;
  font-size: 1.25rem;
  cursor: pointer;
  &::after {
    content: attr(data-cartItems);
    position: absolute;
    bottom: -50%;
    right: -56%;
    display: grid;
    place-items: center;
    color: white;
    height: 20px;
    width: 20px;
    font-size: 0.75rem;
    background-color: $primary;
    border-radius: 50%;
  }
}
</style>
