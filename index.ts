import toast from './src/toast'
import scratch from './src/scratch'

export default {
  title: '通用逻辑组件库',
  author: 'CheMingjun',
  icon: '',
  version: '1.0.1',
  comAray: [
    toast, scratch
  ]
    .map(b => {
      const rtn = Object.assign({rtType: 'js'}, b.json, b)
      delete rtn.json
      return rtn
    })
}