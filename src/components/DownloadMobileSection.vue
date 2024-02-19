<template>
  <section class="download">
    <img class="stamp" src="@/images/stamp.svg" alt="" />
    <div class="download__inner wrapper">
      <img
        class="mobile-mockup"
        src="@/images/mobile-mockup.png"
        alt="Mobile Mockup"
      />
      <div class="download__inner__content">
        <h3>Download The App Now!</h3>
        <p>The Drinsed is App is now available in the Apple Store.</p>
        <div>
           <a href="https://apps.apple.com/us/app/drinsed/id1509482600">
              <img src="@/images/app_store.svg" alt="App Play Store Logo" />
            </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";
section {
  background: url("../images/download_section_bg.svg") no-repeat;
  background-size: cover;
  height: 100%;
  position: relative;
  display: grid;
  align-items: center;
  justify-items: center;
}

.stamp {
  position: absolute;
  top: -10%;
  right: 10%;
  height: 150px;
  @media (max-width: $tablet) {
    height: 125px;
  }
  @media (max-width: $mobile) {
    height: 100px;
  }
}

.download__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3rem 0;
  .mobile-mockup {
    max-height: 500px;
    height: 100%;
  }
  &__content {
    margin-left: 5rem;
    h3 {
      font-weight: 300;
      font-size: 2rem;
      position: relative;
      &::after {
        position: absolute;
        content: "";
        bottom: -10px;
        left: 0%;
        transform: translate(0%);
        border-radius: 10px;
        height: 3px;
        width: 45px;
        background: $primary;
      }
    }
    p {
      font-size: 1.25rem;
      font-weight: 400;
      margin: 1rem 0;
    }
    div {
      cursor: pointer;
      margin: 1rem 0;
      img {
        &:first-child {
          margin-right: 1rem;
        }
      }
    }
  }
  @media (max-width: $mobile) {
    flex-direction: column;
    .mobile-mockup {
      height: 150px;
    }
    &__content {
      margin: 0;
      margin-top: 2rem;
    }
  }
}
</style>
