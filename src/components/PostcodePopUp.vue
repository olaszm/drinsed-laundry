<template>
  <transition name="fade">
    <div v-show="isPostCodePopUpOpen" class="popup" @click.self="setisPostcodePopUpOpen(false)">
      <div class="popup__inner wrapper">
        <div class="popup__inner__container">
          <h3>Please enter a postcode to continue</h3>
          <div class="form-container">
            <PostCodeInput inputName="#postcode-popup" @submit="proceedToPCheckout" buttonText="Proceed to payment" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapState } from "vuex";
import PostCodeInput from "@/components/PostCodeInput";
export default {
  components: {
    PostCodeInput,
  },
  data() {
    return {
      postCodeInput: "",
    };
  },
  methods: {
    ...mapActions([
      "checkPostCode",
      "setPostCodeError",
      "setisPostcodePopUpOpen",
    ]),
    proceedToPCheckout() {
      if (!this.location.formatedAddress) {
        this.setPostCodeError({
          type: "error",
          msg: "Please enter a postcode",
        });
      } else if (!this.postCodeError.msg) {
        this.setisPostcodePopUpOpen(false);
        this.postCodeInput = "";
        this.$router.push("/checkout");
      }
    },
  },
  computed: {
    ...mapState(["location", "postCodeError", "isPostCodePopUpOpen"]),
  },
  watch: {
    isPostCodePopUpOpen(newValue) {
      if (newValue === true) {
        this.setPostCodeError({})
      }
    }
  }
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