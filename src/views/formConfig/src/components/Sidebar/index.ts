/*
 * @Author: wendy
 * @LastEditors: wendy
 * @Date: 2021-11-30 14:54:20
 * @LastEditTime: 2021-12-04 15:19:51
 * @Description: 配置项
 */
import { commonConfig, IComponentsChild } from '../componentsBase';

// 左侧schema，及对应的右侧配置setting
export const baseComponents: IComponentsChild[] = [
  {
    ...commonConfig,
    type: 'input',
    label: '输入框',
    placeholder: '请输入',
    width: 100,
    isInput: true
  },
  {
    ...commonConfig,
    type: 'textarea',
    label: '多行文本',
    placeholder: '请输入',
    width: 100
  },
  {
    ...commonConfig,
    type: 'inputNumber',
    label: '数字输入框',
    placeholder: '请输入'
  },
  {
    ...commonConfig,
    type: 'switch',
    label: '是否switch',
  },
  {
    ...commonConfig,
    type: 'radio',
    label: '点击单选',
  },
  {
    ...commonConfig,
    type: 'select',
    label: '下拉单选',
  }
]

export const advanceComponents = [
  {
    ...commonConfig,
    type: 'date',
    label: '日期范围',
    placeholder: ['开始时间', '结束时间']
  }
]