<template>
  <div class="step">
    <img :src="require(`@/assets/${url}`)" alt="Collect" />
    <h3>{{ title }}</h3>
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: ["url", "text", "title"],
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 1rem 2rem;
  h3 {
    margin: 1rem 0;
    margin-bottom: 2.5rem;
    position: relative;
    font-weight: 400;
    font-size: 1.5rem;
    &::after {
      position: absolute;
      content: "";
      bottom: -15px;
      left: 50%;
      transform: translate(-50%);
      border-radius: 10px;
      height: 3px;
      width: 35px;
      background: $primary;
    }
  }
  p {
    color: grey;
    margin: 0.5rem 0;
    max-width: 300px;
  }
  img {
    // width: 100%;
    height: auto;
    // width: 100%;
  }

  @media (max-width: $mobile) {
    margin: 1rem auto;
  }
}
</style>
