import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getConfig } from '@/api/calculadoraSalarial'
import dateFormat, { masks } from "dateformat";
import { suma_adicional } from '@/helpers/calculadora'

export const useSimStore = defineStore('sim', () => {
    const configuracion = ref()
    const roles = ref()
    const rolSeleccionado = ref()
    const categorias = ref()
    const categoriaSeleccionada = ref()
    const adicionales = ref([])
    const salarioRolCategorias = ref([])
    const salarioRolCategoria = ref()
    const salario = ref()
    const fechaCalculo = ref()
    const fechaExpiracion = ref()

    let diaHoy = new Date();
    let diaCalculo = dateFormat(diaHoy, "d/m/yyyy")
    let diaVencimiento = dateFormat(diaHoy.setDate(diaHoy.getDate() + 90), "d/m/yyyy")

    const adicionalesSeleccionados = computed(() => {
        return adicionales.value.filter(i => i.selected)
    })

    function adicionalInit(x) {
        x.selected = false
        x.counter = 0
        x.inputSelected = null
    }

    async function loadConfig() {
        console.log('load_config')
        let get_conf = {}
        get_conf = await getConfig()

        console.log(get_conf)

        configuracion.value = get_conf.data.data
        roles.value = configuracion.value.rol_laboral
        categorias.value = configuracion.value.categoria_laboral

        const adicionalesT = configuracion.value.adicional_salarial
        adicionalesT.forEach(x => adicionalInit(x))
        console.log(adicionalesT)
        adicionales.value = adicionalesT

        salarioRolCategorias.value = configuracion.value.salario_rol_categoria

        fechaCalculo.value = diaCalculo
        fechaExpiracion.value = diaVencimiento

    }

    function selectRol(r) {
        console.log('select rol')
        rolSeleccionado.value = r
        console.log(rolSeleccionado.value)
    }

    function selectCategoria(c) {
        categoriaSeleccionada.value = c
        salarioRolCategoria.value = salarioRolCategorias.value.find(x => x.id_categoria == c.id && x.id_rol_laboral == rolSeleccionado.value.id)
    }

    function seleccionarAdicional(aid) {
        console.log('select adicional', aid)
        let adicionalId = adicionales.value.findIndex(x => x.id == aid)
        console.log(adicionalId)
        adicionales.value[adicionalId].selected = !adicionales.value[adicionalId].selected
    }

    function calcularSalario() {

        console.log('calcular salario')

        let aumento_rol_categoria = (configuracion.value.sueldo_min_base / 100 * salarioRolCategoria.value.salario_relativo / 100 * rolSeleccionado.value.salario_relativo) - configuracion.value.sueldo_min_base

        console.log('aumento_rol_categoria', aumento_rol_categoria)

        salario.value = configuracion.value.sueldo_min_base + aumento_rol_categoria

        for (let c = 0; c < adicionalesSeleccionados.value.length; c++) {
            console.log('adicional')
            let item = adicionalesSeleccionados.value[c]
            let aumento = suma_adicional({ salario_basico: configuracion.value.sueldo_min_base, item: item })
            console.log('aumento', aumento)
            salario.value += aumento
        }

    }
//Re start del Store a valores iniciales
    function resetSeleccionados() {
        rolSeleccionado.value = ref();
        categoriaSeleccionada.value = ref(); 
        adicionales.value.forEach(adicionalInit);
        salario.value = ref();    
    }

    return { configuracion, roles, rolSeleccionado, selectRol, categorias, categoriaSeleccionada, selectCategoria, adicionales, adicionalesSeleccionados, seleccionarAdicional, salario, loadConfig, calcularSalario, fechaCalculo, fechaExpiracion, resetSeleccionados }


})