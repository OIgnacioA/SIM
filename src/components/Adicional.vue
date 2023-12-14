<template>
    <div v-if="props.adicional.selected" class="adicional_card">
        <div class="adicional_content">
            <div class="adicional_info">
                <div class="adicional_logo">
                    <div class="adicional_icon_bkg">
                        <img :src='"/img/dinamic/adicionales/" + props.adicional.icono' class="adicional_icon">
                    </div>
                </div>
                <div class="adicional_titulo">
                    {{ props.adicional.nombre }}
                </div>
                <div v-if="props.adicional.valores.operacion == 'aumento_porcentual_base'" class="adicional_porcentaje">
                    +{{ Math.round(aumento_base) }}%
                </div>
                <div v-if="props.adicional.valores.operacion == 'aumento_absoluto_base'" class="adicional_porcentaje">
                    +${{ Math.round(aumento_base) }}
                </div>
            </div>
            <div class="adicional_input" v-if="props.adicional.tipo_control == 'number'">
                <button @click="decrement" class="counter-button">-</button>
                <input class="adicional_input_counter" :disabled="!props.adicional.selected" type="number"
                    v-model="contador" :max="props.adicional.valores.input.max" :min="props.adicional.valores.input.min">
                <button @click="increment" class="counter-button">+</button>    
                <span class="adicional_input_unit">{{
                    props.adicional.valores.input.unidad }}</span>
            </div>
            <Dropdown :disabled="!props.adicional.selected" v-if="props.adicional.tipo_control == 'select'"
                v-model="selectedInput" :options="props.adicional.valores.input" optionLabel="text"
                placeholder="Seleccionar" class="input" />
        </div>
        <div v-if="props.adicional.tipo_control == 'switch'" class="adicional_spacer" />
        <div v-else class="adicional_spacer_tall" />
        <i class="pi pi-plus adicional_suma" :class="{ adicional_cancelar: props.adicional.selected }"
            @click="selectAdicional(props.adicional.id)"></i>
    </div>
    <div v-else class="adicional_card not_selected">
        <div class="adicional_content">
            <div class="adicional_info">
                <div class="adicional_logo">
                    <div class="adicional_icon_bkg">
                        <img :src='"/img/dinamic/adicionales/" + props.adicional.icono' class="adicional_icon">
                    </div>
                </div>
                <div class="adicional_titulo">
                    {{ props.adicional.nombre }}
                </div>
            </div>
        </div>
        <div class="adicional_spacer" />
        <i class="pi pi-plus adicional_suma" :class="{ adicional_cancelar: props.adicional.selected }"
            @click="selectAdicional(props.adicional.id)"></i>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useSimStore } from "@/stores/sim"
import Dialog from 'primevue/dialog';

const props = defineProps(["adicional"]);
let simStore = useSimStore()

const contador = ref(0)
const selectedInput = ref(null)

const aumento_base = ref(0)

aumento_base.value = props.adicional.tipo_control == 'switch' ? props.adicional.valores.value : 0
updateAumentoBase()

watch(contador, (contadorValue) => {
    aumento_base.value = contador.value * props.adicional.valores.value
    updateAumentoBase()
})

watch(selectedInput, (selectedInputValue) => {
    aumento_base.value = selectedInput.value.value
    updateAumentoBase()
})

function selectAdicional(c) {
    simStore.seleccionarAdicional(c)
}

function updateAumentoBase() {
    props.adicional.aumento_base = aumento_base.value
}

function increment() {
  if (contador.value < props.adicional.valores.input.max) {
    contador.value++;
  }
  console.log('Increment:', contador.value);
}

function decrement() {
  if (contador.value > props.adicional.valores.input.min) {
    contador.value--;
  }
  console.log('Decrement:', contador.value);
}

</script>

<style lang="scss" scoped>
.input {
    width: 100%;
    height: 60px;
    margin-top: 10px;
}



.adicional_card {
    background-color: white;
    width: 95%;
    border-radius: 10px;
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    .adicional_content {
        margin: 10px 0;
        display: flex;
        flex-direction: column;
        margin-left: 15px;
        width: 80%;

        .adicional_input {

            width: 100%;
            font-size: 20px;
            display: flex;
            align-items: baseline;
            justify-content: flex-end;
            position: relative;

            .counter-button {
                background-color: #FF18EB;
                color: white;
                font-size: 20px;
                border: none;
                padding: 10px;
                border-radius: 5px;
                cursor: pointer;
                margin: 0 5px;
            }

            .adicional_input_counter {
                height: 50px;
                font-size: 35px;
                border: 2px solid #FF18EB;
                border-radius: 5px;
                width: calc(100% - 60px);
                padding: 5px;
                text-align: center;
                margin: 25px;
                background-color: white;
            }

            .adicional_input_unit {
                font-family: 'Gotham-Bold';
                margin-left: 0px;
            }
        }

        .adicional_info {
            display: flex;
            align-items: center;

            .adicional_logo {
                width: 60px;
                height: 60px;
                background-color: #2F9AFF;
                border-radius: 10px;

                .adicional_icon_bkg {
                    height: 54px;
                    width: 54px;
                    background-color: #FAFDF6;
                    border-radius: 50%;
                    position: relative;
                    margin: auto;
                    top: 4px;

                    .adicional_icon {
                        height: 85%;
                        position: relative;
                        top: 3px;
                        left: 4px;
                    }
                }
            }

            .adicional_titulo {
                font-family: 'Gotham-Bold';
                font-size: 30px;
                margin-left: 10px;
                width: 270px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .adicional_porcentaje {
                font-family: 'Gotham-Bold';
                background-color: #10054A;
                color: #17C574;
                font-size: 25px;
                border-radius: 25px;
                padding: 5px 8px;
                margin-left: 10px;
            }
        }
    }

    .adicional_spacer_tall {
        border-left: 2px solid rgba(119, 119, 119, 0.4);
        margin-left: 15px;
        height: 145px;
    }

    .adicional_spacer {
        border-left: 2px solid rgba(119, 119, 119, 0.4);
        margin-left: 15px;
        height: 75px;
    }

    .adicional_suma {
        background-color: #FF18EB;
        font-size: 20px;
        font-weight: bold;
        color: white;
        padding: 10px;
        border-radius: 50%;
        margin-left: 15px;
        cursor: pointer;
    }

    .adicional_cancelar {
        background-color: #9D9D9B;
        rotate: 45deg;
    }
}

.not_selected {
    margin: 10px auto;
    width: 65%;
    padding-right: 40px;

    .adicional_content {
        .adicional_info {
            .adicional_logo {
                height: 60px;
                width: 90px;

                .adicional_icon_bkg {
                    height: 54px;
                    width: 54px;
                    top: 3px;

                    .adicional_icon {
                        top: 3px;
                        left: 4px;
                    }
                }
            }
        }
    }

    .adicional_spacer {
        border-left: 2px solid rgba(119, 119, 119, 0.4);
        margin-left: 15px;
        height: 75px;
    }

    .adicional_suma {
        background-color: #FF18EB;
        font-size: 20px;
        font-weight: bold;
        color: white;
        padding: 10px;
        border-radius: 50%;
        margin-left: 15px;
        cursor: pointer;
    }

    .adicional_cancelar {
        background-color: #9D9D9B;
        rotate: 45deg;
    }
}
</style>

<style lang="scss">
.adicional_card {
    .p-dropdown-label {
        font-size: 40px;
        position: relative;
        top: -3px !important;
        height: 100%;
        color: #9E9E9E !important;
        margin-left: 5px !important;
        border: 0 !important;
    }
}
</style>