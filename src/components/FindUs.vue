<template>
  <section class="find-us">
    <div class="find-us__inner wrapper">
      <div class="find-us__inner__content">
        <h2>Find Us</h2>
        <p>Right Around the Corner</p>
        <div class="form">
          <BaseInput
            :placeholder="'Enter your post code'"
            :logo="'marker.svg'"
            :name="'findUsPostCode'"
            :value="location.formatedAddress"
            :label="'Post code'"
      
          />
          <BaseButton class="btn-secondary" @click.native="sendZipCode">
            <span slot="text">Go</span>
          </BaseButton>
        </div>
        <p :class="postCodeError.type">{{ postCodeError.msg }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";
import BaseInput from "@/components/BaseInput";
import BaseButton from "@/components/BaseButton";
export default {
  components: { BaseInput, BaseButton },
  data() {
    return {
      map: "",
 
    };
  },
  computed: {
    ...mapState(["location", "postCodeError"]),
  },
  methods: {
    ...mapActions([
      "initGoogleAutoComplete",
      "checkPostCode",
      "setPostCodeError",
    ]),
    sendZipCode() {
      this.setPostCodeError('')
      if (!this.location.postCode) {
        this.setPostCodeError({type: 'error', msg: 'Please Enter a post code'});
      } else {
        this.checkPostCode(this.location.postCode);
      }
    },
  },
  mounted() {
        let input = document.querySelector("#findUsPostCode");
    this.initGoogleAutoComplete(input);
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";
section {
  background: url("../assets/map_bg.png") no-repeat center;
  background-size: cover;
  height: 100%;
  min-height:450px;
  position: relative;
  display: grid;
  align-items: flex-start;

  justify-items: center;
  &::before {
    content: "";
    display: flex;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    z-index: 0;
    background: linear-gradient(
      0deg,
      rgba(247, 247, 247, 0.02) 0%,
      rgba(255, 255, 255, 0.8) 100%
    );
  }
  @media (max-width: $tablet) {
    align-items: center;
  }
}

.find-us__inner {
  margin-top: 4rem;
  min-width: 275px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  &__content {
    
    width: 80%;
    margin: 0 2rem;
    h2 {
      font-weight: 300;
      font-size: 3.5rem;
      text-shadow: 3px 3px 5px  rgba(0, 0,0, 0.2);
    }
    p {
      font-size: 1.25rem;
      font-weight: 400;
      margin: 0.5rem 0;
    }
    @media (max-width: $tablet) {
      width: 95%;
      margin: 0  ;
    }
  }
}


.form {
  height: 50px;
  padding: 0.3em;
  border-radius: 4px;
  background-color: white;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  button {
    height: 100%;
    width: 55px;
  }
      @media (max-width: $mobile) {
        height: 100%;
        
        flex-direction: column;
        button {
          width: 100%;
        }
    }
}
</style>
