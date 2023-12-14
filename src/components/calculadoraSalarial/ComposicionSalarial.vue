<template>
  <div class="card-body p-0 cont-comp-salarial">       
      <div class="row m-0">
        <div class="col m-0 p-5 c-cont" :style="get_style()">

          <span class="badge badge-primary p-2 mb-5">COMPOSICIÓN SALARIAL</span>

          <div class="card card-1 mb-3" v-for="(resumen) in resumen_sueldo" :key="resumen">
            <div class="card-body composicion-salarial">
              <div class="row justify-content-center align-items-center">
                <div class="col-auto">
                  <div v-if="resumen.icono == ''" class="" style="background: #007feb; width:2.5rem; height: 2.5rem; border-radius:.25rem; text-align: center;padding: .25rem;font-size: 1.5rem;font-weight: bold;color: #FFF;">$</div>
                  <div v-if="resumen.icono != ''" class="adicional-icono p-2"><img :src="resumen.icono" class="" /></div>
                </div>
                <div class="col adicional">{{resumen.descripcion}}</div>
                <div class="col-auto monto">
                    ${{formatMoney(resumen.value,0)}}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="row m-0">
        <div class="col collap-cont">
          <div class="row justify-content-center">
            <div class="col-auto">
              <Button :icon="collapsable_icon" @click="collapsable_toggle()" />
            </div>
          </div>
        </div>
      </div>

  </div>
</template>

<script setup>
  import { ref }         from "vue"
  import { formatMoney } from '../../helpers/formateo'
  
  const props = defineProps(['resumen_sueldo'])
  const collapsable_icon = ref('pi pi-chevron-down')
  const colapsado        = ref(true)

  function collapsable_toggle(){
    colapsado.value = !colapsado.value;

    if (colapsado.value){
      collapsable_icon.value = 'pi pi-chevron-down'
    } else {
      collapsable_icon.value = 'pi pi-chevron-up'
    }
  }

  function get_style(){
    let altura = 0
    
    if (!colapsado.value)      
      altura = 150 + props.resumen_sueldo.length * 88  

    return {
      height: altura + 'px'
    }
  }

</script>

<style lang="scss" scoped>
  .cont-comp-salarial{
    background: #cbe1f9;
    border-radius: 2rem;

    .collap-cont{
      background-color: #FFF;
      border-bottom-left-radius: 2rem;
      border-bottom-right-radius: 2rem;

      .p-button{
        background: #FFF;
        border: none;
        color: #9f9f9f;
        font-size: 2rem;
      }

      .p-button:focus{
        box-shadow: none;
      }
    }

    .badge{
      padding: .7rem 1rem;
    }
  }

  .c-cont{
    transition: .5s;
    overflow: hidden;
    height: 0rem;
  }

  .composicion-salarial{
    .monto{
      color: #20427f;
      font-family: 'Gotham-Bold';
    }
    .adicional{
      font-family: 'Gotham-Medium';
    }
  }
</style>