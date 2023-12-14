<template>
  <div class="appfooter">
    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="col-12 col-sm-auto  p-3">
          <div class="row justify-content-center">
            <div class="col-auto">
              <img class="logo_a" src="/img/logo_agc_1.svg" />
            </div>
          </div>

        </div>
        <div class="col-12 col-sm-auto  p-4">
          <div class="row justify-content-center">
            <div class="col-auto">
              <img class="logo_t" src="/img/Logo_TI_blanco.svg" />
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-auto descripcion">
          <p>SIM es un desarrollo de AGC - Asociación Gremial de Computación.<br>
            © 2023. Todos los derechos reservados</p>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.appfooter .logo_t {
  height: 4rem;
}

.appfooter .logo_a {
  height: 5rem;
}

.appfooter {
  background-color: #0080eb;
  color: #FFF;
  padding-bottom: 1rem;
  padding-top: 1rem;
}

.descripcion {
  text-align: center;
}

@media (min-width: 768px) {
  .descripcion {
    text-align: right !important;
  }
}
</style>
