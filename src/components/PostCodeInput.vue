<template>
  <div class="form-wrapper">
    <div class="form">
      <BaseInput :placeholder="'Enter your post code'" :logo="'marker.svg'" :name="inputName"
        :modelValue="location.formatedAddress" @update:modelValue="willHandlePostcodeInput" :label="'Post Code'"
        @my-focus="handleFocus" />

      <BaseButton :disabled="postCodeError.type === 'error'" class="btn-secondary" @click.native="$emit('submit')">
        <span slot="text">{{ buttonText }}</span>
      </BaseButton>
    </div>
    <div v-if="postCodeError.msg" class="error-container">
      <p :class="postCodeError.type">
        {{ postCodeError.msg }}
      </p>
    </div>
    <ul :class="getElementName" v-if="isSuggestionsOpen && postCodeSuggestions.length" class="suggestions">
      <li v-for="(item, index) of postCodeSuggestions" :key="index" @click.self="willPickAddress(item)">
        {{ item.address }}
      </li>
    </ul>
  </div>
</template>

<script>
import BaseInput from "@/components/BaseInput";
import BaseButton from "@/components/BaseButton";

import { mapState, mapActions } from "vuex";
export default {
  props: {
    inputName: {
      type: String,
    },
    buttonText: {
      type: String,
      default: 'Submit'
    }
  },
  components: { BaseInput, BaseButton, },
  data() {
    return {
      isSuggestionsOpen: false
    };
  },
  computed: {
    getElementName() {
      let inputName = this.$props.inputName.substring(1)
      return inputName + '-suggestions'
    },
    ...mapState(["postCodeSuggestions", "location", "postCodeError"]),
  },
  methods: {
    ...mapActions(["initGetAddress", "pickAddress", "checkPostCode", 'setPostCodeError']),
    handleFocus() {
      this.isSuggestionsOpen = true
    },
    handleBlur() {
      this.isSuggestionsOpen = false
    },
    async willHandlePostcodeInput(value) {
      // TODO: Add debounce here
      if (value.length >= 3) {
        const response = await this.initGetAddress(value)

        if (response) {
          console.log(response)
          // TODO: uncomment this 
          // this.setPostCodeError({
          //   type: 'error',
          //   msg: 'Something went wrong, try again later!'
          // })
        }

        return
      }


      this.setPostCodeError({ type: undefined, msg: undefined })
    },
    async willPickAddress(address) {
      const { postcode } = await this.pickAddress(address)


      if (postcode) {
        const { error } = await this.checkPostCode(postcode)

        if (error) {
          const { message } = error

          this.setPostCodeError({
            type: "error",
            msg: message
          })

          this.handleBlur()

          return
        }
      }

      this.handleBlur()
    }
  },
};
</script>

<style lang='scss' scoped>
@import "@/styles/_variables.scss";

.form {
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  gap: 10px;
  // box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.1);
}

.form-wrapper {
  position: relative;
  padding: 0 0.5rem;
  width: 100%;

}

.error-container {
  margin-top: .5em;
  width: 100%;
}

.suggestions {
  position: absolute;
  z-index: 10;
  width: 100%;
  top: 45px;
  left: 0;
  right: 0;
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
</style>