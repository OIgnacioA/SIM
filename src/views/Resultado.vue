<template>
    <div class="page">
        <!-- HEADER -->
        <div class="header">
            <img class="logo" src="/img/SIM_logo-01.png" />
        </div>
        <!-- Titulo -->
        <div class="title">¡Listo!</div>
        <div class="txt_title">Tu Salario Informatico <br> Minimo es</div>
        <div class="content">

            <div class="content_content">
                <div class="saldo">
                    <div class="ars">
                        ARS
                    </div>
                    <div>
                        $ {{ (simStore.salario / 1000).toFixed(3) }}
                    </div>
                </div>
                <div class="divider" />
                <div class="rol">{{ simStore.rolSeleccionado.nombre }}</div>
                <div class="exp">{{ simStore.categoriaSeleccionada.nombre }}</div>
                <div class="divider" v-if="simStore.adicionalesSeleccionados.length" />
                <div class="adicionales" v-if="simStore.adicionalesSeleccionados.length">
                    <div class="adicional_logo" v-for="adicional in simStore.adicionalesSeleccionados" :key="adicional.id">
                        <div class="adicional_icon_bkg">
                            <img :src='"/img/dinamic/adicionales/" + adicional.icono' class="adicional_icon">
                        </div>
                    </div>
                </div>
                <div class="divider" />
                <div class="fechas">
                    <div class="fecha_txt">Calculado el {{ simStore.fechaCalculo }}</div>
                    <div class="fecha_txt">Vigente hasta {{ simStore.fechaExpiracion }}</div>
                </div>
                <div class="convenio">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa culpa, iure tempora quo ut error
                    architecto
                    veniam illum labore expedita neque inventore, deleniti qui impedit ipsam. Ab labore quia ducimus.
                </div>
                <div class="divider"></div>
                <div class="noAlcanza">¿Tu salario no llega a este valor?</div>
                <div class="descargar">DESCARGAR</div>
                <div class="botonera">
                    <div class="back" @click="router.push({ path: '/adicionales' })">
                        <i class="pi pi-chevron-left"></i>
                        <div class="back_txt">ATRÁS</div>
                    </div>
                    <div class="inicio" @click=" resetInicio()">
                        <i class="pi pi-upload"></i>
                        <div class="inicio_txt">INICIO</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="footer">
        <div class="divider" />
        <div class="informaticos">informaticos.ar/sim</div>
        <div class="derechos">SIM es un desarrollo de AGC - Asociación Gremial de Computación.
            © 2023. Todos los derechos reservados</div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useSimStore } from "@/stores/sim"
import { onMounted, ref } from 'vue'

let simStore = useSimStore()
let router = useRouter()

function resetInicio() {
    useSimStore().resetSeleccionados();
    router.push({ path: '/' });
}

onMounted(() => {
    simStore.calcularSalario()
})

</script>

<style lang="scss" scoped>
.page {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100%;
    margin-bottom: -180px;
}

.page:after {
    content: "";
    display: block;
}

.footer,
.page:after {
    height: 180px;
}

.footer {
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .divider {
        width: 100%;
        border-top: 2px solid #bbb;
    }

    .informaticos {
        font-family: 'Gotham-Medium';
        color: #3698F1;
        font-size: 30px;
        margin-top: 40px;
    }

    .derechos {
        font-family: 'Gotham-Book';
        color: #bbb;
        text-align: center;
        font-size: 16px;
        width: 60%;
        margin-top: 30px;

    }
}

.header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
    width: 56%;
}

.logo {
    width: 100%;
}

.title {
    font-family: 'Gotham-Bold';
    margin-top: 90px;
    color: #FAFDF6;
    font-size: 80px;
    width: 67%;
    text-align: center;
    line-height: 1.1;
}

.txt_title {
    font-family: 'Gotham-Medium';
    width: 70%;
    color: #FAFDF6;
    font-size: 45px;
    text-align: center;
    line-height: 1.1;
    margin-top: 40px;
}

.content {
    flex-grow: 1;
    width: 100%;
    background-color: white;
    margin-top: 80px;
    border-radius: 20px 20px 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;


    .content_content {
        width: 80%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: white;


        .saldo {
            font-family: 'Gotham-Bold';
            color: #0F034B;
            display: flex;
            margin-top: 30px;
            font-size: 80px;
            align-items: flex-end;

            .ars {
                font-size: 60px;
                margin-bottom: 3px;
                margin-right: 20px;
            }
        }

        .divider {
            margin-top: 5px;
            border-top: 2px solid #bbb;
            width: 100%;
        }

        .rol {
            font-family: 'Gotham-Medium';
            margin-top: 5px;
            color: #0F034B;
            text-align: left;
            width: 100%;
            font-size: 40px;
        }

        .exp {
            font-family: 'Gotham-Medium';
            margin-top: -15px;
            color: #0F034B;
            text-align: left;
            width: 100%;
            font-size: 30px;
        }

        .adicionales {
            display: flex;
            width: 100%;
            justify-content: flex-start;
            margin: 10px 0;

            .adicional_logo {
                margin-top: 5px;
                margin-right: 10px;
                width: 65px;
                height: 65px;
                background-color: #2F9AFF;
                border-radius: 10px;

                .adicional_icon_bkg {
                    height: 60px;
                    width: 60px;
                    background-color: #FAFDF6;
                    border-radius: 50%;
                    position: relative;
                    margin: auto;
                    top: 3px;

                    .adicional_icon {
                        height: 80%;
                        position: relative;
                        top: 5px;
                        left: 6px;
                    }
                }
            }
        }

        .fechas {
            margin: 10px 0;
            width: 100%;
            display: flex;
            justify-content: space-between;

            .fecha_txt {
                font-family: 'Gotham-Medium';
                font-size: 20px;
                color: #bbb;
            }
        }

        .convenio {
            font-family: 'Gotham-Medium';
            font-size: 20px;
            color: #bbb;
            margin-bottom: 10px;
        }

        .noAlcanza {
            font-family: 'Gotham-Medium';
            color: #0F034B;
            margin: 20px 0;
            font-size: 30px;
            border: 2px solid black;
            border-radius: 15px;
            width: 100%;
            text-align: center;
            padding: 5px 0;
            cursor: pointer;

        }

        .descargar {
            font-family: 'Gotham-Medium';
            font-size: 40px;
            background-color: #FF17EC;
            color: #FFF9FF;
            width: 100%;
            text-align: center;
            padding: 20px 0;
            border-radius: 10px;
            font-weight: 700;
            cursor: pointer;
        }

        .botonera {
            display: flex;
            align-content: center;
            width: 90%;
            justify-content: space-around;
            margin-bottom: 30px;

            .back {
                color: #0F034B;
                margin-top: 20px;
                display: flex;
                justify-content: center;
                align-content: center;
                cursor: pointer;

                .pi {
                    font-size: 30px !important;
                    margin-top: 8px;
                    font-weight: 900;
                }

                .back_txt {
                    font-family: 'Gotham-Bold';
                    margin: 0 10px;
                    font-size: 25px;
                    margin-top: 2px;
                }
            }

            .inicio {
                color: #0F034B;
                margin-top: 20px;
                display: flex;
                justify-content: center;
                align-content: center;
                cursor: pointer;

                .pi {
                    font-size: 30px !important;
                    margin-top: 8px;
                    font-weight: 900;
                }

                .inicio_txt {
                    font-family: 'Gotham-Bold';
                    margin: 0 10px;
                    font-size: 25px;
                    margin-top: 2px;
                }
            }
        }
    }

}
</style>