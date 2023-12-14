<template>
  <div v-if="loading" class="portal-spinner-content">
    <ProgressSpinner style="styleSpinner" />
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import ProgressSpinner from "primevue/progressspinner";

const styleSpinner = reactive({
  width: "50px",
  height: "50px",
});

const props = defineProps({
  loading: Boolean,
});
</script>
<style scoped>
.portal-spinner-content {
  margin: 0 auto;
  text-align: center; 
}
</style>
