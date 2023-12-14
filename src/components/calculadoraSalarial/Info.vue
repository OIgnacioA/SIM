<template>
  <div class="content-info">
    <div class="row">
      <div class="col-12 col-sm-6">
        <img class="img-fluid" src="/img/img_perfil.png" />
      </div>
      <div class="col-12 col-sm-6">
        <div class="row">
          <div class="col">
            INFO
          </div>
        </div>

        <div class="row">
          <div class="col">
            <h3>{{info.titulo}}</h3>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <span>{{info.descripcion}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps(['info'])
</script>

<style lang="scss">
.content-info {
  min-height: 50vh;
  background: linear-gradient(180deg, #64b8e2 0%, #0a84eb 100%);
  color: #FFF;
}
</style>