<template>
    <div class="page">
        <!-- HEADER -->
        <div class="header">
            <img class="logo" src="/img/SIM_logo-01.png" />
            <div class="puntitos">
                <span class="dot dot_dark"></span>
                <span class="dot dot_dark"></span>
                <span class="dot"></span>
            </div>
        </div>
        <!-- Titulo -->
        <div class="txt_title">Seleccioná tus adicionales</div>
        <!-- Subtitulo -->
        <div class="txt_subtitle">Comprende las tareas específicas a realizar en un puesto determinado.</div>
        <!-- Leer mas -->
        <div class="leer_mas">Leer más</div>
        <!-- Adicionales -->
        <ScrollPanel class="scroll_adicionales">
            <Adicional v-for="adicional in simStore.adicionales" :key="adicional.id" :adicional="adicional"></Adicional>
        </ScrollPanel>
    </div>
    <!-- Botonera -->
    <div class="footer">
        <div class="calcular" @click="router.push({ path: '/resultado' })">
            CALCULAR
        </div>
        <div class="back" @click="router.push({ path: '/experiencia' })">
            <i class="pi pi-chevron-left back_icon"></i>
            <div class="back_txt"> ATRÁS</div>
        </div>
    </div>
</template>

<script setup>
import ScrollPanel from 'primevue/scrollpanel';
import Dropdown from 'primevue/dropdown';
import { useSimStore } from "@/stores/sim"
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import Adicional from "../components/Adicional.vue"

let router = useRouter()
let simStore = useSimStore()

function updateInput(e) {
    console.log('event', e)
}

function selectAdicional(c) {
    simStore.seleccionarAdicional(c)
}

</script>

<style lang="scss" scoped>
.page {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100%;
    margin-bottom: -245px;
    background: rgb(16, 6, 77);
    background: linear-gradient(180deg, rgba(16, 6, 77, 1) 0%, rgba(9, 9, 121, 1) 26%, rgba(43, 145, 255, 1) 100%);
}

.page:after {
    content: "";
    display: block;
}

.footer,
.page:after {
    height: 245px;
}

.footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

}

.dot {
    height: 20px;
    width: 20px;
    background-color: #FAFDF6;
    border-radius: 50%;
    display: inline-block;
    margin: 60px 12px;
}

.dot_dark {
    background-color: #10044C;
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

.txt_title {
    font-family: 'Gotham-Bold';
    color: #FAFDF6;
    font-size: 60px;
    width: 67%;
    text-align: center;
    line-height: 1.1;
}

.txt_subtitle {
    font-family: 'Gotham-Medium';
    width: 60%;
    color: #FAFDF6;
    font-size: 35px;
    text-align: center;
    line-height: 1.1;
    margin-top: 60px;
}

.leer_mas {
    font-family: 'Gotham-Medium';
    color: white;
    font-size: 30px;
    border: 1px white solid;
    padding: 1px 8px;
    border-radius: 10px;
    margin-top: 25px;
}

.scroll_adicionales {
    width: 76%;
    height: 600px;
    margin-left: 27px;
    margin-top: 50px;


}

.calcular {
    font-size: 35px;
    background-color: #06CE6E;
    color: white;
    margin-top: 10px;
    width: 73%;
    text-align: center;
    padding: 20px 0;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
}


.back {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-content: center;
    color: #ECF2FE;
    cursor: pointer;

    .pi {
        font-size: 30px !important;
        margin-top: 8px;
        font-weight: 900;
    }

    .back_txt {
        margin: 0 10px;
        font-size: 30px;
        font-weight: bold;
    }
}
</style>

<style lang="scss">
.scroll_adicionales {
    .p-scrollpanel-bar-y {
        visibility: hidden;
    }
}
</style>