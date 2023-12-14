import { createRouter, createWebHistory } from "vue-router";

import { useSimStore } from "../stores/sim";

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: () => import("@/views/Inicio.vue"),
  },
  {
    path: "/rol",
    name: 'Rol',
    component: () => import("@/views/Rol.vue"),
  },
  {
    path: "/experiencia",
    name: 'Experiencia',
    component: () => import("@/views/Experiencia.vue"),
    meta: {
      requireRol: true
    }
  },
  {
    path: "/adicionales",
    name: 'Adicionales',
    component: () => import("@/views/Adicionales.vue"),
    meta: {
      requireExperiencia: true
    }
  },
  {
    path: "/resultado",
    name: 'Resultado',
    component: () => import("@/views/Resultado.vue"),
    meta: {
      requireExperiencia: true
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  hash: false,
  routes,
});

router.beforeEach((to, from, next) => {
  const simStore = useSimStore()
  if (to.matched.some(record => record.meta.requireRol) && !simStore.rolSeleccionado) {
    next({ name: 'Inicio', query: { to: to.path } })
  } else if (to.matched.some(record => record.meta.requireExperiencia) && !simStore.categoriaSeleccionada) {
    next({ name: 'Inicio', query: { to: to.path } })
  }
  else next()
})

export default router;
