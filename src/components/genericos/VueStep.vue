<template>
  <div :class="[`v-step-warp-${direction}`, styleType]">
    <div class="v-step-progress-bg"> 
      <div
        class="v-step-progress-value"
        :style="progressStyle()"
      >
      </div>
    </div>
    <ul class="v-step-list">
      <li
        v-for="(step, index) in getSortedItems()"
        :key="index"
        class="v-step-item"
        :style="horizontalItemWidth()"
        @click="selectItem(index)">
        
        <img :src="url_icono(index)" />

        <div class="v-step-item-number" 
              :style="itemNumberStyle(index)"></div>

        <label class="v-step-item-label" 
              v-html="showItemLabel(index)"> </label>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';

  const emit = defineEmits(['selected'])
  defineExpose({ updateStep })

  const props = defineProps({
    nowStep: {
      required: false,
      default: 0
    },
    stepList: {
      type: Array,
      required: true
    },
    activeColor: {
      type: String,
      default: '#1fb11d'
    },
    sortBy: {
      type: String,
      default: ''
    },
    sortType: {
      type: String,
      default: 'ASC'
    },
    styleType: {
      type: String,
      default: 'style1',
      validator: (value) => {
        return ['style1', 'style2'].indexOf(value) !== -1
      }
    },
    direction: {
      type: String,
      default: 'horizontal'
    },
    optionLabel:{
      type: String
    },
    optionIcon:{
      type: String
    },
    optionValue:{
      type: String
    },
  })

  const optionSelected = ref(0)

  function getSortedItems(){
    let sentido_orden = 1

    if (props.sortBy == '') //si no se especifica ningun para establecer el orden, se entregan los resultados tal cual como llegan
      return props.stepList

    if (props.sortType == 'DESC'){
      sentido_orden = -1
    }

    return props.stepList.sort((item1, item2) => {
      if (item1[props.sortBy] < item2[props.sortBy]) {
        return -1 * sentido_orden;
      }
      if (item1[props.sortBy] > item2[props.sortBy]) {
        return 1 * sentido_orden;
      }
      return 0;
    })
  }

  function stepItemWidth () {
    return 100 / props.stepList.length
  }
  
  function horizontalItemWidth () {
    return props.direction === 'vertical'
      ? ''
      : { width: stepItemWidth() + '%' }
  }

  function progressStyle () {
    let iOption = getIndexForId(optionSelected.value)
    let oStyle = {
      'background-color': props.activeColor
    }
    if (props.direction === 'vertical') {
      oStyle.height = stepItemWidth() * (iOption + .5) + '%'
    } else {
      oStyle.width = stepItemWidth() * (iOption + .5) + '%'
    }
    return oStyle
  }

  function url_icono(i){ 
    return './img/dinamic/' + props.stepList[i][props.optionIcon]
  }

  function getIndexForId(id){
    for (let c=0; c < props.stepList.length; c++){
      if (props.stepList[c][props.optionValue] == id){
        return c
      }
    }
    return -1
  }

  function itemNumberStyle (index) {
    let style = ''
    let iOption = getIndexForId(optionSelected.value)

    if (index < iOption) {
      style = {
        'background-color': props.activeColor,
        'color': '#fff'
      }
    } else if (index == iOption) {
      style = {
        'background-color':'#FFF'
      }
    } else {
      style = {
        'border': 'none',
        'background-color':'#d1e6f9'
      }
    }
    return style
  }
  
  function showItemNumber (index) {
      return props.styleType !== 'style2' ? index + 1 : ''
  }
    
  function showItemLabel ( index ){
    if (props.stepList[index] == undefined){
      return ''
    }
    let text   = props.stepList[index][props.optionLabel]
    let text_a = text.split('\n')
    let len    = text_a.length

    text = ''

    for (let c=0; c<len; c++){
      if (c < (len-1)){
        text += '<b>' }

      if (c == (len-1)){
        text += '<i>' }

//
      text += text_a[c]
//
      if (c == (len-1)){
        text += '</i>' }

      if (c < (len-1)){
        text += '</b>'}

      if (c < len){
        text += '<br>'}

    }
    return text
  }
    
  function selectItem (itemIndex) {
    optionSelected.value = props.stepList[itemIndex][props.optionValue]
    emit('selected', optionSelected.value, itemIndex)
  }

  function updateStep( step = null){
    if (step === null)
      step = props.nowStep
    optionSelected.value = step
  }

  onMounted(async ()=>{    
    optionSelected.value = props.nowStep
  })
</script>

<style scoped>
.v-step-warp-horizontal {
  position: relative;
  padding: 10px 0;
  z-index: 2;
}
.v-step-warp-horizontal .v-step-progress-bg {
  position: absolute;
  width: 100%;
  height: 4px;
  top: calc( 41% + 2rem );
  background-color: #d1e6f9;
}
.v-step-warp-horizontal .v-step-progress-value {
  position: inherit;
  top: 0;
  left: 0;
  height: inherit;
}
.v-step-progress-value { transition-duration: .25s; }
.v-step-list {
  position: relative;
  display: -webkit-flex;
  display: flex;
  cursor: pointer;
  user-select: none;
}
.v-step-list,
.v-step-item {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.v-step-item img{
  width:  auto;
  height: 43%;
  margin-bottom: 1rem;
}
.v-step-warp-horizontal .v-step-list {
  justify-content: space-around;
  text-align: center;
  max-height: 9rem;
}
.v-step-item-label {
  font-size: 12px;
}
.v-step-item-number {
  width: 1rem;
  height: 1rem;
  line-height: 18px;
  font-size: 12px;
  border-radius: 50%;
  color: #666;
  background-color: #FFF;
  border: .25rem solid #007fec;
  transition-duration: .25s;
}
.v-step-warp-horizontal .v-step-item-label {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.v-step-warp-horizontal .v-step-item-number {
  margin: 5px auto;
}
.v-step-warp-horizontal.style2 .v-step-progress-bg {
  height: 2px;
  top: 19px;
}
.v-step-warp-horizontal.style2 .v-step-item-number {
  width: 10px;
  height: 10px;
  line-height: 10px;
}

.v-step-warp-vertical {
  position: relative;
  padding: 0;
  z-index: 2;
}
.v-step-warp-vertical .v-step-progress-bg {
  position: absolute;
  width: 4px;
  height: 100%;
  top: 0;
  left: 15px;
  background-color: #d1e6f9;
}
.v-step-warp-vertical .v-step-progress-value {
  position: absolute;
  top: 0;
  left: 0;
  width: inherit;
}
.v-step-warp-vertical .v-step-list {
  height: inherit;
  flex-direction: column;
  padding-left: 8px;
}
.v-step-warp-vertical .v-step-item {
  display: -webkit-flex;
  display: flex;
  height: 25%;
  align-items: center;
}
.v-step-warp-vertical .v-step-item-number {
  text-align: center;
}
.v-step-warp-vertical .v-step-item-label {
  position: absolute;
  order: 1;
  padding-left: 34px;
}
.v-step-warp-vertical.style2 .v-step-progress-bg {
  width: 2px;
}
.v-step-warp-vertical.style2 .v-step-item-number {
  width: 10px;
  height: 10px;
  line-height: 10px;
  margin-left: 3px;
}
.v-step-warp-vertical.style2 .v-step-item-label {
  padding-top: 0;
}
</style>
