<template>
  <footer>
    <div class="wrapper">
      <div class="footer__navigation">
        <div class="footer__navigation__sitemap">
          <ul>
            <li><router-link to="/#how"> How We Work</router-link></li>
            <li><router-link to="/#services">Services</router-link></li>
            <li>
              <router-link to="/pricing">Pricing</router-link>
            </li>
            <li>
              <router-link to="/faq">FAQ</router-link>
            </li>
          </ul>
        </div>
        <div class="footer__navigation__terms">
          <ul>
            <li>
              <router-link to="/covid-resources"
                >COVID-19 Resources</router-link
              >
            </li>
            <li>
              <router-link to="/terms">Terms and Conditions</router-link>
            </li>
            <li>
              <router-link to="/privacy">Privacy</router-link>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer__content">
        <div class="footer__content__apps">
          <h3>Download App</h3>
          <div class="footer__content__apps__logos">
            <img src="@/assets/play_store.svg" alt="Google Play Store Logo" />
            <img src="@/assets/app_store.svg" alt="App Play Store Logo" />
          </div>
        </div>

        <div class="footer__content__social">
          <img
            class="footer__content__social__logo"
            src="@/assets/logo-white-small.png"
            alt="Drinsed Logo"
          />
          <p>On-demand laundry and dry cleaning direct to your door.</p>
          <div class="footer__content__social__links">
            <div class="logo">
              <a
                href="https://www.facebook.com/drinsed"
                aria-label="Facebook Logo"
              >
                <i class="fab fa-facebook-f"></i>
              </a>
            </div>
            <div class="logo">
              <a href="#" aria-label="LinkedIn Logo">
                <i class="fab fa-linkedin"></i>
              </a>
            </div>
            <div class="logo">
              <a
                href="https://www.instagram.com/drinsed/"
                aria-label="Instagram Logo"
              >
                <i class="fab fa-instagram"></i>
              </a>
            </div>
            <div class="logo">
              <a href="https://twitter.com/drinsed" aria-label="Twitter Logo">
                <i class="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>

        <div class="footer__content__payments">
          <h3>Payment Methods</h3>
          <img src="@/assets/payment_methods.svg" alt="Cards" />
        </div>
      </div>

      <div class="footer__copyright">
        <p>
          &copy;Copyright 2020
          <a href>www.drinsed.com</a> | All right reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  methods: {
    goTo(hash) {
      hash;
      let { name } = this.$route;

      if (name === "Home") {
        let item = document.querySelector(`${hash}`);
        let top = item.offsetTop;
        window.scrollTo({ top, left: 0, behavior: "smooth" });
      } else {
        this.$router.push("/");
        setTimeout(() => {
          let item = document.querySelector(`${hash}`);
          let top = item.offsetTop;
          window.scrollTo({ top, left: 0, behavior: "smooth" });
        }, 500);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

footer {
  background-color: $dark;
  height: 100%;
  padding: 1.5rem 0;
  width: 100%;
  color: white;
  .footer__navigation {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    &__sitemap,
    &__terms {
      ul {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 100%;
        li {
          white-space: nowrap;
          margin-right: 10px;
          position: relative;
          &:hover,
          &:focus-within {
            cursor: pointer;
            color: $primary;
          }
          &::after {
            content: ":";
            padding-left: 0.5em;
          }
          &:last-child::after {
            display: none;
          }
        }
      }
      @media (max-width: $desktop) {
        ul {
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          li {
            margin: 0.2em 0;
            &::after {
              content: ":";
              display: none;
            }
          }
        }
      }
    }
    &::after {
      content: "";
      position: absolute;
      height: 1px;
      width: 100%;
      background-color: #474b56;
      bottom: -10px;
    }
    @media (max-width: $desktop) {
      align-items: flex-start;
    }
  }

  .footer__content {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    &__apps {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      h3 {
        font-weight: 300;
        font-size: 1rem;
      }
      &__logos {
        margin-top: 1.25rem;
        white-space: nowrap;
        text-align: center;
        cursor: pointer;
        img {
          &:first-child {
            margin-right: 0.5rem;
          }
        }
      }
    }
    &__social {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      max-width: 350px;
      @media (max-width: $tablet) {
        max-width: 280px;
        margin-bottom: 3rem;
      }
      &__logo {
        margin-bottom: 0.75em;
        width: auto;
        max-height: 150px;
      }
      &__links {
        display: flex;
        margin-top: 1rem;
        .logo {
          button {
            border: none;
            background-color: transparent;
            color: white;
          }
          display: grid;
          place-items: center;
          margin-right: 0.375rem;
          background-color: $primary;
          border-radius: 50%;
          height: 35px;
          width: 35px;
          transition: background-color 250ms ease;
          cursor: pointer;
          &:hover,
          &:focus-within {
            background-color: $secondary;
          }
        }
      }
    }
    &__payments {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      h3 {
        font-weight: 300;
        font-size: 1rem;
      }
      img {
        margin-top: 1.25rem;
        height: 35px;
      }
    }
    @media (max-width: $tablet) {
      margin-top: 2rem;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &__apps {
        margin: 1rem 0;
        order: 2;
      }
    }
  }
  .footer__copyright {
    text-align: center;
    margin: 3rem 0;
    a {
      color: $secondary;
      text-decoration: underline;
    }
  }
}
</style>
