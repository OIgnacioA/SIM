<template>
    <div class="page">
        <!-- HEADER -->
        <div class="header">
            <img class="logo" src="/img/SIM_logo-01.png" />
        </div>
        <!-- Titulo -->
        <div class="txt_title">Tu piso salarial informático en minutos</div>

        <div class="content">
            <div class="content_content">
                <div class="comenzar" @click="router.push({ path: '/rol' })">
                    COMENZAR
                </div>

                <div class="tutorial">
                    Ver tutorial
                </div>

                <div class="accordion_divider"></div>

                <button class="accordion">¿Qué es SIM?
                    <i class="pi pi-chevron-down"></i>
                </button>
                <div class="panel">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                        deserunt mollit anim id est
                        laborum.
                    </p>
                </div>

                <div class="accordion_divider"></div>

                <button class="accordion">¿Cómo se calcula?
                    <i class="pi pi-chevron-down"></i>
                </button>
                <div class="panel">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                        deserunt mollit anim id est
                        laborum.
                    </p>
                </div>

                <div class="accordion_divider"></div>

                <button class="accordion">¿Quiénes somos?
                    <i class="pi pi-chevron-down"></i>
                </button>
                <div class="panel">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                        deserunt mollit anim id est
                        laborum.
                    </p>
                </div>

                <div class="accordion_divider"></div>

                <div class="ayuda">
                    Ayuda
                </div>

            </div>
        </div>
    </div>
    <div class="footer">
        <div class="divider" />

        <div class="imagenes">
            <img class="agc" src="/img/logo_agc.png" />
            <img class="ti" src="/img/logo_ti.png" />

        </div>

        <div class="informaticos">informaticos.ar/sim</div>
        <div class="derechos">SIM es un desarrollo de AGC - Asociación Gremial de Computación.
            © 2023. Todos los derechos reservados</div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from "vue-router";
import { useSimStore } from "@/stores/sim"

let router = useRouter()
let simStore = useSimStore()

onMounted(async () => {
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            let p
            let selectedActive = false
            if (this.nextElementSibling.style.display === "block") {
                this.nextElementSibling.style.display = "none";
            } else {
                for (p = 0; p < acc.length; p++) {
                    if (acc[p].nextElementSibling.style.display === "block") {
                        acc[p].nextElementSibling.style.display = "none";
                    }
                }
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                    panel.style.display = "none";
                } else {
                    panel.style.display = "block";
                }
            }
        });
    }

    await simStore.loadConfig()

})

</script>

<style lang="scss" scoped>
.page {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100%;
    margin-bottom: -330px;
}

.page:after {
    content: "";
    display: block;
}

.footer,
.page:after {
    height: 330px;
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

    .imagenes {
        margin-top: 65px;
        display: flex;
        justify-content: space-around;
        width: 70%;
        align-items: center;

        .agc {
            height: 60px;
        }

        .ti {
            height: 50px;
        }
    }

    .informaticos {
        font-family: 'Gotham-Medium';
        color: #3698F1;
        font-size: 30px;
        margin-top: 55px;
    }

    .derechos {
        font-family: 'Gotham-Book';
        color: #bbb;
        text-align: center;
        font-size: 16px;
        width: 60%;
        margin-top: 35px;
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

.txt_title {
    font-family: 'Gotham-Bold';
    margin-top: 100px;
    color: #FAFDF6;
    font-size: 60px;
    width: 67%;
    text-align: center;
    line-height: 1.1;
}

.content {
    flex-grow: 1;
    width: 100%;
    background-color: white;
    margin-top: 150px;
    border-radius: 20px 20px 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    .content_content {
        width: 74%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: white;

        .comenzar {
            font-family: 'Gotham-Bold';
            height: 110px;
            width: 100%;
            font-size: 45px;
            text-align: center;
            position: relative;
            top: -75px;
            padding: 20px 0;
            margin: 20px auto;
            margin-bottom: 0px;
            background-color: #FF17EC;
            color: #FFF9FF;
            border-radius: 10px;
            cursor: pointer;
        }

        .tutorial {
            font-family: 'Gotham-Book';
            font-size: 30px;
            color: #9D9D9B;
            margin-bottom: 60px;
            cursor: pointer;
            font-weight: 600;
        }

        .ayuda {
            font-family: 'Gotham-Book';
            font-size: 30px;
            color: #9D9D9B;
            margin-top: 50px;
            margin-bottom: 50px;
            cursor: pointer;
            font-weight: 600;
        }

        .accordion {
            font-family: 'Gotham-Medium';
            color: black;
            background-color: white;
            font-size: 40px;
            cursor: pointer;
            padding: 18px;
            width: 100%;
            text-align: left;
            border: none;
            outline: none;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .pi {
                font-size: 35px;
            }
        }

        .accordion_divider {
            width: 100%;
            border-top: 2px solid #bbb;
        }

        .accordion:hover {
            background-color: #ccc;
        }

        .panel {
            padding: 0 18px;
            background-color: white;
            display: none;
            overflow: hidden;
        }
    }
}
</style>