<template>
  <div class="header">
    <div class="header__inner wrapper">
      <slot name="title"> </slot>
      <slot name="text"> </slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

.header {
  background: url("../assets/services-header.svg") no-repeat;
  background-size: cover;
  height: 100%;
  // min-height: 250px;
}

.header__inner {
  padding: 1.25rem 0;
  text-align: center;
  display: grid;
  place-items: center;
  h1 {
    font-weight: 400;
    font-size: 3rem;
    margin: 0.5rem;
    span {
      color: $primary;
    }
  }
  p {
    line-height: 150%;
    font-size: 1.25rem;
    color: grey;
    width: 75%;
    max-width: 750px;
  }
  @media (max-width: $mobile) {
    h1 {
      font-size: 2rem;
    }
    p {
      font-size: 1.1rem;
    }
  }
}
</style>
