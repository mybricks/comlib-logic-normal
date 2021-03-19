const indexDropDownOptions = [
  ['秒', 'second'],
  ['分钟', 'minute'],
  ['小时', 'hour'],
  ['天', 'days'],
  ['周', 'week'],
  ['月', 'month'],
  ['季度', 'quarter'],
  ['年', 'year']
]
const aroundDropDownOptions = [
  ['前', 'subtract'],
  ['后', 'add']
]
const momentIndex = 'moment_distance_from_current_index'
const momentNumber = 'moment_distance_from_current_number'
const momentAround = 'moment_distance_from_current_around'

export default {
  name: 'xg.moment_distance_from_current',
  title: '相比较于当前时间间隔',
  data: {},
  render(renderer) {
    renderer.setColour('#61b2a7')
    renderer.setInputsInline(true)
    renderer.setOutput(true, 'Number')

    const numberInput = renderer.appendValueInput(momentNumber).setCheck('Number')
    const newNumberBlock = renderer.workspace.newBlock('math_number')

    newNumberBlock.setShadow(true)
    newNumberBlock.initSvg()
    newNumberBlock.render()

    numberInput.connection.connect(newNumberBlock.outputConnection)

    renderer.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(indexDropDownOptions), momentIndex)

    renderer.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(aroundDropDownOptions), momentAround)
      .appendField('的时间戳')
  },
  to(type, block) {
    if (type === 'js') {
      const index = block.getFieldValue(momentIndex)
      const around = block.getFieldValue(momentAround)
      const number = Blockly.JavaScript.valueToCode(block, momentNumber, Blockly.JavaScript.ORDER_NONE)
      return [`
        window?.moment().${around}(${number}, '${index}').valueOf() || 0
      `, Blockly.JavaScript.ORDER_ATOMIC]
    }
  }
}
