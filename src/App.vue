<template>
  <router-view />
</template>

<script setup >
import AppFooter from './components/layout/AppFooter.vue';
import { ref } from "vue"
import { useRoute } from 'vue-router';

const route = useRoute();

</script>

<style lang="scss">
@import "./App.scss";

html,
body {
  height: 100%;
  margin: 0;
}

#app {

  background: rgb(16, 6, 77);
  background: linear-gradient(180deg, rgba(16, 6, 77, 1) 0%, rgba(9, 9, 121, 1) 26%, rgba(43, 145, 255, 1) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
  max-width: 50%;
  margin-bottom: -330px;
  margin-left: 25%;
  margin-right: 25%;
}


.p-dropdown {
  padding: 0px;
  border: 0 !important;
}

.p-dropdown-label {
  font-size: 40px;
  position: relative;
  top: 9px;
  height: 100%;
  color: #9E9E9E !important;
  margin-left: 20px;
  border: 0 !important;
}

.p-dropdown-items-wrapper {
  max-height: 300px !important;
}

.p-dropdown-item {
  font-size: 30px;
}

.p-dropdown-trigger {

  background-color: #FF17EC !important;
  color: white !important;
  height: 100%;
  margin-bottom: 3px !important;
  margin-left: 10px !important;
  width: 70px !important;
  border-radius: 0 12% 12% 0 !important;
  border: 0 !important;

  .pi {
    font-size: 2rem !important;
    font-weight: bold;
  }

}
</style>
