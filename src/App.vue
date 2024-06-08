<template>
    <div id="app" v-if="!changeMe">
        <Header />
        <div @click="closeCart">
            <MobileMenu />
            <router-view />
            <Footer />
        </div>
        <Cart />
        <PostcodePopUp />
        <vue-progress-bar></vue-progress-bar>
    </div>
    <div id="app" v-else>
        <NotFound />
    </div>
</template>

<script>
import Cart from "@/components/Cart";
import MobileMenu from "@/components/MobileMenu";
import PostcodePopUp from "@/components/PostcodePopUp";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NotFound from "./views/404.vue"
import { mapState, mapActions } from "vuex";
export default {
    components: { Header, Footer, Cart, MobileMenu, PostcodePopUp, NotFound },
    data() {
        return {
            changeMe: true
        }
    },
    created() {
        this.$Progress.start();
        let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        document.cookie = `TimeZone=${timeZone}; secure;`;
        console.log(process.env.VUE_APP_URL);

        this.$router.beforeEach((to, from, next) => {
            if (to.name != "pricing") {
                this.$Progress.start();
            }
            next();
        });

        this.$router.afterEach((to) => {
            if (to.name != "pricing") {
                this.$Progress.finish();
            }
        });
    },
    methods: {
        ...mapActions(["toggleCart", "toggleMenu", "loadFromsessionStorage"]),
        closeCart() {
            if (this.isCartOpen) {
                this.toggleCart();
            }
        },
        closeMenu() {
            if (this.isMenuOpen) {
                this.toggleMenu();
            }
        },
    },
    computed: {
        ...mapState(["isCartOpen", "isMenuOpen"]),
    },
    mounted() {
        this.$Progress.finish();
        document.addEventListener("click", (e) => {
            if (!e.target.className.includes("mobile-menu") && this.isMenuOpen) {
                this.toggleMenu();
            }
        });

        this.loadFromsessionStorage();
    },
};
</script>

<style lang="scss">
@import "@/styles/main.scss";

.router-link-exact-active {
    outline: none;
    color: $primary;
    font-weight: 400;
}
</style>
