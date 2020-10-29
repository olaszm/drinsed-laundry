<template>
  <button>
    <slot name="text"></slot>
  </button>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";
button {
  border: none;
  background-color: transparent;
  font-family: inherit;
  padding: 0;
  cursor: pointer;
  font-weight: 400;
  border-radius: 3px;
  background-color: $primary;
  padding: 0.25em 0.75em;
  min-width: 10ch;
  min-height: 44px;
  height: 100%;
  text-align: center;
  line-height: 1.1;
  // white-space: nowrap;
  color: white;
  transition: all 150ms ease-out;
  &:hover,&:focus{
    transform: translateY(1px);
    box-shadow: 0px 2px 10px 0 rgba($color: black, $alpha: .45)
  }
  &:disabled {
    cursor: initial;
    background-color: grey;
  }
}

.btn {
  &-secondary {
    background-color: $secondary;
    color: white;
  }
  &-small {
    min-height: 30px;
  }
}
</style>
