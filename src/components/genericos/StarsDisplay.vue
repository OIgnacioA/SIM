<template>
  <i v-for="n in stars_count" :key="n" class="pi star-act pi-star-fill"></i>
  <i v-for="n in (total_stars - stars_count)" :key="n" class="pi star-dact pi-star-fill"></i>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['stars_count', 'total_stars'])
</script>

<style scoped>
.star-act, .star-dact {
  margin-right: .2rem;
}
.star-act{
  color: #FFF;
}

.star-dact{
  color: #20427f;
}
</style>