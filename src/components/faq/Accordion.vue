<template>
  <div class="accordion">
      <div class="accordion__title" @click="isOpen = !isOpen">
          <i :class="!isOpen ? 'fas fa-plus': 'fas fa-minus' "></i>
        <h3>{{title}}</h3>
      </div>
          <div class="accordion__content" :class='!isOpen ? "closed": ""'>
            <slot name="content" v-if="isOpen"></slot>

          </div>
  </div>
</template>

<script>
export default {
    props: ['title'],
    data() {
        return {
            isOpen:false
        }
    },
}
</script>

<style lang='scss' scoped>
@import "@/styles/_variables.scss";
a {
    color:$primary;
    text-decoration: underline;
}


.accordion {
    width: 100%;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  padding: 1.25rem 0;
  &__title {
        cursor: pointer;
  height: 100%;
  display: flex;
  align-items:  center;
  justify-content: flex-start;
  position: relative;
  h3 {
  font-weight: 400;
  }
  i {
      margin-right: 0.5em;

  }
  }
   &__content{
       width: 95%;
       line-height: 150%;
      margin: 2rem auto;
      transition: all 300ms ;
      ul {
          li {
              list-style: disc;
          }
      }
  }
  &::after{
content: "";
  position: absolute;
  left: 0;
  top: 0px;
  bottom: 0;
  right: 0;
  height: 1px;
  width: 100%;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.158);
  }
}


.closed {
  visibility: hidden;
  transform-origin: top;
  max-height: 0;
  margin: 0;
 opacity: 0;
}
</style>