<template>
  <div class="card">
    <img :src="require(`@/images/${img}`)" alt />
    <img :src="require(`@/images/${hoverImg}`)" alt />
    <p>{{ text }}</p>
    <h3>{{ title }}</h3>
  </div>
</template>

<script>
export default {
  props: ["text", "img", "title", "hoverImg"],
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

.card {
  padding: 3rem 0;
  background: $light-grey;
  height: 100%;
  width: 100%;
  min-width: 225px;
  cursor: pointer;
  transition: background-color 200ms ease-in-out;
  border-radius: 4px;
  margin: 1rem;
  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
    max-height: 150px;
    &:nth-child(2) {
      opacity: 0;
      visibility: hidden;
      display: none;
    }
  }
  p {
    font-size: 1.3rem;
    font-weight: 400;
  }
  h3 {
    // margin-top: 2rem;
    color: black;
    font-size: 1.3rem;
    font-weight: 400;
    position: relative;
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
  &:hover,
  &:focus {
    background-color: $primary;
    img {
      &:first-child {
        opacity: 0;
        visibility: hidden;
        display: none;
      }
      &:nth-child(2) {
        opacity: 1;
        visibility: visible;
        display: block;
      }
    }
    h3,
    p {
      color: white;
    }
    h5 {
      &::after {
        background: white;
      }
    }
  }
}
</style>
