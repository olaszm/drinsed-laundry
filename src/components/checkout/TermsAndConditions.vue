<template>
  <div class="terms">
    <p>
      We will reserve the final amount on your card once you have placed your
      order and only charge once we cleaned your items.
      <router-link to="/faq">Payment FAQ
      </router-link>
    </p>
    <p>
      <input aria-label="subscribe checkbox" type="checkbox" v-model="subscribe" /> I want to receive exclusive
      Drinsed news and special offers.
    </p>
    <p>
      <input aria-label="accept terms and conditions" type="checkbox" v-model="agreeTerms" />
      I accept the <router-link class="link" to="/terms"> Drinsed Terms & Conditions </router-link> and
      <router-link class="link" to="/privacy">
        Drinsed Privacy Policy
      </router-link>.<span class="error">*</span>
    </p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  props: ["error"],
  data() {
    return {
      subscribe: false,
      agreeTerms: false,
    };
  },
  methdos: {},
  watch: {
    subscribe(value) {
      this.$emit("onSubscribeToggle", value);
    },
    agreeTerms(value) {
      this.$emit("onTermsToggle", value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

.terms {
  margin: 2rem 0;

  p {
    margin: 1rem 0;
  }
}
.link {
  color: $primary;
  font-weight: 400;
  text-decoration: underline;
}
</style>
