<template>
  <div class="notfound wrapper">
    <img src="../assets/404.svg" alt="Page Not Found" />
    <h2>Page not found!</h2>
    <router-link to="/">
      <BaseButton class="btn-secondary" @click.native="send">
        <span slot="text">Take me Home</span>
      </BaseButton>
    </router-link>
  </div>
</template>

<script>
import BaseButton from "@/components/BaseButton";
export default {
  components: {
    BaseButton,
  },
};
</script>

<style lang="scss" scoped>
.notfound {
  margin: 5rem auto;
  display: grid;
  place-items: center;
  h2 {
    margin: 1rem 0;
    font-weight: 400;
  }
  img {
    margin: 2rem 0;
    max-height: 400px;
    width: 100%;
  }
}
</style>
