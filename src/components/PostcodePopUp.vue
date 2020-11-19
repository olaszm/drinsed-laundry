<template>
  <transition name="fade">
    <div
      v-show="isPostCodePopUpOpen"
      class="popup"
      @click.self="setisPostcodePopUpOpen(false)"
    >
      <div class="popup__inner wrapper">
        <div class="popup__inner__container">
          <h3>Please enter a postcode to continue</h3>
          <p :class="postCodeError.type">{{ postCodeError.msg }}</p>
          <div class="form-container">
            <BaseInput
              :placeholder="'Enter your post code'"
              :logo="'marker.svg'"
              :name="'popUpInput'"
              :value="location.formatedAddress"
              :label="'Post Code'"
              v-model="postCodeInput"
              ref="popUp"
            />
            <BaseButton @click.native="test">
              <span slot="text">Proceed to payment</span>
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapState } from "vuex";
import BaseButton from "@/components/BaseButton";
import BaseInput from "@/components/BaseInput";
export default {
  components: {
    BaseButton,
    BaseInput,
  },
  data() {
    return {
      postCodeInput: "",
    };
  },
  methods: {
    ...mapActions([
      "initGoogleAutoComplete",
      "checkPostCode",
      "setPostCodeError",
      "setisPostcodePopUpOpen",
    ]),
    test() {
      if (!this.location.formatedAddress) {
        this.setPostCodeError({
          type: "error",
          msg: "Please enter a postcode",
        });
      } else {
        this.setisPostcodePopUpOpen(false);
        this.postCodeInput = "";
        this.$router.push("/checkout");
      }
    },
  },
  computed: {
    ...mapState(["location", "postCodeError", "isPostCodePopUpOpen"]),
  },
  mounted() {
    let input = document.querySelector("#popUpInput");
    this.initGoogleAutoComplete(input);
  },
};
</script>

<style lang='scss' scoped>
@import "@/styles/_variables.scss";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.popup {
  height: 100%;
  width: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.322);
  display: grid;
  place-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  &__inner {
    min-height: 200px;
    max-height: 250px;
    max-width: 650px;
    border-radius: 4px;
    box-shadow: 1px 1px 4px 4px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    display: grid;
    align-items: center;
    &__container {
      padding: 2rem 1rem;
      .form-container {
        margin: 1.5rem 0;
        padding: 0.3em;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 4px;
        div {
          box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.1);
          padding: 0 0.5em;
          border-radius: 4px;
          margin-right: 1rem;
        }
        @media (max-width: $mobile) {
          flex-direction: column;
          div {
            margin-right: 0;
          }
          button {
            margin: 1rem 0 0 0;
            width: 100%;
          }
        }
      }
    }
  }
}
</style>