const indexDropDownOptions = [
  // ['秒', 'second'],
  // ['分钟', 'minute'],
  // ['小时', 'hour'],
  ['天', 'days'],
  ['周', 'week'],
  ['月', 'month'],
  ['季度', 'quarter'],
  ['年', 'year']
]
const aroundDropDownOptions = [
  ['开始', 'startOf'],
  ['结束', 'endOf']
]
const momentIndex = 'moment_current_start_end_index'
const momentAround = 'moment_current_start_end_around'

export default {
  name: 'xg.moment_current_start_end',
  title: '相比较于当前时间间隔',
  data: {},
  render(renderer) {
    renderer.setColour('#61b2a7')
    renderer.setInputsInline(true)
    renderer.setOutput(true, 'Number')

    renderer.appendDummyInput()
    .appendField('当')
      .appendField(new Blockly.FieldDropdown(indexDropDownOptions), momentIndex)
      

    renderer.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(aroundDropDownOptions), momentAround)
      .appendField('的时间戳')
  },
  to(type, block) {
    if (type === 'js') {
      const index = block.getFieldValue(momentIndex)
      const around = block.getFieldValue(momentAround)
      return [`
        window?.moment().${around}('${index}').valueOf() || 0
      `, Blockly.JavaScript.ORDER_ATOMIC]
    }
  }
}
