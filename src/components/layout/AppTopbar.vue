<template>
  <div class="topbar">
    <div class="fondo"></div>
    <div class="container">
      <div class="row justify-content-center justify-content-md-start">
        <div class="col-auto p-3 mt-5">
          <img class="logo" src="/img/logo_sim_blanco.png" />
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-md-6">
          <h1>{{ texts.title }}</h1>
          <p>
            {{ texts.subtitle }}
          </p>
          <a :href="enlace_mas_info" target="_blank">
            <!-- <Button label="Más información" /> -->
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  const props = defineProps(['texts'])

  const enlace_mas_info = ref(import.meta.env.VITE_APP_ENLACE_MAS_INFO)
</script>

<style lang="scss">
.topbar {
  position: relative;
  color: #FFF;

  .logo {
    height: 5rem;
  }

  .container {
    z-index: 500;
    position: relative;
  }

  .fondo {
    z-index: 0;
    background: url("/img/Fondo.png");
    background-size: cover;
    position: absolute;
    height: calc(100% + 6rem);
    width: 100%;
  }
}

@media (max-width: 768px) {
  .topbar {
    .container {
      text-align: center;
    }
  }
}
</style>
