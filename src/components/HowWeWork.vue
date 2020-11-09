<template>
  <section class="how">
    <div class="how__inner wrapper">
      <div class="how__text">
        <h2>How Drinsed Works</h2>
        <p>
          Book a collection via our app or website and we’ll bring the bags for
          you. In just 48 hours we’ll deliver your laundry and dry cleaning
          directly to your door.
        </p>
      </div>
      <!-- <div class="how__progress-bar">
        <img
          class="progress-bar"
          src="@/assets/progress-bar.png"
          alt="How We Work Steps"
        />
      </div> -->
      <div class="how__steps__container">
        <WorkSteps
          v-for="(step, index) in steps"
          :key="index"
          :title="step.title"
          :url="step.url"
          :text="step.text"
        />
      </div>
      <router-link to="/pricing">
        <BaseButton class="btn-secondary">
          <span slot="text">Order Now</span>
        </BaseButton>
      </router-link>
    </div>
  </section>
</template>

<script>
import BaseButton from "@/components/BaseButton";
import WorkSteps from "@/components/WorkSteps";
export default {
  components: {
    WorkSteps,
    BaseButton,
  },
  data() {
    return {
      steps: [
        {
          title: "We Collect",
          text:
            "Simply choose a collection time that suits you, any day of the week.",
          url: "step-1.svg",
        },
        {
          title: "We Clean",
          text: "Our dedicated team will clean your items with quality care.",
          url: "step-2.svg",
        },
        {
          title: "We Deliver",
          text: "We’ll deliver your items to you in as little as 48 hours.",
          url: "step-3.svg",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";
section {
  background: url("../assets/how-we-work-bg.svg") no-repeat 100%;
  background-size: 100% 100%;
  background-color: #f7f9fc;
  min-height: 80vh;
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
  text-align: center;
}

.how__text {
  margin: 2rem auto;
  text-align: center;
  max-width: 800px;
  h2 {
    font-weight: 300;
    font-size: 3.5rem;
    margin: 1rem 0;
    @media (max-width: $mobile) {
      font-size: 2.25rem;
    }
  }
  p {
    font-size: 1.2rem;
    color: grey;
    line-height: 160%;
    @media (max-width: $mobile) {
      font-size: 1rem;
    }
  }
}

// .progress-bar {
//   @media (max-width: $desktop) {
//     // height: 45px;
//     width: 80%;
//   }
//   @media (max-width: $tablet) {
//     display: none;
//   }
// }

.how__steps__container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  // margin: 0;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
  @media (max-width: $tablet) {
    flex-wrap: wrap;
    justify-content: center;
  }
}

button {
  margin: 2.5rem 0;
}
</style>
