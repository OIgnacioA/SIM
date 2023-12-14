<template>
    <div class="page">
        <!-- HEADER -->
        <div class="header">
            <img class="logo" src="/img/SIM_logo-01.png" />
            <div class="puntitos">
                <span class="dot dot_dark"></span>
                <span class="dot"></span>
                <span class="dot dot_dark"></span>
            </div>
        </div>
        <!-- Titulo -->
        <div class="txt_title">¿Cual es tu nivel de experiencia?</div>
        <!-- Subtitulo -->
        <div class="txt_subtitle">Comprende las tareas específicas a realizar en un puesto determinado.</div>
        <!-- Input -->
        <Dropdown v-model="selectedCategoria" :options="simStore.categorias" optionLabel="nombre" placeholder="Seleccionar"
            class="input" />
        <!-- Descripcion-->
        <div class="dsc" v-if="selectedCategoria">
            {{ selectedCategoria.descripcion }}
        </div>
    </div>
    <!-- Botonera -->
    <div class="footer">
        <div class="next" :class="{ next_enabled: selectedCategoria }"
            @click="selectedCategoria ? router.push({ path: '/adicionales' }) : void (0)">
            SIGUIENTE
        </div>
        <div class="back" @click="router.push({ path: '/rol' })">
            <i class="pi pi-chevron-left back_icon"></i>
            <div class="back_txt"> ATRÁS</div>
        </div>
    </div>
</template>

<script setup>
import Dropdown from 'primevue/dropdown';
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useSimStore } from "@/stores/sim"

let router = useRouter()
let simStore = useSimStore()

const selectedCategoria = ref()
selectedCategoria.value = simStore.categoriaSeleccionada ? simStore.categoriaSeleccionada : null

watch(selectedCategoria, (newCategoria) => {
    simStore.selectCategoria(newCategoria)
})

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
    margin-top: 70px;
}

.input {
    width: 73%;
    height: 90px;
    margin-top: 125px;
}

.dsc {
    font-family: 'Gotham-Medium';
    width: 70%;
    padding: 20px;
    color: #F7FEFF;
    font-size: 25px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 10px;
    margin: 50px;
}
.next {
    font-size: 35px;
    background-color: #ECF2FE;
    color: #A8ABAF;
    margin: 20px 0;
    width: 73%;
    text-align: center;
    padding: 20px 0;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
}

.next_enabled {
    background-color: #FF17EC;
    color: #FFF9FF;
}

.back {
    margin-top: 10px;
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

