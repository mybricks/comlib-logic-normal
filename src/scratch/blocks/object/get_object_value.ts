let oldAry: Array<string> = ['u_yswpcp']
 
export default {
  name: 'xg.get_object_value',
  title: '对象获取',
  data: {
    ary: ['u_yswpcp']
  },
  render(renderer, data) {
    renderer.setColour(30)
    renderer.appendValueInput('inputVarName')
    renderer.inputsInline = true
    renderer.setOutput(true)

    function draw(init = false) {
      if (data.ary.length) {
        data.ary.forEach((item: string) => {
          console.log(item, oldAry, '999')
          console.log((oldAry || []), 888 )
          if (!(oldAry || []).includes(item)) {
            renderItem(renderer, item)
          } else {
            if (init) {
              renderItem(renderer, item)
            }
          }
        })
        oldAry = data.ary
      } else {
        oldAry = []
      }
      
    }

    draw(true)

    return () => {
      const inputList = renderer.inputList
      if (inputList) {
        inputList.slice(1).forEach(item => {
          if (!data.ary.includes(item.name)) {
            renderer.removeInput(item.name)
          }
        })
      }
      draw()
    }
  },
  /**
   * 编辑器
   */
  editors: [{
    title: '',
    type: 'draglist',
    options: {
      label: '子项，点击右侧按钮删除',
      isDrag: false
    },
    value: {
      get({data}: any) {
        oldAry = data.ary
        return data.ary
      },
      set({data}: any, val: any[]) {
        data.ary = val
      }
    }
  }],
  to(type, block, data) {
    if (type === 'js') {
      const varName = Blockly.JavaScript.valueToCode(block, 'inputVarName', Blockly.JavaScript.ORDER_NONE) || "''"
      const ary = []

      if (data.ary) {
        data.ary.forEach(key => {
          const value = Blockly.JavaScript.valueToCode(block, key, Blockly.JavaScript.ORDER_NONE)
          ary.push(`[${value}]`)
        })
      }
      return [`${varName}${ary.join('')}`, Blockly.JavaScript.ORDER_ATOMIC]
    }
  }
}

function renderItem(renderer, item) {
  const valueInput = renderer.appendValueInput(item)
    .appendField('.')
  const newValueBlock = renderer.workspace.newBlock('var_unknow')

  newValueBlock.setShadow(true);
  newValueBlock.initSvg();
  newValueBlock.render();

  valueInput.connection.connect(newValueBlock.outputConnection)
}


// const DataTpt = {
//   keyAry: ['name'],
//   accessType: 'constant'
// }

// export default {
//   name: 'xg.get_object_value',
//   title: '对象获取',
//   data: DataTpt,
//   render(renderer, data, {getCurVarAry}) {
//     renderer.setColour(30)

//     renderer.appendValueInput('inputVarName')
//     renderer.inputsInline = true
//     renderer.setOutput(true)

//     function draw() {
//       if (data.keyAry) {
//         if (renderer.getInput('keys')) {
//           renderer.removeInput('keys')
//         }
//         const keysInput = renderer.appendDummyInput('keys')
//         data.keyAry.forEach((key, idx) => {
//           keysInput.appendField('.')
//             .appendField(new Blockly.FieldTextInput(key, val => {
//               data.keyAry[idx] = val
//             }), key)
//         })
//       }
//     }

//     draw()

//     return () => {
//       const inputList = renderer.inputList
//       if (inputList) {
//         const names = inputList.map((input, idx) => {
//           if (idx >= 1) {
//             return input.name
//           }
//         }).filter(name => name)
//         names.forEach(name => {
//           renderer.removeInput(name)
//         })
//       }

//       draw()
//     }
//   },
//   /**
//    * 编辑器
//    */
//   editors: [{
//     title: '变量获取方式',
//     type: 'select',
//     options: [{
//       label: '常量',
//       value: 'constant'
//     }, {
//       label: '变量',
//       value: 'variable'
//     }],
//     value: {
//       get({data}) {
//         return data.accessType
//       },
//       set({data}, val) {
//         data.accessType = val
//       }
//     }
//   }, {
//     title: '项',
//     type: 'list',
//     value: {
//       get({data}) {
//         return data.keyAry
//       },
//       set({data}, val) {
//         //data.keyAry = val.map((key)=>key)
//         data.keyAry = val
//       }
//     }
//   }],
//   to(type, block, data, {logDebug}) {
//     if (type === 'js') {
//       const varName = Blockly.JavaScript.valueToCode(block, 'inputVarName', Blockly.JavaScript.ORDER_NONE) || "''"
//       const keyAry = []

//       if (data.keyAry) {
//         data.keyAry.forEach(key => {
//           if (data.accessType === 'constant') {
//             keyAry.push(`['${key}']`)
//           } else {
//             keyAry.push(`[${key}]`)
//           }
//         })
//       }
//       return [`${varName}${keyAry.join('')}`, Blockly.JavaScript.ORDER_ATOMIC]
//     }
//   }
// }
