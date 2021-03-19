const momentTime = 'time_format_timestamp'
const momentFormat = 'time_format_format'

export default {
  name: 'xg.moment_time_format',
  title: '格式化',
  data: {},
  render(renderer) {
    renderer.setColour('#61b2a7')
    renderer.setInputsInline(true)
    renderer.setOutput(true, 'String')
    
    renderer.appendValueInput(momentTime).
      setCheck('Number').
      appendField('将时间戳')

    const formatEdit = renderer.appendValueInput(momentFormat)
      .setCheck('String')
      .appendField('格式化成')

    const newValueBlock = renderer.workspace.newBlock('var_unknow')

    newValueBlock.setShadow(true);
    newValueBlock.initSvg();
    newValueBlock.render();

    formatEdit.connection.connect(newValueBlock.outputConnection)
  },
  to(type, block) {
    if (type === 'js') {
      const time = Blockly.JavaScript.valueToCode(block, momentTime, Blockly.JavaScript.ORDER_NONE)
      const format = Blockly.JavaScript.valueToCode(block, momentFormat, Blockly.JavaScript.ORDER_NONE)
      return [`
        window?.moment(${time}).format(${format})
      `, Blockly.JavaScript.ORDER_ATOMIC]
    }
  }
}
