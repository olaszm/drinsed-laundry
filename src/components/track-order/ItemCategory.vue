<template>
  <div class="container__category" @click="isOpen = !isOpen">
    <div class="container__category__title">
      <h4>
        {{ category[0].category_name }}
      </h4>
      <div>
        <p>{{ category.length }} Item</p>
        <i class="fas fa-chevron-down" v-if="!isOpen"></i>
        <i class="fas fa-chevron-up" v-else></i>
      </div>
    </div>

    <table class="container__category__items" v-if="isOpen">
      <tr>
        <th>Item</th>
        <th>Qty</th>
        <th>Price</th>
      </tr>
      <tr v-for="(item, i) in category" :key="i">
        <td>{{ item.item_name }}</td>
        <td>{{ item.quantity }}</td>
        <td>£{{ item.price }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["category"],
  data() {
    return {
      isOpen: false,
    };
  },
};
</script>

<style lang='scss' scoped>
@import "@/styles/_variables.scss";

.container__category {
  width: 100%;
  height: 100%;
  &__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    background-color: $primary;
    height: 100%;
    padding: 1rem 0.5rem;
    font-weight: 400;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      width: 95%;
      margin: 0 auto;
      background-color: darken($primary, 10);
    }

    h4 {
      font-weight: 400;
    }
    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 65px;
    }
  }
  &__items {
    width: 100%;
    text-align: left;
    padding: 0 0.5rem;
    tr {
      display: flex;
      justify-content: space-between;
      margin: 0.75rem 0;
      height: 100%;
      width: 100%;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        bottom: -35%;
        height: 1px;
        width: 100%;
        background-color: lightgrey;
      }
    }
  }
}
</style>