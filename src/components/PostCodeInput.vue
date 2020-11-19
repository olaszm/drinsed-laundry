<template>
  <div>
    <div class="form">
      <BaseInput
        :placeholder="'Enter your post code'"
        :logo="'marker.svg'"
        :name="inputName"
        :value="location.formatedAddress"
        :label="'Post Code'"
      />
      <ul class="suggestions">
        <li
          v-for="(item, index) of postCodeSuggestions"
          :key="index"
          @click="pickAddress(item)"
        >
          {{ item.address }}
        </li>
      </ul>
    </div>
    <p v-if="postCodeError" :class="postCodeError.type">
      {{ postCodeError.msg }}
    </p>
  </div>
</template>

<script>
import BaseInput from "@/components/BaseInput";
import { mapState, mapActions } from "vuex";
export default {
  props: {
    inputName: {
      type: String,
    },
  },
  components: { BaseInput },
  data() {
    return {};
  },
  computed: {
    ...mapState(["postCodeSuggestions", "location", "postCodeError"]),
  },
  methods: {
    ...mapActions(["initGetAddress", "pickAddress"]),
  },
  mounted() {
    let input = document.getElementById(`${this.$props.inputName}`);
    this.initGetAddress(input);
  },
};
</script>

<style lang='scss' scoped>
@import "@/styles/_variables.scss";

div {
  width: 100%;
  margin-right: 1rem;
}

.form {
  padding: 0 0.3em;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  position: relative;
    // box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.1);
}

.suggestions {
  visibility: hidden;
  position: absolute;
  z-index: 10;
  width: 100%;
  top: 50px;
  left: 0;
  background-color: white;
  max-height: 125px;
  overflow-y: scroll;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  li {
    padding: 0.4em 0.2em;
    margin: 0;
    height: 100%;
    min-height: 15px;
    width: 100%;
    cursor: pointer;
    // padding: 0 0.25em;
    &:hover {
      background-color: $primary;
    }
  }
}

.open {
  visibility: visible;
}
</style>