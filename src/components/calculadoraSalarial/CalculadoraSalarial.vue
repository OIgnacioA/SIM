<template>
  <AppTopbar :texts="{ title: configuracion.textos?.TITULO_SIM, subtitle: configuracion.textos?.SUB_TITULO_SIM }">
  </AppTopbar>
  <div class="container-fluid">
    <div v-if="is_loading">
      <ProgressSpinner />
    </div>
    <div class="container cont-gral" v-if="!is_loading">

      <div class="row">
        <div class="col-12 col-md-6 col-xl-7">
          <!-- seleccionar el sueldo minimo-->
          <div class="row container-rol">
            <div class="rol-header w-100">
              <div class="row w-100 justify-content-center align-items-center">

                <div class="col-auto p-0"><img class="icon-header ml-2" src="/img/rol.svg" /></div>
                <div class="col p-0">
                  <h2 class="m-0">0 - Seleccionar el sueldo minimo</h2>
                </div>
                <div class="col-auto p-0">
                  <img class="icon-header m-0" src="/img/info.svg"
                    v-tooltip.rigth="configuracion.textos.DESC_SUELDO_MIN" />
                </div>

              </div>
            </div>
            <div class="field col-12 p-3 altas">
              <InputNumber v-model="sueldo_minimo_ingresado" @input="sueldo_minimo_change()" class="w-100" showButtons
                :min="configuracion.sueldo_min_base" :step="1000" />
            </div>


          </div>
          <!-- ROL-->

          <div class="row container-rol">
            <div class="rol-header w-100">
              <div class="row w-100 justify-content-center align-items-center">

                <div class="col-auto p-0"><img class="icon-header ml-2" src="/img/rol.svg" /></div>
                <div class="col p-0">
                  <h2 class="m-0">1 - Seleccioná tu rol</h2>
                </div>
                <div class="col-auto p-0">
                  <img class="icon-header m-0" src="/img/info.svg" v-tooltip.rigth="configuracion.textos.DESC_ROLES" />
                </div>

              </div>
            </div>
            <div class="field col-12 p-3 altas">
              <Dropdown id="dropdown" class="w-100" v-model="modelo.puesto" placeholder="Puesto" @change="puesto_change()"
                :options="configuracion.rol_laboral" optionLabel="nombre" optionValue="id" />
            </div>
          </div>
          <!-- Seniority-->

          <div class="row container-seniority">
            <div class="seniority-header w-100">
              <div class="row w-100 justify-content-center align-items-center">

                <div class="col-auto p-0"><img class="icon-header ml-2" src="/img/estrella.svg" /></div>
                <div class="col p-0">
                  <h2 class="m-0">2 - Indicá tu nivel de experiencia</h2>
                </div>
                <div class="col-auto p-0">
                  <img class="icon-header m-0" src="/img/info.svg"
                    v-tooltip.rigth="configuracion.textos.DESC_CATEGORIAS" />
                </div>

              </div>
            </div>
            <div class="field col-12 p-3 altas">
              <VueStep :step-list="opts_seniority" :now-step="modelo.seniority" :active-color="'#0080eb'"
                :sort-by="'orden_visualizacion'" ref="step_categoria" :option-label="'nombre'" :option-icon="'url_icono'"
                :option-value="'id'" @selected="categoria_change"></VueStep>
            </div>

          </div>
          <!-- ADICIONALES-->

          <AdicionalesSelect :adicionales_select="adicionales_select" :salario_basico="salario_basico"
            :configuracion="configuracion" @quitar_adicional="quitar_adicional" @adicional_change="adicional_change"
            :modal_adicional_salarial="modal_adicional_salarial"></AdicionalesSelect>

          <!-- FILA BTN -->
          <div class="row">
            <div class="col">
              <div class="row justify-content-center align-items-center">
                <div class="col-auto"><Button label="REINICIAR" class="btn-red btn-redondeado" icon="pi pi-refresh"
                    @click="reiniciar()" /></div>
              </div>
            </div>
            <div class="col">
              <div class="row justify-content-center align-items-center">
                <div class="col-auto"><a :href="enlace_form_coments" target="_blank"><Button label="COMENTARIOS"
                      class="btn-redondeado" iconPos="right" /></a></div>
              </div>
            </div>
            <div class="col">
              <div class="row justify-content-center align-items-center">
                <div class="col-auto"><Button label="CONTACTANOS" class="btn-redondeado" iconPos="right" /></div>
              </div>
            </div>
          </div>

        </div>

        <!-- DETALLES -->
        <div class="col-12 col-md-6 col-xl-5">
          <div class="row">
            <div class="col-12 pt-0">

              <div class="card mb-3">
                <div class="card-header pt-3 pb-3 pl-5">
                  <img class="icon-header" src="/img/mi_perfil.svg" />
                  MI PERFIL
                </div>
                <div class="card-body mi-perfil-body p-4">

                  <div class="row">
                    <div class="col p-5">
                      <img class="img-fluid" src="/img/img_perfil.png" />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col">
                      <span class="badge badge-light p-2">PERFIL PROFESIONAL</span>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col">
                      <h2 class="puesto">{{puesto_select.nombre}}</h2>
                      <p class="categoria">{{categoria_select.nombre}}</p>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col">
                      <StarsDisplay :stars_count="categoria_selected_stars"
                        :total_stars="configuracion.categoria_laboral.length"></StarsDisplay>
                    </div>
                  </div>

                  <!-- DESCRIPCIÓN PUESTO / CATEGORìA-->
                  <div class="row" v-if="puesto_select.descripcion != undefined">
                    <div class="col">
                      <Button :icon="descript_puesto_icon" :label="descrip_colapsable_btn_t"
                        @click="descripcion_puesto_toggle()" />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col cont-descrip-puesto" :style="get_descrip_puesto_style()">
                      <p>{{puesto_select.descripcion}}</p>
                      <p>{{categoria_select.descripcion}}</p>
                    </div>
                  </div>
                </div>

                <div class="card-body p-4 rounded-top-left">
                  <div class="row">
                    <div class="col-12">
                      <span class="badge badge-primary p-2">MI SALARIO MÍNIMO BRUTO</span>
                    </div>

                    <div class="col-12">
                      <div class="t-salario"><small>ARS</small> ${{formatMoney(sueldo,0)}}</div>
                    </div>
                    <div class="col-12"><small>Calculado el: {{ fecha_calculo }}</small></div>
                  </div>
                </div>

                <div class="m-0 row p-4 b-top btn-compartir justify-content-center align-items-center"
                  @click="modal_compartir()">
                  <div class="col-auto">
                    <i class="pi pi-share-alt"></i>
                  </div>
                  <div class="col-auto">
                    <b>Compartir</b>
                  </div>
                </div>

                <ComposicionSalarial :resumen_sueldo="resumen_sueldo"></ComposicionSalarial>

              </div>

            </div>

          </div>

        </div>
      </div>

      <FooterFlotante :sueldo="sueldo"></FooterFlotante>
    </div>

    <!-- MODAL -->
    <Dialog v-model:visible="pop_ups.adicionales">
      <template #header>
        Seleccioná un adicional para agregarlo a tu salario
      </template>
      <ListaAdicionalSalarial :listado_adicionales="configuracion.adicional_salarial"
        @adicional_seleccionado="adicional_seleccionado" />
    </Dialog>
    <Dialog v-model:visible="pop_ups.redsocial">
      <template #header>
        Compartir
      </template>
      <CompartirSocial :params="share_params"></CompartirSocial>
    </Dialog>
    <Dialog v-model:visible="pop_ups.info">
      <Info :info="info_data"></Info>
    </Dialog>
  </div>
</template>

<script setup >
  import { ref, onMounted } from 'vue';
  import { getConfig } from '../../api/calculadoraSalarial'
  import ProgressSpinner from 'primevue/progressspinner';
  import ListaAdicionalSalarial from './ListaAdicionalSalarial.vue'
  import CompartirSocial from '../genericos/CompartirSocial.vue'
  import VueStep from '../genericos/VueStep.vue'
  import StarsDisplay from '../genericos/StarsDisplay.vue'
  import Info from './Info.vue'
  import { formatMoney, fechaDateToString } from '../../helpers/formateo'
  import ComposicionSalarial from './ComposicionSalarial';
  import AdicionalesSelect from './AdicionalesSelect.vue';
  import { suma_adicional } from '../../helpers/calculadora'
  import FooterFlotante from './FooterFlotante.vue'
  import AppTopbar from '../layout/AppTopbar.vue';

  const modelo = ref({
    puesto: -1,
    seniority: -1
  })

  const sueldo = ref(0)
  const configuracion = ref({})
  const is_loading = ref(true)
  const opts_seniority = ref([])
  const resumen_sueldo = ref([])

  const adicionales_select = ref([])
  const puesto_select = ref({})
  const categoria_select = ref({})

  const salario_basico = ref(0)
  const step_categoria = ref(null)
  const enlace_form_coments = ref('')

  const categoria_selected_stars = ref(0)

  const descript_puesto_expanded = ref(false)
  const descript_puesto_icon = ref('pi pi-chevron-down')
  const descrip_colapsable_btn_t = ref('Ver descripción')

  const share_params = ref({ description: '¡Calculá el <b>salario IT Mínimo</b> Online!' })
  const fecha_calculo = ref('')
  const pop_ups = ref({
    adicionales: false, redsocial: false, info:false
  })

  const info_data = ref({
    titulo:'', descripcion: ''
  })

  const sueldo_minimo_ingresado = ref(157000)
  function sueldo_minimo_change(){
    calcular()
  }

  function reiniciar(){
    modelo.value = {
      puesto: -1,
      seniority: -1
    }

    puesto_select.value = {}
    categoria_select.value = {}
    sueldo.value = 0
    resumen_sueldo.value = []
    adicionales_select.value = []
    opts_seniority.value = []
  }

  function descripcion_puesto_toggle(){
    descript_puesto_expanded.value = !descript_puesto_expanded.value
    if (descript_puesto_expanded.value){
      descript_puesto_icon.value = 'pi pi-chevron-up'
      descrip_colapsable_btn_t.value = 'Ocultar descripción'
    } else {
      descript_puesto_icon.value = 'pi pi-chevron-down'
      descrip_colapsable_btn_t.value = 'Ver descripción'
    }
  }

  function get_descrip_puesto_style(){
    let altura = 0
    if (descript_puesto_expanded.value){
      let obj = document.getElementsByClassName('cont-descrip-puesto')[0].children
      altura += 50
      for (let c=0; c < obj.length; c++){
        altura += obj[c].clientHeight
      }
    }

    return {
      height: altura + 'px'
    }
  }

  function modal_adicional_salarial(){
    pop_ups.value.adicionales = true
  }

  function modal_compartir(){
    pop_ups.value.redsocial = true
  }

  function adicional_seleccionado( adicional ){
    pop_ups.value.adicionales = false

    //verificamos que el adicional, ya no este en la lista de seleccionados
    for (let c=0; c < adicionales_select.value.length; c++){
      if (adicionales_select.value[c].id == adicional.id){
        return
      }
    }

    for (let c=0; c < configuracion.value.adicional_salarial.length; c++){
      if (configuracion.value.adicional_salarial[c].id == adicional.id){
        let item = {... configuracion.value.adicional_salarial[c]}
        if (item.tipo_control == 'switch'){
          item.value = true
          
        } else if (item.tipo_control == 'number' && item.valores.input.hasOwnProperty('default') ) {
          // item.value = item.valores.input.default 
          item.value = 1
          
        }
        if(item.tipo_control == "select"){
          item.value= item.valores.input[0].value

        }
        adicionales_select.value.push(item)
        break;
      }
    }

    calcular()
  }

  function quitar_adicional(i){
    adicionales_select.value.splice(i,1)
    calcular()
  }

  function puesto_change(){
    
    if (modelo.value.puesto == -1){
      return
    }

    set_puesto_seleccionado()
    opts_seniority.value = get_categoria_options( modelo.value.puesto )

    if (modelo.value.seniority == -1 && step_categoria.value !== null){
      categoria_change( get_primera_categoria().id )
    }

    calcular()
  }

  function get_primera_categoria(){
    let min = opts_seniority.value[0]
    for (let c=0; c < opts_seniority.value.length; c++){
      if (opts_seniority.value[c].orden_visualizacion < min.orden_visualizacion)
        min = opts_seniority.value[c]
    }
    return min
  }

  function get_categoria_options( puesto ){
    let categorias = []

    for (let i=0; i < configuracion.value.salario_rol_categoria.length; i++){
      if (configuracion.value.salario_rol_categoria[i].id_rol_laboral == puesto){
        for (let c = 0; c < configuracion.value.categoria_laboral.length; c ++){
          if (configuracion.value.categoria_laboral[c].id == configuracion.value.salario_rol_categoria[i].id_categoria) {
            categorias.push( configuracion.value.categoria_laboral[c] )
          }
        }
      }
    }
    return categorias;
  }

  function categoria_change( categoria ){
    modelo.value.seniority = categoria

    let index_stars = -1
    for (let c=0; c < configuracion.value.categoria_laboral.length; c ++){
      if ( configuracion.value.categoria_laboral[c].id == categoria){
        index_stars = c
        break
      }
    }

    if (step_categoria.value !== null)
      step_categoria.value.updateStep( modelo.value.seniority )

    categoria_selected_stars.value = index_stars + 1
    set_puesto_seleccionado()
    calcular()
  }

  function set_puesto_seleccionado(){

    for (let c=0; c < configuracion.value.rol_laboral.length; c++){
      if (configuracion.value.rol_laboral[c].id == modelo.value.puesto){
        puesto_select.value = configuracion.value.rol_laboral[c]
        break;
      }
    }

    for (let c = 0; c < configuracion.value.categoria_laboral.length; c ++){
      if (configuracion.value.categoria_laboral[c].id == modelo.value.seniority){
        categoria_select.value = configuracion.value.categoria_laboral[c]
        break;
      }
    }
    calcular()
  }

  function aumento_rol_categoria(){
    if ( modelo.value.seniority == -1 || modelo.value.puesto == -1){
      return 0
    }

    let salario_relativo_rc = 0
    for (let c=0; c < configuracion.value.salario_rol_categoria.length; c++){
      if (configuracion.value.salario_rol_categoria[c].id_categoria == modelo.value.seniority && configuracion.value.salario_rol_categoria[c].id_rol_laboral == modelo.value.puesto){
        salario_relativo_rc = configuracion.value.salario_rol_categoria[c].salario_relativo
        break;
      }
    }

    let salario_relativo_rol = 0
    for (let c=0; c < configuracion.value.rol_laboral.length; c++){
      if ( configuracion.value.rol_laboral[c].id == modelo.value.puesto ){
        salario_relativo_rol = configuracion.value.rol_laboral[c].salario_relativo
        break;
      }
    }
    
    return (sueldo_minimo_ingresado.value / 100 * salario_relativo_rc / 100 * salario_relativo_rol) - sueldo_minimo_ingresado.value
  }

  function adicional_change(){
    calcular()
  }

  function calcular(){
    let salario_rol_categoria = aumento_rol_categoria()
    resumen_sueldo.value = []
    
    salario_basico.value = sueldo_minimo_ingresado.value + salario_rol_categoria
    sueldo.value      = salario_basico.value  
    resumen_sueldo.value.push({ descripcion: "Salario Mínimo", value: sueldo_minimo_ingresado.value, icono: '' })
    resumen_sueldo.value.push({ descripcion: "Rol y Seniority", value: salario_rol_categoria, icono: '' })
    
    share_params.value.description = ''
    for (let c=0; c < adicionales_select.value.length; c++ ){
      let item = adicionales_select.value[c]
      if (item.hasOwnProperty('value')){

        let aumento = suma_adicional( { salario_basico:salario_basico.value, item:item } ) 
        sueldo.value += aumento

        resumen_sueldo.value.push({ descripcion: item.nombre, value: aumento, icono: item.icono })
        share_params.value.description += item.nombre+': $'+ formatMoney(aumento,0) +' \n'
      }
    }

    actualiza_fecha()
    share_params.value.description = '¡Calculá el salario IT Mínimo! \n Sueldo Calculado: $'+ formatMoney(sueldo.value,0) + ' \n Detalle: \n' + share_params.value.description
    share_params.value.description += '\n Calculado el: ' + fecha_calculo.value
  }

  onMounted(async ()=>{
    enlace_form_coments.value = import.meta.env.VITE_APP_ENLACE_COMENTS
    let get_conf = {}
    get_conf = await getConfig()
    
    modelo.value.seniority = -1
    if (get_conf){
      configuracion.value = get_conf.data.data
      sueldo_minimo_ingresado.value = configuracion.value.sueldo_min_base
      configuracion.value.adicional_salarial.map(a=>{ 
        a.icono = './img/dinamic/adicionales/' + a.icono
      })
      let texts = configuracion.value.textos
      configuracion.value.textos = {}
      for (let c=0; c < texts.length; c++)
        configuracion.value.textos[texts[c].id] = texts[c].text

      is_loading.value = false

      opts_seniority.value = get_categoria_options( configuracion.value.rol_laboral[0].id )
      
    }
    
    actualiza_fecha()
  })

  function actualiza_fecha(){
    fecha_calculo.value = fechaDateToString(new Date(),'/')
  }
</script>

<style lang="scss">
.btn-redondeado {
  padding: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;
  border-radius: 2rem;
}

.cont-descrip-puesto {
  transition: .5s;
  overflow: hidden;
  height: 0rem;
}

.title {
  font-weight: bold;
  color: #0080eb;
}

.btn-red {
  background: #ff1e30;
  border: none;
}

.btn-red:hover {
  background: #ff4554 !important;
}

.mi-perfil-body {
  background: linear-gradient(180deg, #64b8e2 0%, #0a84eb 100%);
  color: #FFF;

  .puesto,
  .categoria {
    font-family: 'Gotham-Medium';
  }

  .categoria i {
    font-family: 'Gotham-LightItalic';
  }
}

.t-salario {
  color: #20427f;
  font-size: 3rem;
  font-weight: bold;

  small {
    font-size: 2rem;
  }
}

.rounded-top-left {
  margin-top: -2rem;
  background: #fff;
  border-top-left-radius: 2rem;
}

.btn-compartir {
  font-weight: bold;
  font-size: 1.5rem;
  color: #20427e;
  cursor: pointer;

  .pi {
    font-size: 2.5rem;
    color: #007fea;
  }
}

.rol-header,
.seniority-header {
  background-color: #007ad9;
  color: #ffffff;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  padding: 1.25rem;
  display: flex;
  align-items: flex-end;
}

.rol-header {
  position: relative;
  border: 1px solid;
  border-bottom: none;
}

.rol-header h2,
.seniority-header h2 {
  font-size: 1rem;
}</style>
