<template>
  <div
    class="slot_container"
    :class="this.active.value == this.value ? 'checked' : ''"
         @keydown.enter="handleCheck"
               @click="handleCheck"
     
  >
    <label class="radio">
      <span class="radio__input">
        <input
          type="radio"
          :value="value"
          :name="name"
    
          :checked="this.active.value == this.value"
        />
        <span class="radio__control"></span>
      </span>
      <span class="radio__label">
        <p>
          <span>
            {{ date }}
          </span>
          <span>
            {{ hour }}
          </span>
        </p>
      </span>
    </label>
  </div>
</template>

<script>
export default {
  props: ["date", "hour", "value", "name", "active"],
  data() {
    return {};
  },
  model: {
    prop: "activePickUpTime",
    event: "updatePickUpTime",
  },
  methods: {
    handleCheck() {
      let obj = {
        value: this.value,
        date: this.date,
        slot: this.hour,
      };
      this.$emit("updatePickUpTime", obj);
    },
  },
};
</script>

<style lang='scss' scoped>
@import "@/styles/_variables.scss";
.slot_container {
  border: 1px solid $primary;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5em;
  min-height: 44px;
  margin: 0.5em .75rem;
  &:focus-within{
  background-color: $primary; 
  color: white;;
  }
  &:last-child {
    margin-bottom: 1rem;
  }
}

.radio {
  color: currentColor;
  display: grid;
  grid-template-columns: min-content auto;
  grid-gap: 0.5em;
  width: 100%;
  cursor: pointer;
  input {
    opacity: 0;
    width: 0;
    height: 0;
    &:checked + .radio__control {
      background: radial-gradient($secondary 50%, rgba(255, 0, 0, 0) 51%);
    }
  }
  .radio__control {
    display: block;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    border: 0.1em solid grey;
    transform: translateY(0.25em);
  }
  .radio__input {
    display: flex;
  }
  .radio__label {
    line-height: 1;
    width: 100%;
    p {
      width: 90%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
    }
  }
}

.checked {
  background-color: $primary;
  color: white;
}
</style>