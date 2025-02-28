const DataTpt = {
  list: ['u_firse']
}
let listMap = {}

export default {
  name: 'xg.text_joincustom',
  title: '字符串拼接',
  data: DataTpt,
  render(renderer, data) {
    renderer.setStyle('text_blocks')
    renderer.setOutput(true, 'String')

    function draw() {
      if (data.list.length && renderer.getInput('EMPTY')) {
        renderer.removeInput('EMPTY')
      } else if (!data.list.length && !renderer.getInput('EMPTY')) {
        renderer.appendDummyInput('EMPTY')
          .appendField('空文本')
      }

      data.list.forEach((item, idx) => {
        const i = listMap[item]
        const valueInput = renderer.appendValueInput(item).setAlign(Blockly.ALIGN_RIGHT).setCheck('String');

        if (i && typeof i !== 'string') {
          valueInput.connection.connect(i)
        }
        if (idx == 0) {
          valueInput.appendField('字符拼接')
        }
      })
    }

    draw()

    return () => {
      const inputList = renderer.inputList

      listMap = {}

      if (inputList) {
        const names = inputList.map((input, idx) => {
          return input.name
        }).filter(name => name)

        data.list.forEach((item, idx) => {
          if (renderer.getInput(item)) {
            listMap[item] = renderer.getInput(item).connection.targetConnection
          } else {
            listMap[item] = item
          }
        })

        names.forEach(name => {
          renderer.removeInput(name)
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
      label: '项目'
    },
    value: {
      get({data}: any) {
        return data.list
      },
      set({data}: any, val: any[]) {
        data.list = val
      }
    }
  }],
  to(type, block, data, {logDebug}) {
    if (type === 'js') {
      const rtn: any[] = []
      data.list.forEach((key: string) => {
        const val = Blockly.JavaScript.valueToCode(block, key, Blockly.JavaScript.ORDER_NONE) || ''
        rtn.push(val)
      })

      return [`[${rtn}].join('')`, Blockly.JavaScript.ORDER_ATOMIC]
    }
  }
}
