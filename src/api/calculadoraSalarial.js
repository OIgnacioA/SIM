import request from '@/helpers/request'

export function getConfig() {
  return request({
    url: '/calculadora_salarial_conf',
    method: 'get',
  })
}
