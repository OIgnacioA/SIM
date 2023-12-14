<template>
  <div class="row container-adicionales">
    <div class="adicionales-header w-100">
      <div class="row w-100 justify-content-center align-items-center">

        <div class="col-auto p-0"><img class="icon-header ml-2" src="/img/adicionales.svg" /></div>
        <div class="col p-0">
          <h2 class="m-0">3 - Seleccioná tus adicionales</h2>
        </div>
        <div class="col-auto p-0">
          <img class="icon-header m-0" src="/img/info.svg" v-tooltip.rigth="configuracion.textos.DESC_ADICIONALES" />
        </div>

      </div>
    </div>

    <div class="field col-12 p-3">
      <div class="card card-1 mb-3" v-for="(adicional, index) in adicionales_select" :key="adicional">
        <div class="card-body">
          <div class="row justify-content-center align-items-center">
            <!--ICONO-->
            <div class="col-auto">
              <div class="adicional-icono p-2"><img :src="adicional.icono" class="" /></div>
            </div>
            <!--TEXTO e input-->
            <div class="col p-0">
              <div class="row justify-content-center align-items-center">

                <div :class="{'col':adicional.tipo_control == 'switch', 'col-auto': adicional.tipo_control != 'switch'}">
                  <div class="row">

                    <div class="col">
                      {{adicional.nombre}} &nbsp;
                      <span class="badge t-porcent p-2 pt-3 pb-3"><b>+ {{valor_formateado( {
                                                salario_basico:salario_basico, item:adicional }, 'adicional_select' )}}</b></span>
                    </div>

                  </div>
                </div>
                <div class="col d-none d-sm-block" v-if="adicional.tipo_control !== 'switch'"></div>
                <div class="col-auto" v-if="adicional.tipo_control !== 'switch'">
                  <InputNumber v-if="adicional.tipo_control == 'number'" v-model="adicional.value"
                    @input="adicional_change()" class="calculadora-adicionales-inputnumerico" showButtons
                    :style="{'width': calcular_width_adicional(adicional) }" :min="adicional.valores.input.min"
                    :max="adicional.valores.input.max" :suffix="adicional.valores.input.unidad" />
                  <Dropdown v-if="adicional.tipo_control == 'select'" v-model="adicional.value"
                    :style="{'width': calcular_width_adicional(adicional) }" @change="adicional_change()"
                    :options="adicional.valores.input" optionLabel="text" optionValue="value" />
                </div>

              </div>
            </div>
            <!--QUITAR ADICIONAL-->
            <div class="col-auto">
              <Button @click="quitar_adicional(index)" class="p-button-rounded p-button-secondary" icon="pi pi-times"
                iconPos="right" />
            </div>

          </div>
        </div>
      </div>

      <div class="col-12 p-3" style="text-align:center;">
        <div class="col-auto">
          <Button icon="pi pi-plus-circle" class="p-button-rounded btn-add-adicional"
            @click="modal_adicional_salarial()" />
        </div>
      </div>
    </div>

    <!-- FILA ADICIONALES -->


  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { valor_formateado } from '../../helpers/calculadora'

  const props = defineProps(['adicionales_select', 'salario_basico', 'configuracion', 'modal_adicional_salarial'])
  const emit  = defineEmits(['quitar_adicional', 'adicional_change'])

  const fullWidth = ref( document.documentElement.clientWidth )
  const FONT_SIZE = 16 
  const MARGINS = 70

  function calcular_width_adicional( adicional ){
    let max_long = 0
    console.log()
    switch (adicional.tipo_control){
      case 'number':
        max_long = Math.round((String(adicional.valores.input.max).length + 2 + String(adicional.valores.input.unidad).length) / 1.22)
      break
      case 'select':
        for (let c=0; c < adicional.valores.input.length; c++)
          if (adicional.valores.input[c].text.length > max_long)
            max_long = adicional.valores.input[c].text.length
        max_long = Math.round(max_long / 1.521)
      break
    }

    if (max_long * FONT_SIZE > fullWidth.value - MARGINS)
      return (fullWidth.value - MARGINS) / FONT_SIZE + 'em'

    return max_long + 'em'
  }

  function quitar_adicional(i){
    emit('quitar_adicional', i)
  }
 
  function adicional_change(){
    emit('adicional_change', 1)
  }

  onMounted(async ()=>{
    window.addEventListener('resize', (ev) => {
      fullWidth.value = document.documentElement.clientWidth
    })
  })
  
</script>

<style lang="scss">
.adicionales-header {
  background-color: #007ad9;
  color: #ffffff;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  margin-top: 20px;
  padding: 1.25rem;
  display: flex;
  align-items: flex-end;

  h2 {
    font-size: 1rem;
  }
}

.calculadora-adicionales-inputnumerico {
  .p-inputtext {
    text-align: right;
    width: 100%;
  }

  border-radius: 0.75rem;

  :deep(input) {
    padding: 0.5rem;
    background: #f0f7ff !important;
  }
}

.calculadora-adicionales-inputnumerico:hover {
  border-color: #212121;
}

.t-porcent {
  background: #34e47e;
}

.btn-add-adicional {
  font-size: 2rem !important;
}</style>  