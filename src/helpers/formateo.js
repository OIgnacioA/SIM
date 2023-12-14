export function formatMoney(value, decimals=2) {
  let val = (value/1).toFixed(decimals).replace('.', ',')
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

export function fechaDateToString( fecha, separador, formato='dd-mm-YYYY' ){
  if (fecha == null){
    return null
  }
  
  formato = formato.replace('dd', defineCantDigitosInt(fecha.getDate(),2))
  formato = formato.replace('mm', defineCantDigitosInt(fecha.getMonth() + 1, 2))
  formato = formato.replace('YYYY', fecha.getFullYear())
  formato = formato.replaceAll('-', separador)
  return formato
}

export function defineCantDigitosInt( numero, cant){
  numero = String(numero)
  let ceros = ''
  for(let c=0; c < (cant - numero.length); c++){
    ceros += '0'
  }
  return ceros+numero
}