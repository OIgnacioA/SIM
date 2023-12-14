<template>
  <div class="row">
    <div class="col-12">

      <div class="row" v-for="(redsocial) in redes_sociales" :key="redsocial">
        <div class="col">
          {{redsocial.nombre}}
        </div>
        <div class="col">
          <Button icon="pi pi-link" @click="compartir_red_social(redsocial)"  iconPos="right" />
        </div>
      </div>
      <div class="row" v-if="can_share()">
        <div class="col">
          Compartir en APP
        </div>
        <div class="col">
          <Button icon="pi pi-link" @click="compartir_web_share()"  iconPos="right" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps(['params'])

const redes_sociales = ref([
  { nombre: "Facebook", url: "https://www.facebook.com/sharer/sharer.php?u=" },
  { nombre: "Twitter", url: "https://twitter.com/intent/tweet?url=" },
  { nombre: "Linkedin", url: "https://www.linkedin.com/shareArticle?mini=true&url=" }
])

function compartir_red_social( redsocial ){
  let url = redsocial.url + window.location
  window.open( url, '_blank');
}

function can_share(){
  return typeof navigator.share == 'function'
}

async function compartir_web_share(){

  const shareData = {
    title: 'Simulador de Salario Informático Mínimo',
    text: props.params.description,
    url: window.location
  }

  try {
    if (typeof navigator.share !== 'function') 
      alert ('Web Share API no soportada, ¿Su navegador la soporta?')
    else 
      await navigator.share(shareData)
  } catch(err) {
    console.log(err)
  }
}

</script>

<style lang="scss">
</style>