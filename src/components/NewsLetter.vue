<template>
  <section class="newsletter">
    <div class="newsletter__inner wrapper">
      <h2>Get Updates In Your Inbox!</h2>
      <p>Get the latest social media news, trends and tips in your inbox.</p>
      <div class="form">
        <BaseInput
          class="rounded"
          :placeholder="'Enter your email address'"
          :value="email"
          v-model="email"
          label="Email address"
          @keydown.enter="send"
        />
        <BaseButton @click.native="send" :disabled="isLoading">
          <span slot="text" v-if="!isLoading">Subscribe</span>
          <span slot="text" v-else>...</span>
        </BaseButton>
      </div>
      <p v-if="responseMsg" :class="responseMsg.code == 400 ? 'error' : ''">
        {{ responseMsg.message }}
      </p>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import BaseButton from "@/components/BaseButton";
import BaseInput from "@/components/BaseInput";
export default {
  components: {
    BaseButton,
    BaseInput,
  },
  data() {
    return {
      responseMsg: {},
      email: "",
      isLoading: false,
    };
  },
  methods: {
    ...mapActions(["validEmail", "subscribeToNewsLetter"]),
    send() {
      if (this.email) {
        this.validEmail(this.email).then((res) => {
          if (res) {
            this.$Progress.start();
            this.isLoading = true;
            this.subscribeToNewsLetter(this.email)
              .then((res) => {
                this.$Progress.finish();
                this.isLoading = false;
                this.responseMsg = res;
                this.email = "";
                console.log(res);
              })
              .catch((err) => console.error(err));
          } else {
            this.$Progress.fail();
            this.responseMsg = {
              code: 400,
              message: "Email address is invalid!",
            };
          }
        });
      } else {
        this.$Progress.fail();
        this.responseMsg = {
          code: 400,
          message: "Email address is empty!",
        };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

section {
  background: $medium-grey;
  height: 100%;
  display: grid;
  place-items: center;
  text-align: center;
  padding: 2rem 0;
}

.newsletter__inner {
  max-width: 600px;
  color: white;
  h2 {
    font-weight: 300;
    font-size: 2.5rem;
  }
  p {
    margin: 1rem 0;
  }
}

.form {
  height: 45px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  button {
    height: 100%;
    width: 195px;
    margin-left: 1rem;
  }
  @media (max-width: $mobile) {
    height: 90px;
    flex-direction: column;
    input {
      height: 45px;
    }
    button {
      margin-left: 0;
      margin-top: 0.5rem;
      width: 100%;
    }
  }
}
</style>
