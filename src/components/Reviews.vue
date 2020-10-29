<template>
  <div class="review">
    <div class="review__inner wrapper">
      <div class="prev-btn">
        <button class="btn prev" aria-label="previus button" @click="prevReview">
          <i class="fas fa-chevron-left"></i>
        </button>
      </div>
      
      <div class="review__content">
  
          <p>{{currentReview.text}}</p>
          <h4>{{currentReview.review_name}}</h4>
  
        <div class="stars-container">
          <span v-for="(stars,index) in starsRender" :key="index">
            <i class="fas fa-star" :class=" stars == 1 ? 'filled' : '' "></i>
          </span>
        </div>
      </div>
      <div class="next-btn">
        <button class="btn next" aria-label="next button" @click="nextReview">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      interval: {},
      currentReview: "",
      reviews: [
        {
          id: 0,
          text:
            " Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandaerem. Lorem ipsum dolor consectetur adipisicing elit. Repudiandae, rem.",
          review_name: "Sergio Marquiona",
          stars: 4,
        },
        {
          id: 1,
          text:
            " Lorem ipsum dolor sit amet consectetur pisicing elit. Repudiandae, rem.",
          review_name: "Marquiona Sergio",
          stars: 5,
        },
        {
          id: 2,
          text:
            " Lorem ipsum dolor sit amet consectetur pisicing elit. Repudiandae, rem.  consectetur pisicing elit. Repudiandae, rem.",
          review_name: "Marquiona Tets",
          stars: 3,
        },
      ],
    };
  },



  methods: {
    setCurrentReview(id) {
      this.currentReview = this.reviews[id];
    },
    nextReview() {
      let currId = this.currentReview.id;
      if (currId + 1 > this.reviews.length - 1) {
        this.setCurrentReview(0);
      } else {
        this.setCurrentReview(currId + 1);
      }
    },
    prevReview() {
      let currId = this.currentReview.id;
      if (currId - 1 < 0) {
        this.setCurrentReview(this.reviews.length - 1);
      } else {
        this.setCurrentReview(currId - 1);
      }
    },
  },

  computed: {
    starsRender() {
      let s = this.currentReview.stars;
      let arr = [];
      for (let i = 0; i < 5; i++) {
        if (i < s) {
          arr.push(1);
        } else {
          arr.push(0);
        }
      }

      return arr;
    },
  },

  
  mounted() {
    this.setCurrentReview(0);

    this.interval = setInterval(()=> {
      this.nextReview()
    },5000)
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";


.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.review {
  background: url("../assets/reviews_bg.svg") no-repeat;
  background-size: cover;
  min-height: 250px;
  height: 100%;
  color: white;
  display: grid;
  place-items: center;
  padding: 1rem 0;
}

.review__inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.review__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 75%;
  margin: 0 auto;
  text-align: center;

  p {
    line-height: 150%;
    font-size: 1.25rem;

  }
  h4 {
    font-weight: 400;
    font-size: 1.3rem;
    text-transform: uppercase;
    margin: 1.25rem 0;
  }
  @media (max-width: $mobile) {
    width: 85%;
    p {
      font-size: 1rem;
    }
    h4 {
      font-size: 1.15rem;
    }
  }
}

.filled {
  color: $dark;
}

.stars-container {
  i {
    margin-right: 0.3em;
  }
}

.btn {
  background: transparent;
  border: 2px solid white;
  width: 40px;
  height: 40px;
  cursor: pointer;
  i {
    color: white;
  }
  &:hover,
  &:focus {
    background: white;
    i {
      color: $secondary;
    }
  }
}
</style>
