<template>
  <div>
    <div class="container">
      <img
        :src="require(`@/assets/${logo}`)"
        alt="place-holder-logo"
        v-if="logo"
      />
      <input
        :readonly="readonly"
        :pattern="pattern"
        :aria-label="label"
        :type="type"
        :placeholder="placeholder"
        :value="value"
        @input="$emit('input', $event.target.value)"
        :id="name"
        :maxlength="max"
      />
    </div>
    <p class="error" v-if="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      default: "text",
      type: String,
      // required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    logo: {
      required: false,
    },
    label: {
      required: true,
    },
    readonly: {},
    value: {},
    name: {},
    pattern: {},
    error: {},
    max: {},
  },
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    handleInput(event) {
      // console.log(event);
      this.$emit("test", event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  height: 100%;
  width: 100%;
  p {
    margin: 0.5rem 0;
  }
}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  img {
    margin-right: 0.5rem;
  }
  input {
    border: none;
    width: 100%;
    height: 100%;
    font-family: inherit;
    padding: 0 0.2rem;
    border: 1px solid transparent;
    border-radius: 4px;
    min-height: 40px;
    &:read-only {
      border: none;
      cursor: default;
      background-color: lightgrey;
    }
  }
}
</style>
