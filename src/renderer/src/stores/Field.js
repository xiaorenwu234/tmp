import { defineStore } from 'pinia'

export const FieldStore = defineStore('field', () => {
  const options_of_field = [
    {
      value: '',
      label: '全部'
    },
    {
      value: '工业',
      label: '工业'
    },
    {
      value: '环境',
      label: '环境'
    },
    {
      value: '交通',
      label: '交通'
    },
    {
      value: '农业',
      label: '农业'
    },
    {
      value: '数理化',
      label: '数理化'
    },
    {
      value: '生物',
      label: '生物'
    },
    {
      value: '天文地理',
      label: '天文地理'
    },
    {
      value: '医学',
      label: '医学'
    }
  ]

  const cur_field = options_of_field[0]

  return {
    options_of_field,
    cur_field
  }
})
