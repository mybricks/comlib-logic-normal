import {EMPTY_INPUT_ID} from "./constants";

export default function ({env, data, inputs, outputs}) {
  if (env?.runtime && inputs) {
    if (data.fns) {
      let dfScript
      const scriptAry = []
      data.fns.forEach(fn => {
        if (fn.id === EMPTY_INPUT_ID) {
          dfScript = fn.script
        } else {
          scriptAry.push(fn.script)
        }
      })

      const scripts = scriptAry.join(';')
      // .replaceAll('\\n', '')
      const evalScript = `
      (function({${Object.keys(inputs).join(',')}},{${Object.keys(outputs).join(',')}},_envVars_){
        var _debugLog=function(contentAry,style){}
        try{
          ${(dfScript || '')};
          ${(scripts || '')}
        }catch(ex){
          console.error(ex)
          throw new Error('Scratch组件发生错误.')
        }finally{
          //defaultDid = true
        }
      })
    `
      let ffn
      try {
        ffn = eval(evalScript)
      } catch (ex) {
        console.warn(evalScript)
        console.error('Scratch组件编译错误.', ex)
        return
      }

      ffn(inputs, outputs, env.runtime)
    }
  }
}