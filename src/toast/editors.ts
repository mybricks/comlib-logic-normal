export default {
  ":root": [
    {
      title: '提示类型',
      type: 'Select',
      options: [
        {label: '成功', value: 'success'},
        {label: '普通', value: 'info'},
        {label: '警告', value: 'warning'},
        {label: '错误', value: 'error'},
      ],
      value: {
        get({data}) {
          return data.type
        },
        set({data}, val: string) {
          data.type = val
        }
      }
    },
    {
      title: '提示显示时长(秒)',
      type: 'Slider',
      options: [
        {max: 30, min: 1, steps: 1, formatter: '秒'}
      ],
      value: {
        get({data}) {
          return data.interval
        },
        set({data}, val: number) {
          data.interval = val
        }
      }
    }
  ]
}