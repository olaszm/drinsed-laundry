<template>
  <div>
    <HeroSection />
    <HowWeWork id="how" />
    <ServicesSection id="services" />
    <Reviews />
    <AffordablePricesSection />
    <!-- <AboutUs />
    <FindUs /> -->
    <DownloadMobileSection />
    <NewsLetter />
  </div>
</template>

<script>
// @ is an alias to /src

import HeroSection from "@/components/HeroSection.vue";
import ServicesSection from "@/components/ServicesSection";
import AffordablePricesSection from "@/components/AffordablePricesSection";
import HowWeWork from "@/components/HowWeWork.vue";
import Reviews from "@/components/Reviews.vue";
// import AboutUs from "@/components/AboutUs.vue";
// import FindUs from "@/components/FindUs.vue";
import DownloadMobileSection from "@/components/DownloadMobileSection.vue";
import NewsLetter from "@/components/NewsLetter";
export default {
  name: "Home",
  components: {
    HeroSection,
    HowWeWork,
    ServicesSection,
    Reviews,
    AffordablePricesSection,
    NewsLetter,
    DownloadMobileSection,
  },
};
</script>

<style lang="scss" scoped>
div {
  overflow-x: hidden;
}
</style>
