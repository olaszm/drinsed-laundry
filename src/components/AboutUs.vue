<template>
  <section class="about">
    <div class="about__inner wrapper">
      <img class="logo" src="@/assets/logo_big.svg" alt="logo" />
      <div class="about__inner__content">
        <h2>About Us</h2>
        <p>
          We are a team of Dry Cleaners and Laundrettes with more than 25 years
          of experience in caring for your laundry needs. Taking the hassel out
          of your laundry and ironing chores, we collect and deliver for free,
          with timeslots to suit you.
        </p>
        <div class="cofounder-card">
          <img src="@/assets/founder.svg" alt="Co-Founder Naima Iqbal" />
          <div>
            <h3>Naima Iqbal</h3>
            <p>Co-Founder</p>
          </div>
        </div>
        <div class="invite">
          <h3>Get Updates In Your Inbox!</h3>
          <p>
            Get the latest social media news, trends and tips in your inbox.
          </p>
          <div class="form">
            <BaseInput
              :placeholder="'Enter email address'"
              v-model="email"
              @keydown.enter="send"
              :label="'Enter email'"
            />
            <BaseButton @click.native="send" :disabled='isLoading'>
              <span slot="text" v-if="!isLoading">Subscribe</span>
              <span slot="text" v-else>...</span>
            </BaseButton>
          </div>
          <p v-if="responseMsg" :class="responseMsg.code == 400 ? 'error' : ''">
            {{ responseMsg.message }}
          </p>
        </div>
      </div>
    </div>
    <div class="stamp">
      <img src="@/assets/stamp.svg" alt="certified cleaners stamp" />
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import BaseInput from "@/components/BaseInput";
import BaseButton from "@/components/BaseButton";
export default {
  components: {
    BaseInput,
    BaseButton,
  },
  data() {
    return {
      responseMsg: {},
      email: "",
      isLoading: false,
    };
  },

  methods: {
    ...mapActions(["validEmail", "sendEmail"]),

    send() {
      if (this.email) {
        this.validEmail(this.email).then((res) => {
          if (res) {
            this.$Progress.start();
            this.isLoading = true;
            this.sendEmail(this.email).then((res) => {
              this.$Progress.finish();
              this.isLoading = false;
              this.responseMsg = res;
              this.email = "";
            });
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

.about {
  height: 100%;
  margin: 2rem 0;
  position: relative;
}
.about__inner {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;

  .logo {
    margin: 2rem 0;
    width: 550px;
    height: auto;
    min-width: 250px;
    max-height: 350px;
    flex-basis: 2;
  }
  &__content {
    flex-basis: 4;
    min-width: 250px;
    margin-left: 8rem;
    h2 {
      font-weight: 300;
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    p {
      line-height: 150%;
    }
    .highlight {
      color: $primary;
    }
  }
  @media (max-width: $tablet) {
  }
  @media (max-width: $tablet) {
    flex-direction: column;
    .logo {
      height: 150px;
      margin-top: 0;
    }
    &__content {
      margin-left: 0;
    }
  }
}

.cofounder-card {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 1rem 0;
  img {
    height: 70px;
    width: 70px;
    border-radius: 50%;
    margin-right: 1rem;
  }
}

.invite {
  background: $medium-grey;
  color: white;
  padding: 2rem;
  border-radius: 4px;
  font-weight: 400;
  h3 {
    font-weight: 400;
    font-size: 2rem;
  }
  p {
    margin: 0.5rem 0;
  }
  @media (max-width: $mobile) {
    padding: 2rem 1rem;
  }
}

.form {
  height: 55px;
  padding: 0.3em;
  background-color: white;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  button {
    height: 100%;
    width: 195px;
  }
  @media (max-width: $mobile) {
    flex-direction: column;
    height: 120px;
    button {
      margin-top: 1rem;
      width: 100%;
    }
  }
}

.stamp {
  position: absolute;
  // bottom: -25%;
  // transform: translate(0, 50%);
  right: 10%;
  z-index: 2;
}
</style>
