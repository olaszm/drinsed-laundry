<template>
  <div class="service">
    <div class="service__logo">
      <img :src="require(`@/assets/${logo}`)" :alt="title" />
    </div>
    <div class="service__details">
      <h3>{{ title }}</h3>
      <p>{{ body }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "body", "logo"],
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";
.service {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 3.5rem 0;
  position: relative;
  width: 100%;
  max-width: 450px;
  &__logo {
    margin-right: 1rem;
    img {
      height: 40px;
      width: 40px;
    }
  }
  &__details {
    h3 {
      margin-bottom: 0.5rem;
      font-weight: 400;
      font-size: 1.2rem;
    }
    p {
      line-height: 150%;
      color: grey;
    }
  }
  &::after {
    content: "";
    height: 1px;
    background-color: rgba(128, 128, 128, 0.5);
    width: 100%;
    position: absolute;
    bottom: -25%;
  }
  &:last-child::after {
    height: 0;
  }
  &:hover {
    cursor: pointer;
    h4 {
      color: $primary;
    }
  }
   @media (max-width: $tablet) {
      max-width: unset;
    }
}
</style>
