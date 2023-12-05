<template>
  <div class="card" :class="isOpen ? 'open' : ''" @click.self="openModal" @keydown.enter="openModal">
    <div class="card__inner" @click="openModal">
      <div class="img-container">
        <img :src="require(`../images${service.image}`)" alt />
      </div>
      <div class="content-container">
        <div class="content">
          <h2>{{ service.name }}</h2>
          <p>{{ service.description }}</p>
        </div>
        <div
          class="detergent-button"
          v-if="service.detergent == 1 && isOpen"
          @click.stop="isEcoFriendly = !isEcoFriendly"
        >
          <input type="checkbox" name="detergent" v-model="isEcoFriendly" aria-label="detergent checkbox" />
          Use Eco friendly detergent
        </div>
      </div>
    </div>

    <div v-show="isOpen" class="items-container">
      <h3>Select Items</h3>

      <div class="items__inner">
        <ServiceCard
          v-for="(item, index) in service.items"
          :key="index"
          :item="item"
          :serviceName="service.name"
          :ecoFriendly="isEcoFriendly"
          
        />
      </div>
    </div>
    <div class="chevron" @click="openModal">
      <i class="fas" :class="isOpen ? 'fa-caret-up' : ' fa-caret-down'"></i>
    </div>
  </div>
</template>

<script>
import ServiceCard from "@/components/ServiceCard";
import { mapActions } from "vuex";
export default {
  props: ["service"],
  components: { ServiceCard },
  data() {
    return {
      isOpen: false,
      isEcoFriendly: false,
    };
  },
  methods: {
    ...mapActions(["addItemToCart", "removeCartItem"]),
    openModal() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

.open {
  background-color: white !important;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
}

.card {
  background-color: $light-grey;
  margin: 2.5rem 0;
  border-radius: 4px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  transition: all 300ms ease-in-out;
}

.chevron {
  position: absolute;
  right: 0;
  top: 0;
  height: 35px;
  width: 35px;
  border-top-right-radius: 4px;
  background-color: $medium-grey;
  display: grid;
  place-items: center;
  i {
    color: white;
  }
}

.card__inner {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  .img-container {
    height: 75px;
    width: 75px;
    border-radius: 50%;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .content-container {
    display: flex;
    justify-content: space-between;
    width: 85%;
    margin-left: 2rem;
    cursor: pointer;
    .detergent-button {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: $primary;
      padding: 0.25em 0.75em;
      border-radius: 4px;
      color: white;
      input[type="checkbox"] {
        margin: 0 0.75rem;
        border: none;
      }
    }
    @media (max-width: $mobile) {
      flex-direction: column;

      .detergent-button {
        margin: 1rem 0;
      }
    }
  }
  .content {
    h2 {
      font-weight: 300;
      font-size: 1.25rem;
    }
    p {
      color: grey;
    }
  }
}

.items-container {
  width: 100%;
  h3 {
    text-align: center;
    font-weight: 400;
    color: grey;
    margin: 1rem 0;
  }
  .items__inner {
    height: 100%;
    width: 100%;
    display: grid;
    align-items: center;
    justify-items: flex-start;
    grid-template-columns: repeat(2, minmax(200px, 1fr));
    div {
      width: 90%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0.3rem auto;
      padding: 0.85em;
      background-color: $light-grey;
      border-radius: 4px;
    }

    @media (max-width: $tablet) {
      grid-template-columns: repeat(1, minmax(200px, 1fr));
      div {
        width: 100%;
      }
    }
  }
}
</style>
