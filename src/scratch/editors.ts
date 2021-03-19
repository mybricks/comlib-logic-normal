import blocks from './blocks'
import {EMPTY_INPUT_ID} from "./constants";

export default {
  '@init'({data, input, output}) {
    if (input.get().length <= 0) {
      const idx = getInputOrder({data, input})
      const title = `输入项${idx}`
      const hostId = `input${idx}`

      input.add(hostId, title,
        {
          request: [{type: 'follow'}],
          response: [{type: 'follow'}]
        }
        , true, 1)
    }
  },
  ':root': [
    {
      title: '添加输入项',
      type: 'Button',
      value: {
        set({data, input}) {
          const idx = getInputOrder({data, input})
          const title = `输入项${idx}`
          const hostId = `input${idx}`

          input.add(hostId, title,
            {
              request: [{type: 'follow'}],
              response: [{type: 'follow'}]
            }
            , true, 1)
        }
      }
    },
    {
      title: '添加输出项',
      type: 'Button',
      value: {
        set({data, output}) {
          const idx = getOutputOrder({data, output})
          const title = `输出项${idx}`
          const hostId = `output${idx}`

          output.add(hostId, title,
            {
              request: [{type: 'follow'}],
              response: [{type: 'follow'}]
            }
            , true, 1)
        }
      }
    },
    {
      title: '打开',
      type: 'scratch',
      options: {
        blocks
      },
      value: {
        get({data, input, output}) {
          const inputAry = input.get()
          inputAry.splice(0, 0, {id: EMPTY_INPUT_ID, title: '默认执行'})

          const outputs = output.get().map(out => ({
            id: out.id,
            title: out.title
          }))

          let fns = []
          if (data.fns) {
            fns = data.fns
          }

          return inputAry.map(item => {
            const ori = fns.find(fn => fn.id === item.id)

            return {
              id: item.id,
              title: item.title,
              input: item.id === EMPTY_INPUT_ID ? void 0 : item.id,
              outputs,
              vars: ori ? ori.vars : void 0,
              xml: ori ? ori.xml : void 0,
              script: ori ? ori.script : void 0,
            }
          })
        },
        set({data, input}, fns) {
          data.fns = fns
        }
      }
    }
  ]
}

function getInputOrder({data, input}) {
  if (data.inputCount === void 0) {
    const c = Object.keys(input.get()).length
    data.inputCount = c
  }
  return data.inputCount++
}

function getOutputOrder({data, output}) {
  if (data.outputCount === void 0) {
    const c = Object.keys(output.get()).length
    data.outputCount = c
  }
  return data.outputCount++
}