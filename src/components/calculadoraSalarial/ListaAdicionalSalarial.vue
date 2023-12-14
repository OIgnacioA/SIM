<template>
  <div class="col-12 col-md-10 offset-md-1">

    <div class="card card-1 mb-3" v-for="(adicional) in listado_adicionales" :key="adicional"
      @click="adicional_seleccionado( adicional )">
      <div class="card-body">
        <div class="row justify-content-center align-items-center">
          <div class="col-auto">
            <div class="adicional-icono p-2"><img :src="adicional.icono" class="" /></div>
          </div>
          <div class="col">
            <div class="row"><b>{{adicional.nombre}}</b></div>
          </div>

          <div class="col-auto d-none d-md-block">
            <img class="icon-header ml-4" src="/img/info.svg" v-tooltip="{ value: adicional.descripcion }" />
          </div>

          <div class="col-auto">
            <i class="icon-check pi pi-check"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps(['listado_adicionales'])
  const emit = defineEmits(['adicional_seleccionado'])

  function adicional_seleccionado( i ){
    emit('adicional_seleccionado',i)
  }
</script>

<style scoped>
.card-1 {
  background: #f0f7ff;
}

.icon-check {
  color: #28e278;
  font-weight: bold;
  font-size: 1.5rem;
}
</style>