const typeMap = {
  'OBJECT': '[object Object]',
  'ARRAY': '[object Array]',
  'STRING': '[object String]',
  'NUMBER': '[object Number]',
  'FORMDATA': '[object FormData]'
}

export function copyText(txt: string): boolean {
  const input = document.createElement('input')
  document.body.appendChild(input)
  input.value = txt
  input.select()
  document.execCommand('copy')
  document.body.removeChild(input)
  return true
}

export function typeCheck(variable: any, type: string): boolean {
  const checkType = /^\[.*\]$/.test(type) ? type : typeMap[type.toUpperCase()]
  return Object.prototype.toString.call(variable) === checkType
}

export function schemaCheck(schema: any, data: any, type?: any) {
  if (!typeCheck(data, 'array') && !typeCheck(data, 'object') && data === schema) return true
  if (typeCheck(data, 'array') && typeCheck(schema, 'array')) {
    for (const i in data) {
      return schemaCheck(schema[i], data[i])
    }
  } else if (typeCheck(data, 'object') && typeCheck(schema, 'object')) {
    if (data.type === 'object') {
      return schemaCheck(schema.properties, data.properties, 'properties')
    } else if (data.type === 'array' && data.items) {
      return schemaCheck(schema.items, data.items)
    } else {
      let bool = true
      if ((!data || !Object.keys(data).length) && (!schema || !Object.keys(schema).length)) {
        bool = true
      } else if (!data || !Object.keys(data).length) {
        bool = false
      } else {
        for (const i in data) {
          if (!(type !== 'properties' && i !== 'type')) {
            if (!(type !== 'properties' && i !== 'type') && !schemaCheck(schema[i], data[i])) {
              bool = false
              break
            }
          }
        }
      }
      return bool
    }
  } else {
    return false
  }
}

export function deepCopy(obj: any, cache: any = []) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  const hit: any = cache.filter((c: any) => c.original === obj)[0]
  if (hit) {
    return hit.copy
  }
  const copy: any = Array.isArray(obj) ?  [] :   {}

  cache.push({
    original: obj,
    copy
  })
  
  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}

export function postMessageFn(type: string, url: string = '') {
  window.parent.postMessage({
    type,
    data: { url },
  }, '*')
}

export function lineToHump(name) {
  if (!name) return ''
  name = name.slice(0, 1).toUpperCase() + name.slice(1)
  return name.replace(/[\-|\.](\w)/g, function(all, letter){
      return letter.toUpperCase()
  })
}
