<template>
  <div class="track">
    <Banner>
      <h1 slot="title">Order <span>Summary</span></h1>
      <p slot="text">{{ formatOrderStatus }} - {{ formatDate }}</p>
    </Banner>

    <div class="track__inner wrapper" v-if="error"></div>
    <div class="track__inner wrapper" v-else>
      <div class="track__inner__container">
        <div class="track__inner__details">
          <h2>Details</h2>
          <div class="container">
            <div class="container__row">
              <h4>Booking ID</h4>
              <p>DRINS-{{ order.id }}</p>
            </div>
            <div class="container__row">
              <h4>Address</h4>
              <p>{{ order.pickup_location }}</p>
            </div>
            <div class="container__row">
              <h4>Post Code</h4>
              <p>
                {{
                  order.pickup_postcode
                    ? order.pickup_postcode.toUpperCase()
                    : ""
                }}
              </p>
            </div>
            <div class="container__row">
              <h4>Pickup Date</h4>
              <p>{{ order.pickup_date }} - {{ order.pickup_time }}</p>
            </div>
            <div class="container__row">
              <h4>Delivery Date</h4>
              <p>{{ order.delivery_date }} - {{ order.delivery_time }}</p>
            </div>
            <div class="container__row">
              <h4>Email</h4>
              <p>{{ user.email }}</p>
            </div>
            <div class="container__row">
              <h4>Name</h4>
              <p>{{ user.full_name }}</p>
            </div>
            <div class="container__row">
              <h4>Phone Number</h4>
              <p>{{ user.phone_number }}</p>
            </div>
          </div>
        </div>

        <div class="track__inner__order">
          <h2>Order Summary</h2>
          <div class="container">
            <ItemCategory
              v-for="(category, index) in items"
              :key="index"
              :category="category"
            />

            <div class="container__row">
              <h4>Price</h4>
              <span class="primary-bold primary"
                >£{{ this.order.order_amount ? formatPrice : 0 }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemCategory from "@/components/track-order/ItemCategory";
import Banner from "@/components/Banner";
export default {
  components: { ItemCategory, Banner },
  data() {
    return {
      user: {},
      order: {},
      items: {},
      error: "",
    };
  },
  computed: {
    formatDate() {
      let date = new Date(this.order.created_at);
      let formattedDate = `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
      return formattedDate;
    },
    formatPrice() {
      return Number(this.order.order_amount).toFixed(2);
    },
    formatOrderStatus() {
      let status = this.order.order_status;
      let formatedStatus = "";
      if (status == "1") {
        formatedStatus = "Service Booked";
      } else if (status == "2") {
        formatedStatus = "Order Picked Up";
      } else if (status == "8") {
        formatedStatus = "Order Delivered";
      }

      return formatedStatus;
    },
  },
  async created() {
    this.$Progress.start();
    let orderId = this.$route.params.id;
    let res = await fetch(
      `${process.env.VUE_APP_URL}/website/track_order/${orderId}`
    );

    let data = await res.json();
    if (data.error) {
      this.$Progress.fail();
      this.$router.push("/404");
    } else {
      this.$Progress.finish();
      this.user = data.response.user;
      this.order = data.response.order;
      this.items = data.response.items;
    }
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";

.track__inner {
  margin: 5rem auto;
  h2 {
    margin: 1.5rem 0;
    font-weight: 300;
    font-size: 1.95rem;
    position: relative;
    &::after {
      position: absolute;
      content: "";
      bottom: -5px;
      left: 0%;
      border-radius: 10px;
      height: 3px;
      width: 45px;
      background: $primary;
    }
  }
  &__status,
  &__order,
  &__details {
    width: 100%;
    margin: 0.5rem 2rem;
    @media (max-width: $desktop) {
      margin: 0.5rem 0;
    }
    h3 {
      font-weight: 400;
    }
  }

  &__status {
    text-align: center;
    h2,
    h3,
    h4 {
      font-weight: 300;
    }
  }
}

.track__inner__container {
  position: relative;
  z-index: 2;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  height: 100%;
  background-color: white;
  border-radius: 4px;
  overflow-y: hidden;
  padding: 0 1rem;
  margin: 0 auto;

  @media (min-width: $desktop) {
    display: flex;
    width: 100%;
    align-items: flex-start;
    justify-content: space-between;
  }
}

.container {
  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    min-height: 45px;
    position: relative;
    padding: 0.25em 0;
    p {
      width: 100%;
      text-align: left;
    }
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      height: 1px;
      width: 100%;
      background-color: lightgrey;
    }
    &:last-child::after {
      display: none;
    }
    h4 {
      font-weight: 400;
      width: 100%;
    }
  }
}
</style>
