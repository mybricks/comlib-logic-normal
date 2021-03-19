import {message} from 'antd'

export default function ({data, inputs}) {
  if (inputs) {
    inputs['toast'](val => {
      message[data.type](JSON.stringify(val), data.interval)
    })
  }
}