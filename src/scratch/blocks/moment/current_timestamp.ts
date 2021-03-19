export default {
  name: 'xg.moment_current_timestamp',
  title: '当前时间戳',
  data: {},
  render(renderer) {
    renderer.setColour('#61b2a7')
    renderer.setInputsInline(true)
    renderer.setOutput(true, 'Number')

    renderer.appendDummyInput()
      .appendField('当前时间戳')
  },
  to(type) {
    if (type === 'js') {
      return [`
        window?.moment().valueOf() || 0
      `, Blockly.JavaScript.ORDER_ATOMIC]
    }
  }
}
