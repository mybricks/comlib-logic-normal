import {
  list_map,
  list_push,
  create_list,
  list_filter,
  get_listitem,
  traverse_object
} from './list'
import {
  time_format,
  current_timestamp,
  current_start_end,
  distance_from_current
} from './moment'
import { deb } from './debugger'
import { math_number } from './math'
import { text, text_join } from './text'
import { logic_ifelse, logic_ternary, logic_includes } from './logic'
import { def_object, get_object_value, delete_object_value } from './object'

export default [
  {
    name:'返回',
    blockAry: [
      'xg.input_return'
    ]
  },
  {
    name: '常量',//Catelog title
    blockAry: [
      deb,
      'logic_boolean',
      math_number,
      'math_arithmetic',
      text,
      text_join,
      def_object,
      get_object_value,
      delete_object_value
    ]
  },
  {
    name: '时间',
    blockAry: [
      current_timestamp,
      current_start_end,
      distance_from_current,
      time_format
    ]
  },
  {
    name: '逻辑判断', blockAry: [
      // logic_confirm,          // 确认提示
      logic_ifelse,
      'logic_compare',        // 比较
      'logic_operation',      // 并且 或者
      logic_ternary,
      logic_includes
    ]
  },
  {
    name: '列表', blockAry: [
      create_list,
      traverse_object,
      'lists_split',
      get_listitem,
      list_push,
      list_map,
      list_filter,
    ]
  },
  // {
  //   name: '其他', blockAry: [
  //     // logic_ternary,
  //     // 'lists_length',      // 数组长度
  //     // 'variables_set',     // 初始化
  //     // logic_includes,
  //     // text,
  //     // 'text_join',            // 字符串拼接
  //     // text_join,
  //     // 'logic_boolean',     // boolean
  //     // 'logic_negate',      // 否
  //     // 'lists_split',       // join split
  //     // 'text_count',        // 字符串个数
  //     // 'math_arithmetic',   // 加减乘除等
  //   ]
  // },
  // {
  //   name: '列表',
  //   blockAry: [list_map]
  // },
  // {
  //   name: '对象',//Catelog title
  //   blockAry: [get_object_value, def_object]
  // },
  // {
  //   name: '逻辑',
  //   blockAry: [logic_ifelse]
  // }
]