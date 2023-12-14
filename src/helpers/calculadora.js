import { formatMoney } from '@/helpers/formateo'
import { toRaw } from 'vue';

const _INPUT_VALOR_INGRESADO = {
  'switch': (item) => item.valores.value,
  'select': (item) => item.value,
  'number': (item) => item.value * item.valores.value
}

const OPERACIONES = {
  'aumento_porcentual_base': {
    _calc: (input) => {
      return input.salario_basico / 100 * toRaw(input.item).aumento_base
    },
    formatos: {
      'adicional_select': (input) => toRaw(input.item).aumento_base + '%'
    }
  },
  'aumento_absoluto_base': {
    _calc: (input) => {
      return toRaw(input.item).aumento_base
    },
    formatos: {
      'adicional_select': (input) => '$' + formatMoney(toRaw(input.item).aumento_base, 0)
    }
  }
}

export function valor_formateado(input, formato) {
  return OPERACIONES[input.item.valores.operacion].formatos[formato](input)
}

export function suma_adicional(input) {
  return OPERACIONES[input.item.valores.operacion]._calc(input)
}