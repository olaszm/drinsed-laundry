<template>
  <div class="social_links">
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
      <a href="https://www.instagram.com/drinsed/" aria-label="Instagram Logo">
        <i class="fab fa-instagram"></i>
      </a>
    </div>
    <div class="logo">
      <a href="https://twitter.com/drinsed" aria-label="Twitter Logo">
        <i class="fab fa-twitter"></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
@import "@/styles/_variables.scss";

.social_links {
  display: flex;
  margin-top: 1rem;
  color: white;
  .logo {
    button {
      border: none;
      background-color: transparent;
      color: white;
    }
    display: grid;
    place-items: center;
    margin-right: 0.375rem;
    background-color: $primary;
    border-radius: 50%;
    height: 35px;
    width: 35px;
    transition: background-color 250ms ease;
    cursor: pointer;
    &:hover,
    &:focus-within {
      background-color: $secondary;
    }
  }
}
</style>