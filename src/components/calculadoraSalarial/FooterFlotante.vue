<template>
  <div class="row d-md-none">
    <div class="float-footer">
      <div class="row justify-content-center align-items-center">
        <div class="col-6">
          <strong>Ingreso mínimo:</strong>
        </div>
        <div class="col"></div>
        <div class="col-auto">
          <b class="sueldo"><span class="tiny">ARS</span> $ {{formatMoney(sueldo)}}</b>
        </div>
      </div>
      <div class="row">
        <div class="col-12"><small>Calculado el: {{ fecha_calculo }}</small></div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { formatMoney, fechaDateToString } from '../../helpers/formateo'

  const props = defineProps(['sueldo'])
  const fecha_calculo = ref(fechaDateToString(new Date(),'/'))
</script>

<style lang="scss" scoped>
.float-footer{
  position: fixed;
  bottom: 0;
  background: #0d6efd;
  color: #FFF;
  z-index: 3000;
  width: 100vw;
  left: 0;

  .sueldo{
    font-size: 1.5rem;
  }
}
</style>